import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaClient } from '@prisma/client';
import { AuthContext } from 'src/auth/auth.context';

@Module({
  controllers: [PostController],
  providers: [PostService, PrismaClient, AuthContext],
})
export class PostModule { }
