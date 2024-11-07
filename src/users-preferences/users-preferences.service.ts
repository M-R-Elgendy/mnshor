import { Injectable } from '@nestjs/common';
import { CreateUsersPreferenceDto } from './dto/create-users-preference.dto';

import { PrismaClient } from '@prisma/client';
import { AuthContext } from 'src/auth/auth.context';

@Injectable()
export class UsersPreferencesService {

  constructor(
    private readonly prisma: PrismaClient,
    private readonly authContext: AuthContext
  ) { }

  async create(createUsersPreferenceDto: CreateUsersPreferenceDto) {

    const userId = this.authContext.getUser().id;
    // const preferences = createUsersPreferenceDto.preferences;
    // const uniquePreferences = preferences.filter((item, index) => preferences.indexOf(item) === index);

    // const categoriesCount = await this.prisma.category.count({
    //   where: { id: { in: uniquePreferences } }
    // });

    // if (categoriesCount !== uniquePreferences.length) {
    //   return {
    //     statusCode: 400,
    //     message: 'One or more categories not found',
    //     data: null
    //   }
    // }

    // const preferenceRecords = uniquePreferences.map((preference) => {
    //   return {
    //     categoryId: preference,
    //     userId: userId
    //   }
    // });

    // const isAlreadyExsits = await this.prisma.categoryPrefrances.findMany({
    //   where: {
    //     userId: userId,
    //     categoryId: { in: uniquePreferences }
    //   }
    // });

    // if (isAlreadyExsits.length > 0) {
    //   return {
    //     statusCode: 400,
    //     message: 'User preferences already exists',
    //     data: null
    //   }
    // }

    // return await this.prisma.categoryPrefrances.createMany({
    //   data: preferenceRecords
    // });

  }

  async findAll() {
    return `This action returns all usersPreferences`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} usersPreference`;
  }

  async remove() {
    return `This action removes a usersPreference`;
  }
}
