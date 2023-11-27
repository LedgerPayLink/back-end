import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { EoaDto } from '../common/dto';
import { GetCurrentUserId } from '../common/decorators';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiBearerAuth('jwt')
  @Post('add_eoa')
  @HttpCode(HttpStatus.NO_CONTENT)
  addEOA(@GetCurrentUserId() userId: string, @Body() eoa: EoaDto) {
    return this.userService.addEOA(userId, eoa);
  }

  ///////////////////////////////////////// Queries ///////////////////////////////////

  @ApiBearerAuth('jwt')
  @Get('get_eoas')
  @HttpCode(HttpStatus.OK)
  getEOAs(@GetCurrentUserId() userId: string): Promise<EoaDto[]> {
    return this.userService.getEOAS(userId);
  }

}
