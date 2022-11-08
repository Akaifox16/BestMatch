variable "schema_privs" {
  type = map(object({
    role = string
    database = string
    schema   = string
    privs = string
  }))
}

locals {
  permission = {
    u = ["USAGE"]
    c = ["CREATE"]
  }

  role_granted_schema = {
    for k, v in var.schema_privs: k => {
      role = v.role
      database = v.database
      schema   = v.schema
      privs = setunion(flatten([
        for it in split("/", v.privs):
        it == "r" || it == "w" ? local.permission["u"] :
        it == "m" ? local.permission["c"] : [""]
      ]))
    }
  }
}