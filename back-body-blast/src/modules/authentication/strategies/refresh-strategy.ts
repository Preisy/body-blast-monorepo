import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ExtractJwt } from 'passport-jwt';
import { Request } from 'supertest';
import { ExternalPayloadType } from '../types/external-payload.type';

export class RefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
      secretOrKey: process.env.JWT_REFRESH_SECRET,
    });
  }

  async validation(req: Request, payload: ExternalPayloadType) {
    const refreshToken = req.get('authorization').replace('bearer', '').trim();

    return {
      ...payload,
      refreshToken,
    };
  }
}
