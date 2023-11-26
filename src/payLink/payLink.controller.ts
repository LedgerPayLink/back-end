import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { PayLinkService } from './payLink.service';
import { GetCurrentUserId } from '../common/decorators';
import { PayLinkDto } from './dto/payLink.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('paylink')
export class PayLinkController {
  constructor(private payLinkService: PayLinkService) {}

  @ApiBearerAuth('jwt')
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  createPayLink(
    @GetCurrentUserId() userId: string,
    @Body() payLinkDto: PayLinkDto,
  ) {
    return this.payLinkService.createPayLink(userId, payLinkDto);
  }
}
