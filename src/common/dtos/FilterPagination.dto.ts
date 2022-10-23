import { IsOptional, IsPositive, Min } from 'class-validator';

abstract class FiltePaginationDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
}

export { FiltePaginationDto };
