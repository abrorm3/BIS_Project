require("dotenv").config();
const mongoose = require("mongoose");
const Booth = require("./models/boothSchema");

const uri = process.env.mongoDBURL;

const dataToInsert = [
  {
    title: 'Pavilion for the sale of bread "RoslavlKhleb',
    imageUrls: ["https://frankfurt.apollo.olxcdn.com/v1/files/2shxqbcj0ari2-UZ/image;s=750x1000","https://sovteh21.ru/wp-content/uploads/2018/01/GP_012245.jpg","https://artpavilions.ru/news/%D0%A2%D0%BE%D1%80%D0%B3%D0%BE%D0%B2%D1%8B%D0%B5%20%D0%BF%D0%B0%D0%B2%D0%B8%D0%BB%D1%8C%D0%BE%D0%BD%D1%8B%20%D0%BD%D0%B0%20%D0%B7%D0%B0%D0%BA%D0%B0%D0%B7%20%D1%86%D0%B5%D0%BD%D0%B0%20(1).jpg","https://images.satu.kz/188891971_w600_h600_188891971.jpg"],
    location: "Chirchik",
    purposeType: "coffee-shop",
    dimensions: {
      width: 2,
      depth: 4,
      height: 5,
    },
    doorType: "Akfa door",
    foundation: "Metal frame",
    roof: "single-slope",
    insulation: "double",
    floor: "semi-commercial linoleum",
    facade: "metal cassettes with powder coating combined with wooden elements",
    electricity: "full set of electricity 380 volts, RCD on each outlet",
    additionalFeatures: ["Ventilation", "Conditioner", "Tables"],
    price: "2600",
    adminName: "Abror",
    businessType: "coffee-shop",
    productionTime: 12,
    inStock: false,
  },
  {
    title: 'Mini store "Krasnaya Polyana", Zheleznogorsk, Kursk region',
    imageUrls: "https://pavilionmsk.ru/upload/iblock/7a7/ofj306qke4p1jbv4u0w5ta3fm1cnaytz.JPG",
    location: "Baytkurgan",
    purposeType: "food-truck",
    dimensions: {
      width: 3,
      depth: 5,
      height: 3,
    },
    doorType: "Sliding door",
    foundation: "Concrete base",
    roof: "flat",
    insulation: "thermal",
    floor: "ceramic tiles",
    facade: "glass panels with LED lighting",
    electricity: "220 volts, energy-efficient lighting",
    price: "3200",
    adminName: "Diana",
    businessType: "food",
    productionTime: 15,
    inStock: true,
  },
  {
    title: "Kiosk coffee shop SV-COFEE",
    imageUrls: "https://sovteh21.ru/wp-content/uploads/2018/01/GP_012245.jpg",
    location: "Samarkand",
    purposeType: "cafe",
    dimensions: {
      width: 4,
      depth: 6,
      height: 4,
    },
    doorType: "Automatic door",
    foundation: "Steel stilts",
    roof: "retractable",
    insulation: "multi-layer",
    floor: "hardwood",
    facade: "decorative stone cladding",
    electricity: "solar panels with battery storage",
    price: "4500",
    adminName: "Carlos",
    businessType: "retail",
    productionTime: 18,
    inStock: false,
  },
  {
    title: "Modular shopping row 3.7x12.5 meters, five-module",
    imageUrls: "https://images.satu.kz/153776103_w640_h640_torgovyj-pavilon-otdel.jpg",
    location: "Tashkent",
    purposeType: "market",
    dimensions: {
      width: 2,
      depth: 3,
      height: 3,
    },
    doorType: "Revolving door",
    foundation: "Brick",
    roof: "domed",
    insulation: "eco-friendly fiber",
    floor: "polished concrete",
    facade: "stucco with decorative moldings",
    electricity: "integrated tech hub with WiFi",
    price: "3000",
    adminName: "Emma",
    businessType: "service",
    productionTime: 10,
    inStock: true,
    additionalFeatures:["Ventilation", "Conditioner", "Tables", "Metal Construction", "TV table", "stainless steel"]
  },
];

const populateDatabase = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Booth.deleteMany({});

    // Insert new data
    await Booth.create(dataToInsert);

    console.log("Database populated successfully");
  } catch (error) {
    console.error("Error populating database:", error);
  } finally {
    mongoose.disconnect();
  }
};

populateDatabase();
