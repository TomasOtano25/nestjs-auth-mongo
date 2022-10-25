import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongoClient } from 'mongodb';
import { MongooseModule } from '@nestjs/mongoose';

import config from '../config';

// async function run() {
//   await client.connect();
//   const database = client.db('platzi-store');
//   const taskCollection = database.collection('tasks');
//   const tasks = await taskCollection.find().toArray();
//   console.log(tasks);
// }

@Global()
@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost:27017', {
    //   user: 'root',
    //   pass: 'root',
    //   dbName: 'plazti-store',
    // }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { connection, user, password, host, port, dbName } =
          configService.mongo;

        let uri = `${connection}://${user}:${password}@${host}`;
        if (connection === 'mongodb') {
          uri += `:${port}`;
        }

        return {
          uri: uri,
          dbName,
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { connection, user, password, host, port, dbName } =
          configService.mongo;

        let url = `${connection}://${user}:${password}@${host}`;
        if (connection === 'mongodb') {
          url += `:${port}`;
        }
        const client = new MongoClient(url);
        await client.connect();
        const database = client.db(dbName);
        return database;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['MONGO', MongooseModule],
})
export class DatabaseModule {}
