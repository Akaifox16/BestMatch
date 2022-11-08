resource "postgresql_grant" "grant_all_table" {
  for_each = { for k, v in local.all_table_privs: k => v if !contains(v.privs, "") }

  role = each.value.role
  database = each.value.database
  schema = each.value.schema
  object_type = "table"
  objects = []
  privs = each.value.privs
}

resource "postgresql_grant" "grant_table" {
  for_each = { for k,v in local.role_granted_table: k => v if !contains(v.privs, "") }

  role = each.value.role
  database = each.value.database
  schema = each.value.schema
  object_type = "table"
  objects = each.value.tables
  privs = each.value.privs

  depends_on = [
    postgresql_grant.grant_all_table
  ]
}