resource "postgresql_grant" "grant_database" {
  for_each = { for k, v in local.role_granted_db: k => v if !contains(v.privs, "") }

  role = each.value.role
  database = each.value.database
  object_type = "database"
  privileges = each.value.privs
}