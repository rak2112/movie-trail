import crypto from 'crypto';
import { promisify } from 'bluebird';

const sgMail = require('@sendgrid/mail');

sgMail.send = promisify(sgMail.send);
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const createToken = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(16, (err, buf) => {
      if(err) { 
        reject(err);
      }
      resolve(buf.toString('hex'));
    });
  });
};

export const sendConfirmationEmail = async ({email, displayName = ''} : {email: string, displayName?: string}) => {
  const options = {
    to: email,
    from: 'test@example.com',
    subject: 'Your password has been changed',
    html: `<h2>Hello ${displayName}</h2>
      <p>This is a confirmation that the password for your account ${email} on Movie Base has just been changed.</p>`
  };
  return await sgMail.send(options).catch((err: Error) => console.log('error in generating email', err));
};

export const sendPasswordRequestEmail = async (email: string, token: any, host: string) => {
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
  return await sgMail.send(options).catch((err: Error) => console.log('error in generating email', err));
};

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