import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy, StrategyOptions, VerifyCallback} from 'passport-jwt'
import {ConfigService} from "@nestjs/config";
import {Injectable} from "@nestjs/common";
import {JwtPayload} from "../types";


@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {

    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('jwt.at_secret')
        });
    }

    validate(payload: JwtPayload) {
        return payload;
    }
}
