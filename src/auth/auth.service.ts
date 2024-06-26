import {ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {AuthDto} from "./dto";
import * as argon2 from 'argon2'
import {Tokens} from "./types";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AuthService {


    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}

    async signUp(dto: AuthDto): Promise<Tokens> {
        const hash = await this.hashData(dto.password);
        const newUser = await this.prismaService.user.create({
            data: {
                email: dto.email,
                hash
            }
        }).then(u => u)

        const tokens =  await this.getTokens(newUser.id, newUser.email)

        await this.updateRtHash(newUser.id, tokens.refresh_token);

        return tokens;
    }

    async signIn(dto: AuthDto): Promise<Tokens> {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: dto.email
            }
        }).then(u => u);

        if (!user || !await argon2.verify(user.hash, dto.password)) {
            throw new ForbiddenException("incorrect credentials")
        }

        const tokens =  await this.getTokens(user.id, user.email)
        await this.updateRtHash(user.id, tokens.refresh_token);
        return tokens;
    }

    async logout(userId: string) {
        await this.prismaService.user.updateMany({
            where: {
                id: userId,
                hashedRt: {
                    not: null
                }
            },
            data: {
                hashedRt: null
            }
        })
    }

    async refresh(userId: string, rt: string): Promise<Tokens> {
        const user = await this.prismaService.user.findUnique({
            where: {
                id: userId
            }
        }).then(u => u);

        if (!user || !user.hashedRt) throw new ForbiddenException("Access Denied")
        const refreshTokensMatches = await argon2.verify(user.hashedRt, rt)
        if (!refreshTokensMatches) throw new ForbiddenException("Access Denied")

        const tokens =  await this.getTokens(user.id, user.email)
        await this.updateRtHash(user.id, tokens.refresh_token);
        return tokens;
    }

    private async updateRtHash(userId: string, rt: string) {
        const hash = await this.hashData(rt);
        await this.prismaService.user.update({
            where: {
                id: userId
            },
            data: {
                hashedRt: hash
            }
        });
    }

    private hashData(data: string) {
        return argon2.hash(data)
    }

    private async getTokens(userId: string, email: string): Promise<Tokens> {
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync({
                    sub: userId,
                    email,
                }, {
                    secret: this.configService.get<string>('jwt.at_secret'),
                    expiresIn: 60 * 15
                }
            ),
            this.jwtService.signAsync({
                    sub: userId,
                    email,
                }, {
                    secret: this.configService.get<string>('jwt.rt_secret'),
                    expiresIn: 60 * 60 * 24 * 7
                }
            )
        ])

        return {
            access_token: at,
            refresh_token: rt
        }


    }
}
