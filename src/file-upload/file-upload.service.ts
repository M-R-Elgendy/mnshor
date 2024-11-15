import { HttpStatus, Injectable, UnsupportedMediaTypeException } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { AuthContext } from 'src/auth/auth.context';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

@Injectable()
export class FileUploadService {
  private s3: S3;

  constructor(
    private configService: ConfigService,
    private authContext: AuthContext,
    private prisma: PrismaClient
  ) {
    this.s3 = new S3({
      endpoint: this.configService.getOrThrow<string>('DO_SPACES_ENDPOINT'),
      accessKeyId: this.configService.getOrThrow<string>('DO_SPACES_KEY'),
      secretAccessKey: this.configService.getOrThrow<string>('DO_SPACES_SECRET'),
      region: this.configService.getOrThrow<string>('DO_SPACES_REGION'),
    });
  }


  async uploadFile(file: Express.Multer.File) {

    this.validateFile(file);

    const params = {
      Bucket: this.configService.getOrThrow<string>('DO_SPACES_BUCKET'),
      Key: this.generateFileName(file),
      Body: file.buffer,
      ACL: 'public-read',
      ContentType: file.mimetype,
    };
    const uplodedFile = await this.s3.upload(params).promise();

    const fileDoc = await this.prisma.file.create({
      data: {
        type: (file.mimetype).split('/')[1],
        ETag: uplodedFile.ETag,
        Location: uplodedFile.Location,
        key: uplodedFile.Key,
        url: uplodedFile.Location,
        bucket: uplodedFile.Bucket,
        userId: this.authContext.getUser().id || 1
      }
    });

    return {
      message: "File uploaded successfully",
      statusCode: HttpStatus.CREATED,
      data: {
        id: fileDoc.id,
        url: uplodedFile.Location
      }
    }
  }

  private validateFile(file: Express.Multer.File) {
    const maxFileSize = this.configService.get<number>('MAX_FILE_SIZE') || 5
    const maxSize = maxFileSize * 1024 * 1024;
    const allowedMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg+xml',
      'image/bmp',
      'image/tiff',
      'image/vnd.microsoft.icon',
    ];

    if (file.size > maxSize) {
      throw new UnsupportedMediaTypeException('File size exceeds the maximum limit of 5MB');
    }

    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new UnsupportedMediaTypeException('Invalid file type. Only images and PDFs are allowed');
    }
  }

  private generateFileName(file: Express.Multer.File): string {
    const fileExtension = extname(file.originalname);
    const uniqueFileName = uuidv4();
    return `${uniqueFileName}${fileExtension}`;
  }
}
