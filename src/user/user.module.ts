import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaClient } from '@prisma/client';
import { AuthContext } from 'src/auth/auth.context';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaClient, AuthContext],
})
export class UserModule { }
