import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { AuthContextModule } from './auth/auth.context';
import { AuthContext } from './auth/auth.context';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    FileUploadModule,
    AuthContextModule
  ],
  controllers: [AppController],
  providers: [AppService, AuthContext],
})
export class AppModule { }
