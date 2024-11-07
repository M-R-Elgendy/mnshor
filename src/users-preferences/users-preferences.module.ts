import { Module } from '@nestjs/common';
import { UsersPreferencesService } from './users-preferences.service';
import { UsersPreferencesController } from './users-preferences.controller';
import { PrismaClient } from '@prisma/client';
import { AuthContext } from 'src/auth/auth.context';

@Module({
  controllers: [UsersPreferencesController],
  providers: [UsersPreferencesService, PrismaClient, AuthContext],
})
export class UsersPreferencesModule { }
