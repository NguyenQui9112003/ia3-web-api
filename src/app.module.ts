import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URI, {
      connectionFactory: (connection) => {
        connection.on('error', (error) => {
          console.error('Database connection error:', error.message);
        });
        connection.on('disconnected', () => {
          console.warn('Database connection lost. Attempting to reconnect...');
        });
        return connection;
      },
    }),
  AuthModule, UsersModule], 
  controllers: [AppController], // @Controller
  providers: [AppService], // @Injectable
})
export class AppModule {}
