import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy, StrategyOptions, VerifyCallback} from 'passport-jwt'
import {ConfigService} from "@nestjs/config";
import {Request} from 'express'
import {ForbiddenException, Injectable} from "@nestjs/common";
import {JwtPayload, JwtPayloadWithRt} from "../types";

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {

    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('JWT_RT_SECRET'),
            passReqToCallback: true
        });
    }

    validate(req: Request, payload: JwtPayload): JwtPayloadWithRt {
        const refreshToken = req
            ?.get('authorization')
            ?.replace('Bearer', '')
            .trim();

        if (!refreshToken) throw new ForbiddenException('Refresh token malformed');

        return {
            ...payload,
            refreshToken
        };
    }
}
