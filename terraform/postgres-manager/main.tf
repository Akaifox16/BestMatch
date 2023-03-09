locals {
  users_granted_groups = transpose({ for group, attr in var.groups : group => attr.users })
  schema_in_db = flatten([for schema, dbs in transpose({ for db, attr in var.databases : db => attr.schemas }) : [
    for db in dbs :
    {
      database = db
      schema   = schema
    }
  ]])

  schema_in_db_map = { for it in local.schema_in_db : "${it.database}-${it.schema}" => it }
}

##########################################################################################
# Create Databases
##########################################################################################
resource "postgresql_database" "databases" {
  for_each = var.databases

  name       = each.key
  owner      = var.connection.user
  encoding   = each.value.encoding
  lc_collate = each.value.collate
  lc_ctype   = each.value.ctype
}

resource "postgresql_schema" "schemas" {
  for_each = local.schema_in_db_map

  name         = each.value.schema
  owner        = var.connection.user
  database     = each.value.database
  drop_cascade = true

  depends_on = [
    postgresql_database.databases
  ]
}

##########################################################################################
# Create Groups
##########################################################################################
resource "postgresql_role" "groups" {
  for_each = var.groups

  name = each.key

  inherit         = true
  superuser       = false
  login           = false
  create_database = false
  create_role     = false
}

resource "random_string" "passwords" {
  for_each = var.users

  length  = 16
  special = true

  min_numeric = 3
  min_upper   = 3
  min_lower   = 4
}

resource "postgresql_role" "users" {
  for_each = var.users

  name             = each.key
  login            = true
  password         = random_string.passwords[each.key].result
  roles            = contains(keys(local.users_granted_groups), each.key) ? local.users_granted_groups[each.key] : []
  connection_limit = -1

  depends_on = [
    postgresql_role.groups,
    random_string.passwords
  ]
}

module "grant_groups" {
  source = "./grant_priviliges"

  roles = var.groups

  depends_on = [
    postgresql_schema.schemas,
    postgresql_role.groups
  ]
}

module "grant_users" {
  source = "./grant_priviliges"

  roles = var.users

  depends_on = [
    postgresql_role.users,
    module.grant_groups
  ]
}

