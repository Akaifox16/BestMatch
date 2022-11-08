variable "schema_privs" {
  type = map(object({
    role = string
    database = string
    schema = string
    privs = string
  }))
}

variable "table_privs" {
  type = map(object({
    role = string
    database = string
    schema = string
    tables = list(string)
    privs = string
  }))
}

locals {
  permission =  {
    r = ["SELECT"]
    w = ["INSERT", "UPDATE", "DELETE"]
    m = ["TRUNCATE", "REFERENCES", "TRIGGER"]
  }

  all_table_privs = {
    for k, v in var.schema_privs: k => {
      role = v.role
      database = v.database
      schema = v.schema
      privs = setunion(flatten([
        for it in split("/", v.privs):
        it == "r" ? local.permission["r"] :
        it == "w" ? local.permission["w"] :
        it == "m" ? local.permission["m"] : [""]
      ]))
    }
  }

  role_granted_table = {
    for k, v in var.table_privs: k => {
      role = v.role
      database = v.database
      schema = v.schema
      tables = v.tables
      privs = setunion(flatten([
        for it in split("/", v.privs):
        it == "r" ? local.permission["r"] :
        it == "w" ? local.permission["w"] :
        it == "m" ? local.permission["m"] : [""]
      ]))
    }
  }
}