databases= {
  autoroommate = {
    encoding = "UTF8",
    collate = "en_US.utf8",
    ctype   = "en_US.utf8",
    schemas = ["roommate"]
  }
}

users = {
  app = {
    db_privs = []
  }
}

groups = {
  autoroommate-app = {
    db_privs = [
      {
        dbname = "autoroommate"
        schema_privs = [
          {
            schema = "roommate"
            table_privs = []
            privs = "r/w"
          }
        ]
      }
    ]
    users = ["app"]
  }
}