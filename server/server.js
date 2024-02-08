import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import CatModel from './models/CatModel.js';
import BreederModel from './models/BreederModel.js';
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


// -- ENDPOINTS

// - CATS

  // Get All
  app.get("/api/cats/", async (req, res) => {
    const cats = await CatModel.find().sort({ created: "desc" });
    const prettyJson = JSON.stringify(cats, null, 2);
    res.type('json').send(prettyJson);
  });

  // Get All from Egypt
  app.get("/api/cats/egypt", async (req, res) => {
    const cats = await CatModel.find({ origin: 'Egypt' }).sort({ created: "desc" });
    const prettyJson = JSON.stringify(cats, null, 2);
    res.type('json').send(prettyJson);
  });

  // Get One by ID
  app.get("/api/cats/:id", async (req, res) => {
    const cat = await CatModel.findById(req.params.id);
    return res.json(cat);
  });

  // Get All - filtered name
  app.get('/api/cats/findbyname/:searchString', async (req, res) => {
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

  // Get All - filtered description
  app.get('/api/cats/findbydesc/:searchString', async (req, res) => {
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

  // Create
  app.post("/api/cats/", async (req, res, next) => {
    const cat = req.body;

    try {
      const saved = await CatModel.create(cat);
      return res.json(saved);
    } catch (err) {
      return next(err);
    }
  });

  // Update
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

  // Delete
  app.delete("/api/cats/:id", async (req, res, next) => {
    try {
      const cat = await CatModel.findById(req.params.id);
      const deleted = await cat.delete();
      return res.json(deleted);
    } catch (err) {
      return next(err);
    }
  });


// - BREEDERS

  // Get All
  app.get("/api/breeders/", async (req, res) => {
    const breeders = await BreederModel.find().sort({ created: "desc" });
    const prettyJson = JSON.stringify(breeders, null, 2);
    res.type('json').send(prettyJson);
  });

  // Get One by ID
  app.get("/api/breeders/:id", async (req, res) => {
    const breeder = await BreederModel.findById(req.params.id);
    return res.json(breeder);
  });

  // Get One by Breed ID
  const ObjectId = mongoose.Types.ObjectId;
  app.get("/api/breeders/breedid/:id", async (req, res) => {
    const breedId = ObjectId(req.params.id);
    const breeders = await BreederModel.find({ breed_id: breedId }).sort({ created: "desc" });
    const prettyJson = JSON.stringify(breeders, null, 2);
    res.type('json').send(prettyJson);
  });

  // Get All - filtered name
  app.get('/api/breeders/findbyname/:searchString', async (req, res) => {
    const { searchString } = req.params;
    try {
      const matchingBreeders = await BreederModel.find({ name: { $regex: searchString, $options: 'i' } }).sort({ created: 'desc' });
      const prettyJson = JSON.stringify(matchingBreeders, null, 2);
      res.type('json').send(prettyJson);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Hiba történt a lekérdezés során.' });
    }
  });

   // Get All - filtered country
   app.get('/api/breeders/findbycountry/:searchString', async (req, res) => {
    const { searchString } = req.params;
    try {
      const matchingBreeders = await BreederModel.find({ country: { $regex: searchString, $options: 'i' } }).sort({ created: 'desc' });
      const prettyJson = JSON.stringify(matchingBreeders, null, 2);
      res.type('json').send(prettyJson);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Hiba történt a lekérdezés során.' });
    }
  });

  // Create
  app.post("/api/breeders/", async (req, res, next) => {
    const breeder = req.body;

    try {
      const saved = await BreederModel.create(breeder);
      return res.json(saved);
    } catch (err) {
      return next(err);
    }
  });

  // Update
  app.patch("/api/breeders/:id", async (req, res, next) => {
    try {
      const breeder = await BreederModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { ...req.body } },
        { new: true }
      );
      return res.json(breeder);
    } catch (err) {
      return next(err);
    }
  });

  // Delete
  app.delete("/api/breeders/:id", async (req, res, next) => {
    try {
      const breeder = await BreederModel.findById(req.params.id);
      const deleted = await breeder.delete();
      return res.json(deleted);
    } catch (err) {
      return next(err);
    }
  });


// -- END OF ENDPOINTS


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
