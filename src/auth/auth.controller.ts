import { Controller, Get, Post, Body, Headers, HttpCode, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EmailSignUpDto } from './dto/email-signup.dto';
import { EmailLogInDto } from './dto/email-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("/register")
  register(@Body() emailSignUpDto: EmailSignUpDto) {
    return this.authService.register(emailSignUpDto);
  }

  @HttpCode(200)
  @Post("/login")
  logIn(@Body() emailLogInDto: EmailLogInDto) {
    return this.authService.logIn(emailLogInDto);
  }

}
