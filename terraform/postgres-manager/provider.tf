provider "postgresql" {
  host            = var.connection.host
  port            = var.connection.port
  database        = "postgres"
  username        = var.connection.user
  password        = var.connection.secret
  sslmode         = var.connection.sslmode
  connect_timeout = 15
  superuser       = false
}

