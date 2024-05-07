const LocalStrategy = require("passport-local").Strategy;
const { getHashedPassword } = require("./functions");
const { User } = require("../database/model");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
      },
      function (email, password, done) {
        let hashed = getHashedPassword(password);
        User.findOne({ email: email }).then((users) => {
          if (!users)
            return done(null, false, {
              message: "That Email is not registered",
            });
          if (!users.verif)
            return done(null, false, {
              message: "Your Email Not Verified Please Check Your Email",
            });
          if (email === users.email && hashed === users.password)
            return done(null, users, {
              message: "Login Success",
            });
          else
            return done(null, false, {
              message: "Your Password Invalid",
            });
        });
      }
    )
  );
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
