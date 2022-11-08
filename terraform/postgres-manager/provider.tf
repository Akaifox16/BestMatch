provider "postgresql" {
  host = var.connection.host
  port = var.connection.port
  database = "postgres"
  username = "postgres"
  password = var.connection.password
  sslmode  = false
  connection_timeout = 15
}