import { Controller, Get, Query, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';

import { IdDot, PaginationDto } from 'src/global/DTOs/general-dtos.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from '../global/decorators/role.decorator';
import { Role } from 'src/global/types';

@UseGuards(AuthGuard, RoleGuard)
@Roles([Role.ADMIN])
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  findAll(@Query() paginationData: PaginationDto) {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: IdDot) {
    return this.userService.findOne(params.id);
  }

  @Delete(':id')
  remove(@Param() params: IdDot) {
    return this.userService.remove(params.id);
  }
}
