import {IsNotEmpty, IsNumberString, IsString} from "class-validator";

export class CreatePaymentDto {

    @IsNotEmpty()
    @IsString()
    symbol: string

    @IsNotEmpty()
    @IsNumberString()
    tokenAmount: number

    slippagePer1000: number
}
