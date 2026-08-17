import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../application/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) { // Creating a local strategy of auth extending Passport
    constructor(private authService: AuthService) {
        super({ usernameField: 'email'}); // Added config options to alter passport-local's default strategy behavior
    }

    async validate(email: string, pass: string): Promise<any> {
        const user = await this.authService.validateUser(email, pass);
        if(!user) {
            throw new UnauthorizedException();
        }
        return user;
    }

}