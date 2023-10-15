import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class EoaDto {
  @IsNotEmpty()
  @IsNumber()
  chainId: number;

  @IsNotEmpty()
  @IsString()
  symbol: string;

  @IsNotEmpty()
  @IsString()
  address: string;
}
