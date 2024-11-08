import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

import { IdDot, PostFilterDto, PaginationDto } from 'src/global/DTOs/general-dtos.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from '../global/decorators/role.decorator';
import { Role } from 'src/global/types';

@UseGuards(AuthGuard, RoleGuard)
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post()
  @Roles(["*"])
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  @Roles(["*"])
  findAll(@Query() postFilterDto: PostFilterDto) {
    return this.postService.findAll(postFilterDto);
  }

  @Get('/me')
  @Roles([Role.USER])
  findMyPosts(@Query() paginationDto: PaginationDto) {
    return this.postService.findMyPosts(paginationDto);
  }

  @Get(':id')
  findOne(@Param() params: IdDot) {
    return this.postService.findOne(params.id);
  }

  @Patch(':id')
  @Roles(["*"])
  update(@Param() params: IdDot, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(params.id, updatePostDto);
  }

  @Delete(':id')
  @Roles(["*"])
  remove(@Param() params: IdDot) {
    return this.postService.remove(params.id);
  }
}
