import { IsDate, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class PayLinkDtoQuery {
  @IsNotEmpty()
  @IsString()
  id: string

  @IsNotEmpty()
  @IsString()
  fiatCurrency: string;

  @IsNotEmpty()
  @IsPositive()
  priceAmountInCents: number;

  @IsNotEmpty()
  @IsNumber()
  destinationChainId: number;

  @IsNotEmpty()
  @IsDate()
  createdAt: Date
}
