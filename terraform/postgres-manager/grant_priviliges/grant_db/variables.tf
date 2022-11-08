variable "database_privs" {
  type = map(object({
    role = string
    database   = string
    privs = list(string)
  }))
}

locals {
  permission = {
    c = ["CONNECT"]
    m = ["CREATE", "TEMPORARY"]
  }

  role_granted_db = {
    for k, v in var.database_privs: k => {
      role = v.role
      database   = v.database
      privs = setunion(flatten([
        for it in setunion([for priv in v.privs: split("/", priv)]):
        it == "r" || it == "w" ? local.permission["c"] :
        it == "m" ? local.permission["m"] : [""]
      ]))
    }
  }
}