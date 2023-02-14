provider "postgresql" {
  host            = var.connection.host
  port            = var.connection.port
  database        = "postgres"
  username        = "postgres"
  password        = var.connection.secret
  sslmode         = "disable"
  connect_timeout = 15
}

