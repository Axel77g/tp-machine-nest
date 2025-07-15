import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { FilmModule } from './modules/films/film.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL || 'mongodb://localhost:27017/nestjs-db'),
    AuthModule,
    FilmModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
