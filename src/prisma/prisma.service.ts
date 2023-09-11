import {Injectable, OnModuleDestroy, OnModuleInit} from '@nestjs/common';
import {PrismaClient} from "@prisma/client";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor(private configService: ConfigService) {
        super({
            datasourceUrl:  configService.get<string>('database_url')
        });
    }

    async onModuleInit() {
        await this.$connect();
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }

}
