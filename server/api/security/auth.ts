import { Application } from 'express';
import UserService from '../services/user-service';
import { AuthorizationMiddleware } from './authorization-middleware';
import { Logger } from '../../config/logger';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import * as passport from 'passport';

var opts = {
    secretOrKey: "mySecret",
    jwtFromRequest: ExtractJwt.fromHeader("authorization")
};

class Auth {

    private passportInstance: passport.Passport;

    constructor() {
        this.passportInstance = new passport.Passport();
        this.passportInstance.use(this.getStrategy());
    }
    
    private getStrategy(){
        return new Strategy(opts, function (payload, done) {
            UserService.findById(payload.id).then(user => {
                if (user) {
                    return done(null, { id: user.id });
                } else {
                    return done(new Error("User not found"), null);
                }
            });
        });
    }

    public initialize(){
        return this.passportInstance.initialize();
    }
    public authenticate() {
        return this.passportInstance.authenticate("jwt", { session: false });
    }

}

export default new Auth();