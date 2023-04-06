import express from "express";
import multer, { memoryStorage } from "multer";
import serviceAccount from "./serviceAccount.json";
import admin, { storage, firestore } from "firebase-admin";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.use(cors());
app.use(bodyParser.json());

const upload = multer({ storage: memoryStorage() });

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: "https://matrnaud-default-rtdb.firebaseio.com/",
  storageBucket: "matrnaud.appspot.com",
});

type Photo = {
  id: string;
  photos: string[];
};

app.get("/photos", async (req, res) => {
  const db = firestore();

  const mainPhotos = await db
    .collection("main-photos")
    .get()
    .catch((error) => {
      console.log(error);
    });

  if (!mainPhotos)
    return res
      .status(400)
      .send("Database error: columns collection do not exist.");

  return res.status(200).json(mainPhotos.docs.map((photo) => photo.data()));
});

app.get("/photos/:photoId", async (req, res) => {
  const db = firestore();
  const photoId = req.params.photoId;

  const photo = await db
    .collection("main-photos")
    .doc(photoId)
    .get()
    .catch((error) => {
      console.log(error);
    });

  if (!photo)
    return res
      .status(400)
      .send("Database error: columns collection do not exist.");

  return res.status(200).send(photo.data());
});

app.put("/photos", upload.single("photo"), async (req, res) => {
  const bucket = storage().bucket();
  const db = firestore();

  if (req.file === undefined) return res.status(400).send("No file.");

  // * Firebase storage

  const fileId = crypto.randomUUID();
  const buffer = req.file.buffer;
  const file = bucket.file(fileId);
  await file.save(buffer).catch((error) => console.log(error));
  await file.makePublic();
  const path = file.publicUrl();

  const photo = {
    id: fileId,
    title: "",
    description: "",
    mainPhoto: path,
    photoshoot: [],
    popularity: 0,
  };

  await db
    .collection("main-photos")
    .doc(fileId)
    .set(photo)
    .catch((error) => console.log(error));

  const mainPhotos = await db
    .collection("main-photos")
    .get()
    .catch((error) => {
      console.log(error);
    });

  if (!mainPhotos)
    return res
      .status(400)
      .send("Database error: columns collection do not exist.");
  return res.status(200).send(mainPhotos.docs.map((photo) => photo.data()));
});

app.put("/photos/:photoId", upload.single("photo"), async (req, res) => {
  const bucket = storage().bucket();
  const db = firestore();

  if (req.file === undefined) return res.status(400).send("No file.");

  // * Firebase storage

  const photoId = req.params.photoId;

  const fileId = crypto.randomUUID();
  const buffer = req.file.buffer;

  const file = bucket.file(fileId);
  await file.save(buffer).catch((error) => console.log(error));
  await file.makePublic();
  const path = file.publicUrl();

  const photoRef = db.collection("main-photos").doc(photoId);

  if (!photoRef)
    return res
      .status(400)
      .send("Database error: columns collection do not exist.");

  const photo = (await photoRef.get()).data();

  if (!photo)
    return res
      .status(400)
      .send("Database error: columns collection do not exist.");

  const photoshoot = photo.photoshoot;

  photoshoot.push({ id: fileId, url: path });

  await photoRef.update({ photoshoot: photoshoot });

  return res.status(200).send(photo);
});

app.put("/photos/:photoId/:photoshootPhotoId", async (req, res) => {
  const bucket = storage().bucket();
  const db = firestore();

  const photoId = req.params.photoId;
  const photoshootPhototId = req.params.photoshootPhotoId;

  const photoRef = db.collection("main-photos").doc(photoId);

  if (!photoRef)
    return res.status(400).send("Database error: row does not exist.");

  const photo = (await photoRef.get()).data();

  if (!photo)
    return res.status(400).send("Database error: row does not exist.");

  const file = bucket.file(photoshootPhototId);
  await file.delete().catch((error) => console.log(error));

  const photoshoot = photo.photoshoot;
  const photoshootId: string[] = photo.photoshoot.map(
    (photoshootPhoto: { id: string; url: string }) => photoshootPhoto.id
  );

  photoshoot.splice(photoshootId.indexOf(photoshootPhototId), 1);

  await photoRef
    .update({ photoshoot: photoshoot })
    .catch((error) => console.log(error));

  return res.status(200).send(photo);
});

app.delete("/photos/:photoId", async (req, res) => {
  const bucket = storage().bucket();
  const db = firestore();

  const phototId = req.params.photoId;

  const photoRef = db.collection("main-photos").doc(phototId);

  if (!photoRef)
    return res.status(400).send("Database error: row does not exist.");

  const photo = (await photoRef.get()).data();

  if (!photo)
    return res.status(400).send("Database error: row does not exist.");

  for (const photoshootPhoto of photo.photoshoot) {
    const file = bucket.file(photoshootPhoto.id);
    await file.delete().catch((error) => console.log(error));
  }

  const file = bucket.file(photo.id);
  await file.delete().catch((error) => console.log(error));
  await photoRef.delete().catch((error) => console.log(error));

  const mainPhotos = await db
    .collection("main-photos")
    .get()
    .catch((error) => {
      console.log(error);
    });

  if (!mainPhotos)
    return res
      .status(400)
      .send("Database error: columns collection do not exist.");

  return res.status(200).send(mainPhotos.docs.map((photo) => photo.data()));
});

app.listen(9000, () => console.log(`Server Running on port ${9000}`));
