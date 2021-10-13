import passport from 'passport';
import { Strategy } from 'passport-discord';
import { Models } from '../models';

passport.serializeUser((user: any, done) => {
    done(null, user);
});

passport.deserializeUser(async (id, done) => {
    console.log(id)
    const user = await Models.Users.findOne({
        where: { email: id }
    })
    return done(null, user);
});

passport.use(
    new Strategy(
        {
            clientSecret: 'NdQXHWA6ngY0RmWmW6WbO9qZ2lkkST1N',
            clientID: '799139804985950208',
            callbackURL: 'https://api44.moonhideoutdev.com/redirect',
            scope: ['identify', 'email']
        },
        async (accessToken: string, refreshToken: string, profile: Strategy.Profile, done) => {
            if (!profile.email) {
                return done(new Error('no email connected to account'), undefined);
            }

            const userexists = await Models.Users.findOne({
                where: { email: profile.email, username: profile.username }
            });
            if (userexists) return done(null, userexists)

            try {
                const newuser = await Models.Users.create({
                    username: profile.username,
                    email: profile.email,
                    password: '',
                    logintype: 'discord'
                });
                if (newuser) return done(null, newuser);
            } catch (err: any) {
                return done(err, undefined);
            }
        }
    )
);
