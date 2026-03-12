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
app.post("/send-invoice", async (req, res) => {

  const { email, customerName, invoiceId, amount, dueDate, unitName, method } = req.body;

  const mailOptions = {
    from: "Groupe Marien <mkamranaziz70@gmail.com>",
    to: email,
    subject: `Invoice ${invoiceId} - Groupe Marien`,
    html: `
    <div style="font-family:Arial;padding:20px">

      <h2>Invoice Notification</h2>

      <p>Hello ${customerName},</p>

      <p>Your invoice has been generated.</p>

      <hr/>

      <p><b>Invoice ID:</b> ${invoiceId}</p>
      <p><b>Unit:</b> ${unitName}</p>
      <p><b>Amount:</b> $${amount}</p>
      <p><b>Payment Method:</b> ${method}</p>
      <p><b>Due Date:</b> ${dueDate}</p>

      <br/>

      <p>Please complete your payment before the due date.</p>

      <hr/>

      <p style="color:#777">Groupe Marien Billing</p>

    </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: "Invoice email sent",
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      error: err.toString(),
    });

  }
});
app.post("/send-reminder", async (req, res) => {

  const { email, customerName, invoiceId, amount, dueDate, status } = req.body;

  const mailOptions = {
    from: "Groupe Marien <mkamranaziz70@gmail.com>",
    to: email,
    subject: `Payment Reminder - Invoice ${invoiceId}`,

    html: `
    <div style="font-family:Arial;padding:20px">

      <h2 style="color:#EF4444">Payment Reminder</h2>

      <p>Hello ${customerName},</p>

      <p>This is a reminder that your invoice is currently <b>${status}</b>.</p>

      <hr/>

      <p><b>Invoice ID:</b> ${invoiceId}</p>
      <p><b>Amount Due:</b> $${amount}</p>
      <p><b>Due Date:</b> ${dueDate}</p>

      <br/>

      <p>Please make your payment as soon as possible.</p>

      <hr/>

      <p style="color:#777">Groupe Marien Billing</p>

    </div>
    `,
  };

  try {

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: "Reminder email sent",
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      error: err.toString(),
    });

  }

});
/* ================= SERVER ================= */

app.listen(3000, () => {
  console.log("Email server running on port 3000");
});
