import { Application } from 'express';
import UserService from '../services/user-service';
import UserPermissionService from '../services/permission-service';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import * as passport from 'passport';
import Consts from '../config/consts';

var opts = {
    secretOrKey: Consts.TOKEN_SECRET,
    jwtFromRequest: ExtractJwt.fromHeader(Consts.TOKEN_HEADER)
};

class Auth {

    private passportInstance: passport.Passport;

    constructor() {
        this.passportInstance = new passport.Passport();
        this.passportInstance.use(this.getStrategy());
    }

    private getStrategy() {
        return new Strategy(opts, function (payload, done) {
            UserService.findById(payload.id).then(user => {
                if (user != null && user.id != null) {
                    delete user.password;
                    return done(null, user);
                } else {
                    return done(new Error("User not found"), null);
                }
            });
        });
    }

    public initialize() {
        return this.passportInstance.initialize();
    }
    public authenticate() {
        return this.passportInstance.authenticate("jwt", { session: false });
    }

    public authorize(permissionName) {
        return async (req, res, next) => {
            let isPermissionFound = await UserPermissionService.hasUserPermission(req.user.profileId, permissionName);

            if (isPermissionFound) {
                next();
            } else {
                res.sendStatus(401);
            };
        }
    }

}

export default new Auth();