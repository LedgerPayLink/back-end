import { Module } from '@nestjs/common';
import { ConfigurationController } from './configuration.controller';
import { ConfigurationService } from './configuration.service';
import { TokensHelper } from '../common/tokens';

@Module({
  controllers: [ConfigurationController],
  providers: [ConfigurationService, TokensHelper]
})
export class ConfigurationModule {}
