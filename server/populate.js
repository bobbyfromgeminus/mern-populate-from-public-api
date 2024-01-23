import mongoose from 'mongoose';
import CatModel from './models/CatModel.js';
import dotenv from 'dotenv';
dotenv.config();

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const getCatsFromTheCatApi = async () => {
  const page = 0;
  const limit = 100;
  const apiKey = 'live_jC1FRqSELdAoKWrPfNqd4ZgQuN89yYGOYYO1Yyin3RB0idQ4kgLOTWtAwVfHKxiz';
  const apiUrl = `https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=${page}&limit=${limit}`;

  const headers = new Headers({
    "Content-Type": "application/json",
    "x-api-key": apiKey
  });

  const requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
  };

  try {
    const response = await fetch(apiUrl, requestOptions);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error:', error.message);
  }
}

const populateCats = async () => {
  await CatModel.deleteMany({});
  const breeds = await getCatsFromTheCatApi();
  const cats = breeds.map((item) => ({
    id: item.id,
    url: item.url,
    width: item.width,
    height: item.height,
    weight_imperial: item.breeds[0].weight.imperial,
    weight_metric: item.breeds[0].weight.metric,
    name_id: item.breeds[0].id,
    name: item.breeds[0].name,
    cfa_url: item.breeds[0].cfa_url,
    vetstreet_url: item.breeds[0].vetstreet_url,
    vcahospitals_url: item.breeds[0].vcahospitals_url,
    temperament: item.breeds[0].temperament,
    origin: item.breeds[0].origin,
    country_codes: item.breeds[0].country_codes,
    country_code: item.breeds[0].country_code,
    description: item.breeds[0].description,
    life_span: item.breeds[0].life_span,
    indoor: item.breeds[0].indoor,
    lap: item.breeds[0].lap,
    alt_names: item.breeds[0].alt_names,
    adaptability: item.breeds[0].adaptability,
    affection_level: item.breeds[0].affection_level,
    child_friendly: item.breeds[0].child_friendly,
    dog_friendly: item.breeds[0].dog_friendly,
    energy_level: item.breeds[0].energy_level,
    grooming: item.breeds[0].grooming,
    health_issues: item.breeds[0].health_issues,
    intelligence: item.breeds[0].intelligence,
    shedding_level: item.breeds[0].shedding_level,
    social_needs: item.breeds[0].social_needs,
    stranger_friendly: item.breeds[0].stranger_friendly,
    vocalisation: item.breeds[0].vocalisation,
    experimental: item.breeds[0].experimental,
    hairless: item.breeds[0].hairless,
    natural: item.breeds[0].natural,
    rare: item.breeds[0].rare,
    rex: item.breeds[0].rex,
    suppressed_tail: item.breeds[0].suppressed_tail,
    short_legs: item.breeds[0].short_legs,
    wikipedia_url: item.breeds[0].wikipedia_url,
    hypoallergenic: item.breeds[0].hypoallergenic,
    reference_image_id: item.breeds[0].reference_image_id,
  }));

  await CatModel.create(...cats);
  console.log("Cats created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateCats();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
