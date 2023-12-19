import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class GetTokenAmountDto {
  @IsNotEmpty()
  @IsString()
  selectedSymbol: string;
}
