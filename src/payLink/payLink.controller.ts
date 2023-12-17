import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { PayLinkService } from './payLink.service';
import { GetCurrentUserId } from '../common/decorators';
import { PayLinkDto } from './dto/payLink.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PayLinkDtoQuery } from './dto/payLinkQuery.dto';

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

  ////////////////////  QUERIES  /////////////////////////:

  @ApiBearerAuth('jwt')
  @Get('get_pay_links')
  @HttpCode(HttpStatus.OK)
  getPayLinks(@GetCurrentUserId() userId: string): Promise<PayLinkDtoQuery[]> {
    return this.payLinkService.getPayLinks(userId);
  }
}
