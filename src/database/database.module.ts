import { Module, Global } from '@nestjs/common';

import { MongoClient } from 'mongodb';

// async function run() {
//   await client.connect();
//   const database = client.db('platzi-store');
//   const taskCollection = database.collection('tasks');
//   const tasks = await taskCollection.find().toArray();
//   console.log(tasks);
// }

@Global()
@Module({
  providers: [
    {
      provide: 'MONGO',
      useFactory: async () => {
        const url = 'mongodb://root:root@localhost:27017';
        const client = new MongoClient(url);
        await client.connect();
        const database = client.db('platzi-store');
        return database;
      },
    },
  ],
  exports: ['MONGO'],
})
export class DatabaseModule {}
