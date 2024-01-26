import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import CatModel from './models/CatModel.js';
import dotenv from 'dotenv';
dotenv.config();

const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();
app.use(express.json());
app.use(cors());

app.get("/api/cats/", async (req, res) => {
  const cats = await CatModel.find().sort({ created: "desc" });
  const prettyJson = JSON.stringify(cats, null, 2);
  res.type('json').send(prettyJson);
});

app.get("/api/cats/egypt", async (req, res) => {
  const cats = await CatModel.find({ origin: 'Egypt' }).sort({ created: "desc" });
  const prettyJson = JSON.stringify(cats, null, 2);
  res.type('json').send(prettyJson);
});

app.get("/api/cats/:id", async (req, res) => {
  const cat = await CatModel.findById(req.params.id);
  return res.json(cat);
});

app.get('/api/cats/searchbyname/:searchString', async (req, res) => {
  const { searchString } = req.params;
  try {
    const matchingCats = await CatModel.find({ name: { $regex: searchString, $options: 'i' } }).sort({ created: 'desc' });
    const prettyJson = JSON.stringify(matchingCats, null, 2);
    res.type('json').send(prettyJson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hiba történt a lekérdezés során.' });
  }
});

app.get('/api/cats/searchbydesc/:searchString', async (req, res) => {
  const { searchString } = req.params;
  try {
    const matchingCats = await CatModel.find({ description: { $regex: searchString, $options: 'i' } }).sort({ created: 'desc' });
    const prettyJson = JSON.stringify(matchingCats, null, 2);
    res.type('json').send(prettyJson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hiba történt a lekérdezés során.' });
  }
});

app.post("/api/cats/", async (req, res, next) => {
  const cat = req.body;

  try {
    const saved = await CatModel.create(cat);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.patch("/api/cats/:id", async (req, res, next) => {
  try {
    const cat = await CatModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    return res.json(cat);
  } catch (err) {
    return next(err);
  }
});

app.delete("/api/cats/:id", async (req, res, next) => {
  try {
    const cat = await CatModel.findById(req.params.id);
    const deleted = await cat.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

const main = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log("App is listening on 8080");
    console.log("Try /api/cats route right now");
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
