import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';
import { Public } from '../common/decorators';
import { TokenDto } from '../common/dto';

@Controller('configuration')
export class ConfigurationController {


  constructor(private configurationService: ConfigurationService) {
  }

  @Public()
  @Get('eoa_token_list')
  @HttpCode(HttpStatus.OK)
  getEOATokenList(): TokenDto[] {
    const tokensDTO: TokenDto[] = [];
    this.configurationService.getEOAsTokenList().forEach((tokens, chainId) => {
      tokens.forEach(token => {
        tokensDTO.push({
          chainId: chainId,
          symbol: token.symbol
        })
      })
    });
    return tokensDTO;
  }
}
