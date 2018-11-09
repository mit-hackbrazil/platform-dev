import { db } from "../Database.js";
export const typeDef = `

  type Notification{
    type:String, 
    content:String, 
    icon:String,
    timestamp: Date,
    active: Boolean
  }

  extend type Query {
    notifications: [Notification]
  }
  
`;

export let resolver = {
    Query: {
        async notifications(_, args) {
            notifications = await db.many("SELECT * FROM notifications WHERE active=true ORDER BY timestamp");
            return notifications;
        }
    }

}
