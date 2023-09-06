import {Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {UserService} from "./user.service";
import {EoaDto} from "./dto";
import {GetCurrentUserId} from "../common/decorators";

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}

    @Post('add_eoa')
    @HttpCode(HttpStatus.NO_CONTENT)
    addEOA(@GetCurrentUserId() userId: string, @Body() eoa: EoaDto) {
        return this.userService.addEOA(userId, eoa);
    }
}


