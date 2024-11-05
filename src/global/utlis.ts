import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
@Injectable()
export class Utlis {

    constructor(
        private readonly configService: ConfigService
    ) { }

    generateRandomNumber(length: number): number {
        const digits = '0123456789';
        let OTP = '';
        for (let i = 0; i < length; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        return +OTP;
    }
}