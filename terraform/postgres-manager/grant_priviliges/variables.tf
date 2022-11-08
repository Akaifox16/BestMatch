variable "roles" {
  type = map(object({
    db_privs = list(object({
      dbname  = string
      schema_privs = list(object({
        schema = string
        table_privs = list(object({
          tables = list(string)
          privs = string
        }))
        privs = string
      }))
    }))
  }))
}

locals {
  database_privs = { for it in flatten([
    for role, attr in var.roles: [
      for db in attr.db_privs: {
        role = role
        database = db.dbname
        privs = db.schema_privs.*.privs
      }
    ]
  ]): "${it.role}-${it.database}" => it}

  schema_privs = { for it in flatten([
    for role, attr in var.roles: [
      for db in attr.db_privs: [
        for schema in db.schema_privs: {
          role = role
          database = db.dbname
          schema   = schema.schema
          privs = schema.privs
        }
      ]
    ]
  ]): "${it.role}-${it.database}-${it.schema}" => it}

  table_privs = { for it in flatten([
    for role, attr in var.roles: [
      for db in attr.db_privs: [
        for schema in db.schema_privs: [
          for it in schema.table_privs: {
            role = role
            database = db.dbname
            schema = schema.schema
            tables = it.tables
            privs = it.privs
          }
        ]
      ]
    ]
  ]): "${it.role}-${it.database}-${it.schema}-${join("-", it.tables)}" => it}
}