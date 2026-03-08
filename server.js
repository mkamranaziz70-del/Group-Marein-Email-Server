const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mkamranaziz70@gmail.com",
    pass: "zcvbxsnnslsqsabz",
  },
});

app.post("/send-credentials", async (req, res) => {
const { email, password, accessCode } = req.body;
  
  const mailOptions = {
    from: "Groupe Marien <mkamranaziz70@gmail.com>",
    to: email,
    subject: "Your Groupe Marien Account",
   html: `
<h2>Welcome to Groupe Marien</h2>

<p>Your storage unit reservation is confirmed.</p>

<h3>Account Credentials</h3>
<p><b>Email:</b> ${email}</p>
<p><b>Password:</b> ${password}</p>

<h3>Access Code</h3>
<p>Your facility access code:</p>

<h2 style="color:#2563EB">${accessCode}</h2>

<p>Use this code to access your storage facility.</p>

<p>Please login and change your password after first login.</p>
`
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
