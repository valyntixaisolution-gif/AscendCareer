import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import config from '../config/env.config';
import logger from './logger.lib';
import { googleService } from '../services/auth.service';

passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: config.GOOGLE_REDIRECT_URI,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0].value;
        const displayName = profile.displayName;
        const avatar = profile.photos?.[0].value;
        const googleId = profile.id;

        const user = await googleService({
          email,
          displayName,
          avatar,
          googleId,
        });

        return done(null, user);
      } catch (error) {
        logger.error('Google authentication failed', {
          label: 'PassportGoogleStrategy',
          error: error.message,
        });
        return done(error);
      }
    }
  )
);
