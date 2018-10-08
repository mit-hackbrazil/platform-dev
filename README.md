# platform-dev
Remote Hackathon management platform
Designed to organize Teams, Tasks/Calendar, Posts (Prototypes' Updates) and Mentors;

# 🚨DataBase connection files 
since version 1.0.1 we migrated from MongoDB to PostgreSQL;

- create a file name 'db_secret.json' at "platform-dev/app/api/"

```
/* platform-dev/app/api/db_secret.json */

{
    "host": <postgres_host>,
    "user": <postgres_username>,
    "password": <postgres_password>,
    "database": <postgres_database_name>,
    "port": 5432
}

```

# core dependencies
- meteor (requires manual installation)
  mac/linux
  ```
  curl https://install.meteor.com/ | sh
  ```
  
# Running Project
```
cd app
meteor npm install
meteor run
```
http://localhost:3000

# Running experimental UI
```
cd design
npm install
npm start
```

# GraphQL APIs
http://localhost:3000/graphql

## Teams
Schema
```graphql
 type Team{
    id: Int,
    name: String,
    link: String,
    members: JSON, 
    logo: String, 
    contacts: JSON
  }

  extend type Query {
    team(args:JSON): [Team],
    teamEditKey(args:JSON) : Boolean,
    teamViewKey(args:JSON) : Boolean
  }

  extend type Mutation{
      addTeam(args:JSON): Boolean,
      updateTeam(args:JSON): Boolean
  }
```
### all  :[Team]
```graphql
query{
	team{
		 id, name,members,link
	}
}
```

### read by id :[Team]
```graphql
query{
	team(args:{id:12}){
		 id, name, contacts
	}
}
```

### validate Edit Key :Boolean
```graphql
query{
	teamEditKey(args:{id:<ID> ,key:<EDIT_KEY>})
}
```


### validate View Key :Boolean
```graphql
query{
	teamVIEWKey(args:{id:<ID> ,key:<VIEW_KEY>})
}
```

