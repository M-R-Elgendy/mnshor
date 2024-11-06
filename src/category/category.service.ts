import { Injectable, HttpStatus, ConflictException, BadRequestException } from '@nestjs/common';
import { CategoryDto } from './dto/category.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CategoryService {

  constructor(
    private readonly prisma: PrismaClient,
  ) { }

  async create(CategoryDto: CategoryDto) {
    const similarCategory = await this.prisma.category.findFirst({
      where: {
        name: {
          equals: CategoryDto.name,
        },
        isDeleted: false
      }
    });

    if (similarCategory) throw new ConflictException('Category already exists');

    const category = await this.prisma.category.create({
      data: { name: CategoryDto.name }
    });

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Category created successfully',
      data: category
    }

  }

  async findAll() {
    return `This action returns all category`;
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findFirst({
      where: { id: id, isDeleted: false },
      include: {
        Post: true
      }
    });

    if (!category) throw new BadRequestException('Category not found');

    return {
      message: 'Category fetched successfully',
      statusCode: HttpStatus.OK,
      data: category
    }
  }

  async update(id: number, updateCategoryDto: CategoryDto) {
    const category = await this.prisma.category.findFirst({ where: { id: id, isDeleted: false } })

    if (!category) throw new BadRequestException('Category not found');

    if (category.name.toLowerCase() == updateCategoryDto.name.toLowerCase())
      throw new BadRequestException('No changes to be saved')

    const similarCategory = await this.prisma.category.findFirst({
      where: {
        name: {
          equals: updateCategoryDto.name
        },
        id: { not: id },
        isDeleted: false
      }
    });

    if (similarCategory) throw new ConflictException('Category already exists');

    const updatedCategory = await this.prisma.category.update({
      where: { id: id },
      data: { name: updateCategoryDto.name }
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Category updated successfully',
      data: updatedCategory
    }
  }

  async remove(id: number) {
    const category = await this.prisma.category.findUnique({ where: { id: id } })
    if (!category) throw new BadRequestException('Category not found');
    await this.prisma.category.update({ where: { id: id }, data: { isDeleted: true } });
    return {
      statusCode: HttpStatus.OK,
      message: 'Category deleted successfully',
    }
  }
}
