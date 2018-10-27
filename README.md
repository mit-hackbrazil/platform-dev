# Platform HackBrazil 2019 - @ MIT & Harvard

## Remote Hackathon management platform
Designed to organize Teams, Tasks/Calendar, Posts (Prototypes' Updates) and Mentors;

Current localizations: \[🇧🇷 pt-br\]

(UI v2.2 -- 95% integrated with GraphQL API)

![image](https://github.com/mit-hackbrazil/platform-dev/blob/master/assets/screenshot4.gif?raw=true)


(UI v2.1 -- 90% integrated with GraphQL API)

![image](https://github.com/mit-hackbrazil/platform-dev/blob/master/assets/screenshot3.gif?raw=true)


(UI v2.0 -- partially integrated with GraphQL API)

![image](https://github.com/mit-hackbrazil/platform-dev/blob/master/assets/screenshot2.gif?raw=true)


(UI v1.0)

![image](https://github.com/mit-hackbrazil/platform-dev/blob/master/assets/screenshot.gif?raw=true)


# 🚨DataBase connection files 
since version 1.0.1 we migrated from MongoDB to PostgreSQL;

- create a file name 'db_secret.json' at "platform-dev/app/api/"

```
/* sys/db_secret.json */

{
    "host": <postgres_host>,
    "user": <postgres_username>,
    "password": <postgres_password>,
    "database": <postgres_database_name>,
    "port": 5432
}

```

# Running Project Locally
```
cd sys
npm install
npm run dev
```
http://localhost:3000

# Example Team
```
http://localhost:3000/?id=12&edit=fe8027edb3
```

# Running experimental UI -- useful to use React Hot Reload
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

## Tasks

Schema
```graphql
type Task{
    id: Int, 
    title: String, 
    open: Boolean,
    content: String, 
    start_date: String,
    end_date: String,
    url: String
  }

  type TaskContent{
    id: Int,
    content: String, 
    files: JSON, 
    team: Int, 
    task: Int
    timestamp: String
  }

  extend type Query {
    tasks(args:JSON): [Task],
    taskContent(args:JSON): [TaskContent],
  }

  extend type Mutation{
      sendTask(args:JSON):Boolean,
      editTask(args:JSON):TaskContent
  }
```

### Read All
```graphql
query{
	tasks(args:{team:<TEAM_ID>}){
		id, title, content, start_date, end_date, open
	}
}
```

### Task Content
```graphql
query{
 taskContent(args:{team:<TEAM_ID>, task:<TASK_ID>,editKey:<EDIT_KEY>, viewKey:<VIEW_KEY>}){
		id, content, files
	}
}
```


