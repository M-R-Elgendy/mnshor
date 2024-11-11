import { Controller, Get, Post, Body, Patch, Param, Query, Delete, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import { IdDot, PaginationDto } from 'src/global/DTOs/general-dtos.dto';

import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from '../global/decorators/role.decorator';
import { Role } from 'src/global/types';


@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles([Role.ADMIN])
  create(@Body() CategoryDto: CategoryDto) {
    return this.categoryService.create(CategoryDto);
  }

  @Get()
  findAll(@Query() paginationData: PaginationDto) {
    return this.categoryService.findAll(paginationData);
  }

  @Get(':id')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles([Role.ADMIN])
  findOne(@Param() params: IdDot) {
    return this.categoryService.findOne(params.id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles([Role.ADMIN])
  update(@Param() params: IdDot, @Body() updateCategoryDto: CategoryDto) {
    return this.categoryService.update(params.id, updateCategoryDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles([Role.ADMIN])
  remove(@Param() params: IdDot) {
    return this.categoryService.remove(params.id);
  }
}
