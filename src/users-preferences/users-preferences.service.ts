import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
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
    const categoryId = createUsersPreferenceDto.categoryId;

    const isCategoryExsists = await this.prisma.category.count({
      where: { id: categoryId }
    });

    if (!isCategoryExsists) throw new BadRequestException('Invalid category Id');

    const isAlreadyExsits = await this.prisma.categoryPrefrances.findFirst({
      where: {
        userId: userId,
        categoryId: categoryId
      }
    });

    if (isAlreadyExsits) throw new ConflictException('This category is already exists in your preference');

    return await this.prisma.categoryPrefrances.create({
      data: {
        userId: userId,
        categoryId: categoryId
      }
    });

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
