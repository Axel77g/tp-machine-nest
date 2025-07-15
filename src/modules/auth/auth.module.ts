import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { UserSchema } from 'src/repository/mongo/mongo-user.schema';
import { AuthController } from './auth.controller';
import { UserRepositoryProvider } from 'src/repository/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { MailServiceProvider } from 'src/services/mails/IMailService';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'UserSchema', schema: UserSchema }]),
  JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),],
  controllers: [AuthController],
  providers: [AuthService, UserRepositoryProvider, MailServiceProvider],
})
export class AuthModule {}
