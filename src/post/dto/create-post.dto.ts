import { Allow, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, IsUrl, MaxLength, ValidateIf } from "class-validator";

export class CreatePostDto {
    @IsString()
    @MaxLength(50)
    title: string;

    @IsString()
    @MaxLength(255)
    content: string;

    @IsOptional()
    @IsString()
    @IsUrl({ require_protocol: true })
    image: string;

    @IsInt()
    @IsPositive()
    categoryId: number;

    @ValidateIf((o) => !o.content || !o.image)
    @IsNotEmpty()
    contentOrImage: string;
}
