import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class PayLinkDto {
  @IsNotEmpty()
  @IsString()
  fiatCurrency: string;

  @IsNotEmpty()
  @IsPositive()
  priceAmountInCents: number;

  @IsNotEmpty()
  @IsNumber()
  destinationChainId: number;
}
