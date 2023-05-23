import admin from "firebase-admin";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { router as framesRouter } from "./routes/frames";
import { router as photoRouter } from "./routes/photos";
import { router as seriesRouter } from "./routes/series";
import sgMail from "@sendgrid/mail";
import { router as stripeRouter } from "./stripe/stripe";

export const app = express();

dotenv.config();

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const serviceAccount = {
  type: process.env.TYPE,
  projectId: process.env.PROJECT_ID,
  privateKeyId: process.env.PRIVATE_KEY_ID,
  privateKey: process.env.PRIVATE_KEY,
  clientEmail: process.env.CLIENT_EMAIL,
  clientId: process.env.CLIENT_ID,
  authUri: process.env.AUTH_URI,
  tokenUri: process.env.TOKEN_URI,
  authProviderCertUrl: process.env.AUTH_PROVIDER_X509_CERT_URL,
  clientCertUrl: process.env.CLIENT_X509_CERT_URL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: "https://matrnaud-default-rtdb.firebaseio.com/",
  storageBucket: "matrnaud.appspot.com",
});

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

app.get("/health", (_req, res) => {
  res.send("Server is alive");
});

app.use("/api/photos", photoRouter);
app.use("/api/series", seriesRouter);
app.use("/api/frames", framesRouter);
app.use("/api/stripe", stripeRouter);

// ! POST a email

app.post("/api/email", async (req, res) => {
  const form = req.body;

  const emailTemplate = {
    to: "matiasrenaud04@gmail.com",
    from: "matrnaudphotos@gmail.com",
    subject: `Booking request from ${form.name}`,
    html: `
    <p><strong>From: </strong>${form.name}, ${form.email}</p>
    <p>${form.message}</p>`,
  };

  const sending = await sgMail.send(emailTemplate).catch((error) => {
    return res
      .status(200)
      .send({ status: "Error", message: "Email not sent.", error: error });
  });

  if (sending) {
    return res.status(200).send({ status: "Success", message: "Email sent." });
  }
});
