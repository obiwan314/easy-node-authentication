/**
 * Created by wreichardt on 1/28/15.
 */

var OAuth1Strategy = require('passport-oauth1').Strategy;
var util = require('util');

function Strategy(options, verify) {
    options = options || {};
    options.requestTokenURL = options.requestTokenURL || 'https://runsignup.com/oauth/requestToken.php';
    options.accessTokenURL = options.accessTokenURL ||'https://runsignup.com/oauth/accessToken.php';
    options.userAuthorizationURL = options.userAuthorizationURL || 'https://runsignup.com/OAuth/Verify';
    options.sessionKey = options.sessionKey || 'oauth:runsignup';

    OAuth1Strategy.call(this, options, verify);
    this.name = 'runsignup';
    this._userProfileURL = options.userProfileURL || 'https://runsignup.com/rest/user?format=json';
}

util.inherits(Strategy, OAuth1Strategy);

Strategy.prototype.userProfile =function(token, tokenSecret, params, done){
    // Take the token and secret and make an API call
    // To Identify this user
    var json;
    this._oauth.get(this._userProfileURL , token, tokenSecret, function (err, body, res) {
        if (err) {
            if (err.data) {
                try {
                    json = JSON.parse(err.data);
                } catch (_) {}
            }

            if (json && json.errors && json.errors.length) {
                var e = json.errors[0];
                return done(new APIError(e.message, e.code));
            }
            return done(new InternalOAuthError('Failed to fetch user profile', err));
        }
        var rsprofile=null;
        try {
            rsprofile = JSON.parse(body);
        } catch (ex) {
            return done(new Error('Failed to parse user profile'));
        }

        return done(null,
            {
                id:rsprofile.user.user_id,
                provider:"runsignup",
                name:{givenName:rsprofile.user.first_name,familyName:rsprofile.user.last_name},
                emails:[rsprofile.user.email]
            }
        );
    });
};


/**
 * Expose `Strategy`.
 */
module.exports = {Strategy:Strategy};

