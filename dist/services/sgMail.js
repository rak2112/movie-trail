"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
// import sgMail from '@sendgrid/mail';
const sgMail = require('@sendgrid/mail');
const bluebird_1 = require("bluebird");
sgMail.send = bluebird_1.promisify(sgMail.send);
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
exports.createToken = () => {
    return new Promise((resolve, reject) => {
        crypto_1.default.randomBytes(16, (err, buf) => {
            if (err) {
                reject(err);
            }
            resolve(buf.toString('hex'));
        });
    });
};
exports.sendConfirmationEmail = ({ email, displayName = '' }) => __awaiter(this, void 0, void 0, function* () {
    const options = {
        to: email,
        from: 'test@example.com',
        subject: 'Your password has been changed',
        html: `<h2>Hello ${displayName}</h2>
      <p>This is a confirmation that the password for your account ${email} on Movie Base has just been changed.</p>`
    };
    return yield sgMail.send(options).catch((err) => console.log('error in generating email', err));
});
exports.sendPasswordRequestEmail = (email, token, host) => __awaiter(this, void 0, void 0, function* () {
    const options = {
        to: email,
        from: 'test@example.com',
        subject: 'Reset your password on Movie Base',
        html: `
      <h2>Hello</h2>
      <p>
        You are receiving this email because you (or someone else) have requested the reset of the password for your account.
        Please click on the following link, or paste this into your browser to complete the process.
      </p>
      http://localhost:3000/reset/${JSON.parse(token)}
      <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
      <p>Regards,</p>
      <p>Movie Base Team</p>
    `
    };
    return yield sgMail.send(options).catch((err) => console.log('error in generating email', err));
});
// export const findUserProfile = async (token: any, profile: any) {
//   const { id } = profile;
//   const currentUser = await User.findOne({googleId: profile.id}); console.log('currentUser', currentUser);
//   if (!currentUser) {
//       const tokens: any = [];
//     const data = {googleId: profile.id, tokens: tokens.concat({ kind: 'google', token }), profile: {name: profile.displayName, gender: profile.gender}};
//     return await new User(data).save()
//     .catch((err: any) => console.log('error updating record', err));
//   }
//   else {
//     return await new User(currentUser).save();
//   }
// };
