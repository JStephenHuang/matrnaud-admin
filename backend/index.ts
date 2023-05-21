import express from "express";
import multer, { memoryStorage } from "multer";
import serviceAccount from "./serviceAccount.json";
import admin, { firestore } from "firebase-admin";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";
import path from "path";

import { router as photoRouter } from "./routes/photos";
import { router as seriesRouter } from "./routes/series";
import { router as framesRouter } from "./routes/frames";

const app = express();

dotenv.config();

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: "https://matrnaud-default-rtdb.firebaseio.com/",
  storageBucket: "matrnaud.appspot.com",
});

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

app.use("/photos", photoRouter);
app.use("/series", seriesRouter);
app.use("/frames", framesRouter);

app.use("/", express.static(path.join(__dirname, "../frontend/dist")));

// ! POST a email

app.post("/email", async (req, res) => {
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

app.listen(9000, "0.0.0.0", () =>
  console.log(`Server Running on port ${9000}`)
);
