module "grant_database" {
  source = "./grant_db"
  
  database_privs = local.database_privs
}

module "grant_schema" {
  source = "./grant_schema"

  schema_privs = local.schema_privs

  depends_on = [
    module.grant_database
  ]
}

module "grant_table" {
  source = "./grant_table"

  table_privs = local.table_privs
  schema_privs = local.schema_privs

  depends_on = [
    module.grant_schema
  ]
}