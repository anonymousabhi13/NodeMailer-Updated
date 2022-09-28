


const nodemailer = require("nodemailer");
const googleApis = require("googleapis");

const REDIRECT_URI = `https://developers.google.com/oauthplayground`;
const CLIENT_ID = ` `;
const CLIENT_SECRET = ` `;
const REFRESH_TOKEN = ` `;

const authClient = new googleApis.google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);






authClient.setCredentials({ refresh_token: REFRESH_TOKEN });

async function mailer() {
  try {
    const ACCESS_TOKEN = await authClient.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "sender Email",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: ACCESS_TOKEN,
      },
    });

    const details = {
      from: "Abhilash Patel <abhilashpatel113@mail.com>",
      to: "prasoonrai22@gmail.com",
      subject: "Sab theek Thak Hai",
      text: "Kaisan BA",
      html: "<h2>Padh le</h2>",
    };

    const result = await transport.sendMail(details);
    return result;
  } catch (err) {
    return err;
  }
}

mailer().then((res) => {
  console.log("sent mail !", res);
});