import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import { IdDot } from 'src/global/DTOs/general-dtos.dto';

import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from '../global/decorators/role.decorator';
import { Role } from 'src/global/types';

@UseGuards(AuthGuard, RoleGuard)
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  // @Roles([Role.ADMIN])
  create(@Body() CategoryDto: CategoryDto) {
    return this.categoryService.create(CategoryDto);
  }

  @Get()
  @Roles(['*'])
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: IdDot) {
    return this.categoryService.findOne(params.id);
  }

  @Patch(':id')
  // @Roles([Role.ADMIN])
  update(@Param() params: IdDot, @Body() updateCategoryDto: CategoryDto) {
    return this.categoryService.update(params.id, updateCategoryDto);
  }

  @Delete(':id')
  // @Roles([Role.ADMIN])
  remove(@Param() params: IdDot) {
    return this.categoryService.remove(params.id);
  }
}
