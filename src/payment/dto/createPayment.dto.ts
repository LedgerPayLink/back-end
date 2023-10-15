import {IsNotEmpty, IsNumber, IsNumberString, IsString} from "class-validator";

export class CreatePaymentDto {

    @IsNotEmpty()
    @IsString()
    symbol: string

    @IsNotEmpty()
    @IsNumberString()
    tokenAmount: number

    @IsNotEmpty()
    @IsNumber()
    slippagePer1000: number
}
