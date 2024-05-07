const nodemailer = require("nodemailer");
const { passEmailApp, myEmail } = require("./settings");

async function sendEmail(dataEmail, req, res, path1, path2) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    requireTLS: true,
    auth: {
      user: myEmail,
      pass: passEmailApp,
    },
    from: myEmail,
  });
  transporter.sendMail(dataEmail, (err, info) => {
    if (err) {
      console.log(err);
      req.flash("error_msg", "Something Wrong");
      return res.redirect(path1);
    } else {
      req.flash(
        "success_msg",
        `Success Send Email to : ${dataEmail.to}, Check Your Mail Box/Spam Box`
      );
      return res.redirect(path2);
    }
  });
}

module.exports = { sendEmail };
