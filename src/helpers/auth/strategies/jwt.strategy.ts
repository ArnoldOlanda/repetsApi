import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../../../interfaces/JwtPayload';
import Usuario from '../../../models/usuario';

export class JwtStrategy {
  constructor() {
    this.init();
  }

  validate(jwtPayload: JwtPayload, done: any) {
    const user = Usuario.findOne({ uid: jwtPayload.uid });
    if (!user) {
      return done(null, false);
    } else {
      return done(null, jwtPayload);
    }
  }

  init() {
    const options = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: `${process.env.SECRETORPRIVATEKEY}`,
    };
    passport.use(new Strategy(options, this.validate));
  }
}
