import { Injectable } from '@nestjs/common';
import { Token, TokensHelper } from '../common/tokens';

@Injectable()
export class ConfigurationService {

  constructor(private tokensHelperService: TokensHelper) {}


  getEOAsTokenList(): Map<number, Token[]> {
    return this.tokensHelperService.tokens;
  }
}
