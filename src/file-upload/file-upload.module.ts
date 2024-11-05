import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { ConfigModule } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { AuthContext } from 'src/auth/auth.context';
@Module({
  imports: [ConfigModule],
  controllers: [FileUploadController],
  providers: [FileUploadService, PrismaClient, AuthContext],
})
export class FileUploadModule { }