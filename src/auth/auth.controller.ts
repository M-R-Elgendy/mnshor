import { Controller, Get, Post, Body, Headers, HttpCode, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EmailSignUpDto } from './dto/email-signup.dto';
import { EmailLogInDto } from './dto/email-login.dto';

import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from '../global/decorators/role.decorator';
import { Role } from 'src/global/types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("/register")
  register(@Body() emailSignUpDto: EmailSignUpDto) {
    return this.authService.register(emailSignUpDto);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles([Role.ADMIN])
  @Post("/admins/register")
  registerAdmin(@Body() emailSignUpDto: EmailSignUpDto) {
    return this.authService.registerAdmin(emailSignUpDto);
  }

  @HttpCode(200)
  @Post("/login")
  logIn(@Body() emailLogInDto: EmailLogInDto) {
    return this.authService.logIn(emailLogInDto);
  }

}
