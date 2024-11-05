import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtService, ConfigService, PrismaClient],
})
export class AuthModule { }
