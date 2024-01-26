import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { EoaDto } from '../common/dto';
import { GetCurrentUserId, Public } from '../common/decorators';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserDto, UserQueryDto } from 'src/user/dto/user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {
  destinationFile,
  editAvatarFileName,
  handleFileUploadErrors,
  imageFileFilter,
} from 'src/common/utils/uploadFile';

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
  getUser(@GetCurrentUserId() userId: string): Promise<UserQueryDto> {
    return this.userService.getUser(userId);
  }

  @Public()
  @Post('upload')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: destinationFile,
        filename: editAvatarFileName,
      }),
      fileFilter: imageFileFilter,
      limits: { fileSize: 1024 * 1024 },
    }),
  )
  uploadFile(@UploadedFiles() file: Express.Multer.File, @Req() req) {
    handleFileUploadErrors(req);
    return file;
  }

  @Public()
  @Get('getImage/:imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './files' });
  }
}
