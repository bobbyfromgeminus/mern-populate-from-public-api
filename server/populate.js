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
  const apiKey = 'live_jC1FRqSELdAoKWrPfNqd4ZgQuN89yYGOYYO1Yyin3RB0idQ4kgLOTWtAwVfHKxiz';
  const apiUrl = `https://api.thecatapi.com/v1/breeds`;
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
  const cats = breeds.map( (item) => ({
      id: item.id,
      name: item.name,
      weight_imperial: item.weight.imperial,
      weight_metric: item.weight.metric,
      cfa_url: item.cfa_url,
      vetstreet_url: item.vetstreet_url,
      vcahospitals_url: item.vcahospitals_url,
      temperament: item.temperament,
      origin: item.origin,
      country_codes: item.country_codes,
      country_code: item.country_code,
      description: item.description,
      life_span: item.life_span,
      indoor: item.indoor,
      lap: item.lap,
      alt_names: item.alt_names,
      adaptability: item.adaptability,
      affection_level: item.affection_level,
      child_friendly: item.child_friendly,
      dog_friendly: item.dog_friendly,
      energy_level: item.energy_level,
      grooming: item.grooming,
      health_issues: item.health_issues,
      intelligence: item.intelligence,
      shedding_level: item.shedding_level,
      social_needs: item.social_needs,
      stranger_friendly: item.stranger_friendly,
      vocalisation: item.vocalisation,
      experimental: item.experimental,
      hairless: item.hairless,
      natural: item.natural,
      rare: item.rare,
      rex: item.rex,
      suppressed_tail: item.suppressed_tail,
      short_legs: item.short_legs,
      wikipedia_url: item.wikipedia_url,
      hypoallergenic: item.hypoallergenic,
      img_url: item.image ? item.image.url : ''
    })
  );

  await CatModel.create(...cats);
  console.log("Cats created");
};

const main = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(mongoUrl);
  await populateCats();
  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
