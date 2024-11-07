import { IsNumber, ArrayNotEmpty, IsArray, ArrayMinSize, Min } from "class-validator";

export class CreateUsersPreferenceDto {

    // @IsArray()
    // @ArrayNotEmpty()
    // @ArrayMinSize(1)
    // @IsNumber({}, { each: true })
    // @Min(1, { each: true })
    // preferences: number[];

    @IsNumber()
    @Min(1)
    categoryId: number;

}
