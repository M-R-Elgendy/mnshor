import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

import { IdDot, PostFilterDto, PaginationDto } from 'src/global/DTOs/general-dtos.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';


@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  findAll(@Query() postFilterDto: PostFilterDto) {
    return this.postService.findAll(postFilterDto);
  }

  @Get('/me')
  @UseGuards(AuthGuard)
  findMyPosts(@Query() paginationDto: PaginationDto) {
    return this.postService.findMyPosts(paginationDto);
  }

  @Get(':id')
  findOne(@Param() params: IdDot) {
    return this.postService.findOne(params.id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param() params: IdDot, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(params.id, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param() params: IdDot) {
    return this.postService.remove(params.id);
  }
}
