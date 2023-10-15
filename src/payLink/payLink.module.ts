import { Module } from '@nestjs/common';
import { PayLinkController } from './payLink.controller';
import { PayLinkService } from './payLink.service';
import {UserService} from "../user/user.service";
import {TokensHelper} from "../common/tokens";

@Module({
  controllers: [PayLinkController],
  providers: [PayLinkService, UserService, TokensHelper]
})
export class PayLinkModule {}
