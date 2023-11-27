import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TokenDto {
  @IsNotEmpty()
  @IsNumber()
  chainId: number;

  @IsNotEmpty()
  @IsString()
  symbol: string;
}
