provider "postgresql" {
  host            = var.connection.host
  port            = var.connection.port
  database        = "postgres"
  username        = "linpostgres"
  password        = var.connection.secret
  sslmode         = "require"
  connect_timeout = 15
  superuser       = false
}

