import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileModule } from './profile/profile.module';
import { ChannelsModule } from './channels/channels.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_DB_URL, { dbName: process.env.MONGO_DB_NAME, appName: 'Chatter App' }),
    EventEmitterModule.forRoot(),
    AuthModule,
    UsersModule,
    ProfileModule,
    ChannelsModule
  ],
})
export class AppModule { }
