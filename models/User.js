import mongoose from "mongoose";
import bcrypt from "bcrypt-nodejs";
const Schema = mongoose.Schema;
mongoose.set("useCreateIndex", true);
// the user model
//lastName, firstName, email, role, permission,
const UserSchema = new Schema(
  {
    lastName: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    _role: {
      type: [
        {
          type: String,
          default: "student"
        }
      ]
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

UserSchema.pre("save", next => {
  let user = this;
  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, null, function(err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

UserSchema.methods.comparePassword = function(passw, cb) {
  bcrypt.compare(passw, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

export default mongoose.model("User", UserSchema);
