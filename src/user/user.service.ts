import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IdDot, PaginationDto } from 'src/global/DTOs/general-dtos.dto';
import { PrismaClient } from '@prisma/client';
import { AuthContext } from 'src/auth/auth.context';
import { Role } from 'src/global/types';
@Injectable()
export class UserService {

  constructor(
    private readonly prisma: PrismaClient,
  ) { }

  async findAll(paginationDto: PaginationDto) {

    let { page = 1, limit = 10 } = paginationDto;
    page = page - 1;
    const skip = page * limit;

    const users = await this.prisma.user.findMany({
      where: { isDeleted: false, role: Role.USER },
      select: {
        id: true,
        name: true,
        email: true,
        role: true
      }
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Users fetched successfully',
      data: users
    }


  }

  async getAdmins(paginationDto: PaginationDto) {

    let { page = 1, limit = 10 } = paginationDto;
    page = page - 1;
    const skip = page * limit;

    const users = await this.prisma.user.findMany({
      where: { isDeleted: false, role: Role.ADMIN },
      select: {
        id: true,
        name: true,
        email: true,
        role: true
      }
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Users fetched successfully',
      data: users
    }


  }

  async remove(id: number) {
    const query: any = { id: id, isDeleted: false }

    const user = await this.prisma.user.findUnique({ where: query });
    if (!user) throw new BadRequestException('User not found');

    await this.prisma.user.update({
      where: query,
      data: { isDeleted: true }
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'User deleted successfully',
    }
  }
}
