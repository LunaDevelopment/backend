import passport from 'passport';
import { Strategy } from 'passport-discord';
import { Models } from '../models';

passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await Models.Users.findOne({
        where: { id }
    });
    if (user) done(null, user);
});

passport.use(
    new Strategy(
        {
            clientSecret: 'TEX6Ju1GJg9BSj9bh7FKtfphou7myNJ1',
            clientID: '866614664301117470',
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
            if (userexists) return done(null, userexists);

            try {
                const newuser = await Models.Users.create({
                    username: profile.username,
                    email: profile.email,
                    password: '',
                    LoginType: 'Discord'
                });
                if (newuser) return done(null, newuser);
            } catch (err: any) {
                return done(err, undefined);
            }
        }
    )
);
