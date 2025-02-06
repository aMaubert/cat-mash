import { Module } from '@nestjs/common';
import {CatModule} from "./cat/cat.module";
import {MongooseModule} from "@nestjs/mongoose";

const mongoUri = process.env.MONGO_URI as string | undefined;
const mongoUser= process.env.MONGO_USER as string | undefined;
const mongoPassword = process.env.MONGO_PASSWORD as string | undefined;
const mongoDbName = process.env.MONGO_DB_NAME as string | undefined;

if (!mongoUri) throw new Error(
    "MONGO_URI environment variable is not defined"
)
if (!mongoUser) throw new Error(
    "MONGO_USER environment variable is not defined"
)
if (!mongoPassword) throw new Error(
    "MONGO_PASSWORD environment variable is not defined"
)
if (!mongoDbName) throw new Error(
    "MONGO_DB_NAME environment variable is not defined"
)

@Module({
  imports: [
      MongooseModule.forRoot(mongoUri, { user: mongoUser, pass: mongoPassword, dbName: mongoDbName }),
      CatModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
