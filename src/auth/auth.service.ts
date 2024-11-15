import {
  Injectable,
  HttpException,
  HttpStatus,
  ConflictException,
  NotFoundException,
  ForbiddenException,
  UnauthorizedException,
  BadRequestException
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { compareSync, hashSync } from 'bcrypt';
import { PrismaClient, User } from '@prisma/client'

import { Role, SessionToken } from '../global/types';
import { ConfigService } from '@nestjs/config';

import { EmailLogInDto } from './dto/email-login.dto';
import { EmailSignUpDto } from './dto/email-signup.dto';

@Injectable()
export class AuthService {

  constructor(
    // private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaClient,
    private readonly configService: ConfigService
  ) { }

  async register(emailSignUpDto: EmailSignUpDto) {
    try {

      const foundedUser = await this.prisma.user.findFirst({
        where: {
          email: emailSignUpDto.email,
          // isDeleted: false
        },
        select: {
          name: true,
          email: true,
          createdAt: true
        }
      });

      if (foundedUser) throw new ConflictException({ message: 'User already exists', foundedUser, statusCode: HttpStatus.CONFLICT });

      const user = await this.prisma.user.create({
        data: {
          name: emailSignUpDto.name,
          email: emailSignUpDto.email,
          password: await this.hashPassword(emailSignUpDto.password),
        }
      });


      const token = await this.jwtService.signAsync({ id: user.id, role: user.role }, { expiresIn: '30d', secret: this.configService.getOrThrow('JWT_SECRET') });

      return {
        message: 'User created successfully',
        statusCode: HttpStatus.CREATED,
        data: {
          token,
          userId: user.id,
          userName: user.name,
          role: user.role
        }
      };

    } catch (error) {
      throw error;
    }
  }

  async registerAdmin(emailSignUpDto: EmailSignUpDto) {
    try {

      const foundedUser = await this.prisma.user.findFirst({
        where: {
          email: emailSignUpDto.email
        },
        select: {
          name: true,
          email: true,
          createdAt: true
        }
      });

      if (foundedUser) throw new ConflictException({ message: 'User already exists', foundedUser, statusCode: HttpStatus.CONFLICT });

      const user = await this.prisma.user.create({
        data: {
          name: emailSignUpDto.name,
          email: emailSignUpDto.email,
          password: await this.hashPassword(emailSignUpDto.password),
          role: Role.ADMIN
        }
      });


      const token = await this.jwtService.signAsync({ id: user.id, role: user.role }, { expiresIn: '30d', secret: this.configService.getOrThrow('JWT_SECRET') });

      return {
        message: 'User created successfully',
        statusCode: HttpStatus.CREATED,
        data: {
          token,
          userId: user.id,
          userName: user.name,
          role: user.role
        }
      };

    } catch (error) {
      throw error;
    }
  }


  async logIn(emailLoginDto: EmailLogInDto) {

    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email: emailLoginDto.email,
          isDeleted: false
        }
      });

      if (!user) throw new UnauthorizedException('Invalid credentials');

      const isPasswordMatch = await this.verifyPassword(emailLoginDto.password, user.password);
      if (!isPasswordMatch) throw new UnauthorizedException('Invalid credentials');

      const token = await this.jwtService.signAsync({ id: user.id, role: user.role }, { expiresIn: '30d', secret: this.configService.getOrThrow('JWT_SECRET') });
      return {
        message: 'User logged in successfully',
        statusCode: HttpStatus.OK,
        data: {
          token,
          userId: user.id,
          userName: user.name,
          role: user.role
        }
      };

    } catch (error) {
      throw error;
    }

  }

  private async hashPassword(password: string): Promise<string> {
    try {
      const hash = hashSync(password, +this.configService.get('SALT_ROUNDS') || 10);
      return hash;
    } catch (error) {
      throw new Error('Error hashing password');
    }
  }

  private async verifyPassword(password: string, hash: string): Promise<boolean> {
    try {
      const isMatch = compareSync(password, hash);
      return isMatch;
    } catch (error) {
      throw new Error('Error verifying password');
    }
  }

}
