import passport from 'passport';
import { Strategy as GithubStrategy } from 'passport-github2';
import config from '../config/env.config.js';
import logger from '../lib/logger.lib.js';
import { githubService } from '../services/auth.service.js';

passport.use(
  new GithubStrategy(
    {
      clientID: config.GITHUB_CLIENT_ID,
      clientSecret: config.GITHUB_CLIENT_SECRET,
      callbackURL: config.GITHUB_REDIRECT_URI,
      passReqToCallback: true,
    },
    async (req, _accessToken, _refreshToken, profile, done) => {
      try {
        const role = req.query.state;

        if (!role) {
          logger.error('Role not provided in state parameter', {
            label: 'GithubPassportStrategy',
          });
          return done(new Error('Role not provided in state parameter'));
        }
        const displayName = profile.username;
        const avatar = profile.photos?.[0].value;
        const githubId = profile.id;

        const user = await githubService({
          displayName,
          avatar,
          githubId,
          role,
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
