import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/repository/mongo/mongo-user.schema';
import { FilmController } from './film.controller';
import { FilmRepositoryProvider } from 'src/repository/film.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'UserSchema', schema: UserSchema }])],
  controllers: [FilmController],
  providers: [FilmRepositoryProvider],
})
export class FilmModule {}
