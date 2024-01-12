import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { EoaDto } from '../common/dto';
import { GetCurrentUserId } from '../common/decorators';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { UserDto } from 'src/user/dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiBearerAuth('jwt')
  @Post('add_eoa')
  @HttpCode(HttpStatus.NO_CONTENT)
  addEOA(@GetCurrentUserId() userId: string, @Body() eoa: EoaDto) {
    return this.userService.addEOA(userId, eoa);
  }

  @ApiBearerAuth('jwt')
  @Put('update_user')
  @HttpCode(HttpStatus.OK)
  updateUser(
    @GetCurrentUserId() userId: string,
    @Body() userDto: UserDto,
  ): Promise<UserDto> {
    return this.userService.updateUser(userId, userDto);
  }
  ///////////////////////////////////////// Queries ///////////////////////////////////

  @ApiBearerAuth('jwt')
  @Get('get_eoas')
  @HttpCode(HttpStatus.OK)
  getEOAs(@GetCurrentUserId() userId: string): Promise<EoaDto[]> {
    return this.userService.getEOAS(userId);
  }

  @ApiBearerAuth('jwt')
  @Get('get_user')
  @HttpCode(HttpStatus.OK)
  getUser(@GetCurrentUserId() userId: string): Promise<any> {
    return this.userService.getUser(userId);
  }
}
