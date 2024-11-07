import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersPreferencesService } from './users-preferences.service';
import { CreateUsersPreferenceDto } from './dto/create-users-preference.dto';

import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from '../global/decorators/role.decorator';
import { Role } from 'src/global/types';

@UseGuards(AuthGuard, RoleGuard)
@Controller('preferences')
export class UsersPreferencesController {
  constructor(private readonly usersPreferencesService: UsersPreferencesService) { }

  @Post()
  @Roles([Role.USER])
  create(@Body() createUsersPreferenceDto: CreateUsersPreferenceDto) {
    return this.usersPreferencesService.create(createUsersPreferenceDto);
  }

  @Get()
  findAll() {
    return this.usersPreferencesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersPreferencesService.findOne(+id);
  }

  @Delete('/reset')
  remove() {
    return this.usersPreferencesService.remove();
  }

}
