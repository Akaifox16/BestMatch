resource "postgresql_grant" "grant_schema" {
  for_each = { for k, v in local.role_granted_schema: k => v if !contains(v.privs, "") }

  role = each.value.role
  database = each.value.database
  schema = each.value.schema
  object_type = "schema"
  privileges = each.value.privs
}