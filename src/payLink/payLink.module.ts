import { Module } from '@nestjs/common';
import { PayLinkController } from './payLink.controller';
import { PayLinkService } from './payLink.service';
import {UserService} from "../user/user.service";

@Module({
  controllers: [PayLinkController],
  providers: [PayLinkService, UserService]
})
export class PayLinkModule {}
