import { Transform } from "class-transformer";
import { IsPositive, IsInt, ValidateIf, Min, IsOptional } from "class-validator";

export class IdDot {
    @Transform(({ value }) => parseInt(value, 10))
    // @ValidateIf((o) => typeof o.id === 'number')
    @IsInt()
    @IsPositive()
    id: number;
}

export class PaginationDto {
    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    @IsInt()
    @IsPositive()
    @Min(1)
    page: number;

    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    @IsInt()
    @IsPositive()
    @Min(10)
    limit: number;
}