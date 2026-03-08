const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "yourgmail@gmail.com",
    pass: "gmail_app_password",
  },
});

app.post("/send-credentials", async (req, res) => {
  const { email, password } = req.body;

  const mailOptions = {
    from: "Groupe Marien <yourgmail@gmail.com>",
    to: email,
    subject: "Your Groupe Marien Account",
    html: `
      <h2>Welcome to Groupe Marien</h2>
      <p>Your storage account has been created.</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Password:</b> ${password}</p>
      <p>Please login and change your password.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

app.listen(3000, () => {
  console.log("Email server running");
});