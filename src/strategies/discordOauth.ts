import passport from 'passport';
import { Strategy } from 'passport-discord';
import { Models } from '../models';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await Models.Users.findOne({
        where: { id: id }
    });
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
                where: { id: profile.id }
            });
            if (userexists) {
                const updateuser = await Models.Users.update(
                    { avatar: profile.avatar },
                    {
                        where: {
                            id: profile.id
                        }
                    }
                );
                const newexist = await Models.Users.findOne({
                    where: { id: profile.id }
                });
                return done(null, newexist);
            }

            try {
                const newuser = await Models.Users.create({
                    id: profile.id,
                    username: profile.username + '#' + profile.discriminator,
                    email: profile.email,
                    avatar: profile.avatar
                });
                if (newuser) return done(null, newuser);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
                return done(err, undefined);
            }
        }
    )
);
