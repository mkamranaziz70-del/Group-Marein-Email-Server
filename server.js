const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

/* ================= EMAIL TRANSPORT ================= */

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mkamranaziz70@gmail.com",
    pass: "zcvbxsnnslsqsabz", // Gmail App Password
  },
});

/* ================= SEND EMAIL ================= */

app.post("/send-credentials", async (req, res) => {

  const { email, password, accessCode } = req.body;

  const mailOptions = {
    from: "Groupe Marien <mkamranaziz70@gmail.com>",
    to: email,
    subject: "Your Groupe Marien Storage Account",

    html: `
    <div style="font-family:Arial;padding:20px">

      <h2 style="color:#111">Welcome to Groupe Marien</h2>

      <p>Your storage unit reservation has been successfully confirmed.</p>

      <hr/>

      <h3>Account Credentials</h3>

      <p><b>Email:</b> ${email}</p>
      <p><b>Password:</b> ${password}</p>

      <br/>

      <h3>Facility Access Code</h3>

      <p>Use this code to access the storage facility:</p>

      <h1 style="
        background:#F1F5FF;
        padding:15px;
        border-radius:8px;
        color:#2563EB;
        display:inline-block;
      ">
        ${accessCode}
      </h1>

      <br/><br/>

      <p>Please login and change your password after first login.</p>

      <hr/>

      <p style="color:#777">
        Groupe Marien Storage Services
      </p>

    </div>
    `,
  };

  try {

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: "Email sent successfully"
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      error: err.toString()
    });

  }

});

/* ================= SERVER ================= */

app.listen(3000, () => {
  console.log("Email server running on port 3000");
});
