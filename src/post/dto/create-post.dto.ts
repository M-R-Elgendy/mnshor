import { Allow, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, IsUrl, MaxLength, ValidateIf } from "class-validator";

export class CreatePostDto {
    @IsString()
    @MaxLength(255)
    title: string;

    @IsString()
    @MaxLength(1000)
    content: string;

    @IsOptional()
    @IsString()
    @IsUrl({ require_protocol: true })
    image: string;

    @IsInt()
    @IsPositive()
    categoryId: number;
}
