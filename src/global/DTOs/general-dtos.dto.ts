import { Transform } from "class-transformer";
import { IsPositive, IsInt, ValidateIf } from "class-validator";

export class IdDot {
    @Transform(({ value }) => parseInt(value, 10))
    // @ValidateIf((o) => typeof o.id === 'number')
    @IsInt()
    @IsPositive()
    id: number;
}

export class PaginationDto {
    @Transform(({ value }) => parseInt(value, 10))
    @IsInt()
    @IsPositive()
    page: number;

    @Transform(({ value }) => parseInt(value, 10))
    @IsInt()
    @IsPositive()
    limit: number;
}