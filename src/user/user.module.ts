import { Module } from '@nestjs/common';
import {TokensHelper} from "../common/tokens";

@Module({
    providers: [TokensHelper]
})
export class UserModule {}
