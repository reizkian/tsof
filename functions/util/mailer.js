const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const fs = require("fs");
const handlebars = require("handlebars");

// get email password from firebase environment variable
const emailPassword = functions.config().tsof.email_password;
// get JWT key from firebase environment variable
const privateKeyJWT = functions.config().tsof;

exports.sendEmailWelcome = (recieverEmail, recieverName) => {
  console.log("send email confirmation to: " + recieverEmail);
  // ~ create transporter object to send email
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "sofgkkdjogja@gmail.com",
      pass: emailPassword,
    },
  });

  // ~ read HTML file
  readHTMLFile("util/smtp/verify_email.html", function(err, html) {
    var template = handlebars.compile(html);
    var replacements = {
      recieverEmail: recieverEmail,
      recieverName: recieverName,
    };
    // ~ variable html replacement
    var htmlToSend = template(replacements);
    // ~ mailer option
    const option = {
      from: "sofgkkdjogja@gmail.com",
      to: recieverEmail,
      subject: "Welcome to The School of Fire System Information",
      html: htmlToSend,
    };
    return transporter.sendMail(option);
  });
};

// ~ function to read HTML file
function readHTMLFile(path, callback) {
  fs.readFile(path, { encoding: "utf-8" }, function(err, html) {
    if (err) {
      callback(err);
      throw err;
    } else {
      callback(null, html);
    }
  });
}
