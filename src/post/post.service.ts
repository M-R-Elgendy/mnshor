import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaClient } from '@prisma/client';
import { AuthContext } from 'src/auth/auth.context';
import { PaginationDto, PostFilterDto } from 'src/global/DTOs/general-dtos.dto';
import { Role } from 'src/global/types';

@Injectable()
export class PostService {

  constructor(
    private readonly prisma: PrismaClient,
    private readonly authContext: AuthContext
  ) { }


  async create(createPostDto: CreatePostDto) {

    const category = await this.prisma.category.findFirst({
      where: {
        id: createPostDto.categoryId,
        isDeleted: false
      }
    });

    if (!category) throw new BadRequestException('Category not found');

    const post = await this.prisma.post.create({
      data: {
        ...createPostDto,
        userId: this.authContext.getUser().id
      }
    });

    return {
      statusCode: HttpStatus.CREATED,
      message: "Post created successfully",
      post
    }

  }

  async findAll(postFilterDto: PostFilterDto) {
    let { page = 1, limit = 10 } = postFilterDto;
    page = page - 1;
    const skip = page * limit;

    const where = { isDeleted: false };
    if (postFilterDto.categoryId) where['categoryId'] = postFilterDto.categoryId;

    const posts = await this.prisma.post.findMany({
      where: where,
      select: {
        id: true,
        title: true,
        content: true,
        image: true,
        createdAt: true,
        User: {
          select: {
            id: true,
            name: true
          }
        },
        Category: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: {
        id: 'desc'
      }
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Categories fetched successfully',
      data: posts
    }

  }

  async findMyPosts(paginationDto: PaginationDto) {
    let { page = 1, limit = 10 } = paginationDto;
    page = page - 1;
    const skip = page * limit;

    const userId = this.authContext.getUser().id;

    const posts = await this.prisma.post.findMany({
      where: { userId: userId, isDeleted: false },
      select: {
        id: true,
        title: true,
        content: true,
        image: true,
        createdAt: true,
        User: {
          select: {
            id: true,
            name: true
          }
        },
        Category: {
          select: {
            id: true,
            name: true
          }
        }
      },
      skip: skip,
      take: limit,
      orderBy: {
        id: 'desc'
      }
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Categories fetched successfully',
      data: posts
    }

  }

  async findOne(id: number) {

    const post = await this.prisma.post.findFirst({
      where: { id: id, isDeleted: false },
      select: {
        id: true,
        title: true,
        content: true,
        image: true,
        createdAt: true,
        User: {
          select: {
            id: true,
            name: true
          }
        },
        Category: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    if (!post) throw new BadRequestException('Post not found');

    return {
      statusCode: HttpStatus.OK,
      message: 'Post fetched successfully',
      data: post
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto) {

    const userRole = this.authContext.getUser().role;
    let query: any = { id: id, isDeleted: false }

    if (userRole == Role.USER) query = { ...query, userId: this.authContext.getUser().id }

    const post = await this.prisma.post.findUnique({ where: query })
    if (!post) throw new BadRequestException('Post not found');

    const updatedPost = await this.prisma.post.update({
      where: query,
      data: updatePostDto
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Post updated successfully',
      data: updatedPost
    }
  }

  async remove(id: number) {

    const userRole = this.authContext.getUser().role;
    let query: any = { id: id, isDeleted: false }

    if (userRole == Role.USER) query = { ...query, userId: this.authContext.getUser().id }

    const post = await this.prisma.post.findUnique({ where: query })
    if (!post) throw new BadRequestException('Post not found');

    await this.prisma.post.update({
      where: query,
      data: { isDeleted: true }
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Post deleted successfully',
    }

  }

}
