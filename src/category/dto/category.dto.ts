import { IsString, MaxLength } from "class-validator";

export class CategoryDto {

    @IsString()
    @MaxLength(255)
    name: string;

}

