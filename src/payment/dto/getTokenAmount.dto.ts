import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class GetTokenAmountDto {
  @IsNotEmpty()
  @IsString()
  fiatCurrency: string;

  @IsNotEmpty()
  @IsNumberString()
  amountInCents: number;

  @IsNotEmpty()
  @IsString()
  symbol: string;
}
