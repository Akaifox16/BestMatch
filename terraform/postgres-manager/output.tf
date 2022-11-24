output "user_password" {
  value = { for user, attr in var.users: postgresql_role.users[user].name => {
    password = postgresql_role.users[user].password
  }}
  sensitive = true
}