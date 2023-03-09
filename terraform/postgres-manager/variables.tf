#####################################
##         DB Connection           ##
#####################################
variable "connection" {
  description = "Database connetion"
  type = object({
    host    = string
    port    = number
    user    = string
    secret  = string
    sslmode = string
  })
}

#####################################
##            Databases            ##
#####################################
variable "databases" {
  description = "databases to be in host instance"
  type = map(object({
    encoding = string
    collate  = string
    ctype    = string
    schemas  = list(string)
  }))
}

#####################################
##           User Group            ##
#####################################
variable "groups" {
  description = "user's group to be in host instance"
  type = map(object({
    db_privs = list(object({
      dbname = string
      schema_privs = list(object({
        schema = string
        table_privs = list(object({
          tables = list(string)
          privs  = string
        }))
        privs = string
      }))
    }))
    users = list(string)
  }))
}

#####################################
##              User               ##
#####################################
variable "users" {
  description = "user to be in host instance"
  type = map(object({
    db_privs = list(object({
      dbname = string
      schema_privs = list(object({
        schema = string
        table_privs = list(object({
          tables = list(string)
          privs  = string
        }))
        privs = string
      }))
    }))
  }))
}

