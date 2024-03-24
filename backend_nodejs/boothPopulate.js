
require('dotenv').config(); 
const mongoose = require('mongoose');
const Booth = require('./models/boothSchema');

const uri = process.env.mongoDBURL;

const dataToInsert = [
  {
      title: 'Sample Booth 1',
      imageUrl: 'https://frankfurt.apollo.olxcdn.com/v1/files/2shxqbcj0ari2-UZ/image;s=750x1000',
      location: 'Sample Location 1',
      purposeType:'coffee-shop',
      dimensions:{
        width:2,
        depth:4,
        height:5
      },
      doorType: 'Акфа дверь',
      foundation: 'Металл каркас',
      roof: 'односкатная',
      insulation:'двойное',
      floor:'линолеум полукоммерческий',
      facade:'металлокассеты с порошковой покраской в комбинации с деревянными элементами',
      electricity:'полный комплект электрики 380 вольт, УЗО на каждую розетку',
      price:'2600',
      photo:'test',
      adminName:'Abror',
      businessType:'coffee-shop',
      productionTime: 12,
      inStock: false,
  },
];

const populateDatabase = async () => {
  try {
      await mongoose.connect(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
      });

      // Remove existing data (optional)
      await Booth.deleteMany({});

      // Insert new data
      await Booth.create(dataToInsert); // Use create instead of insertMany

      console.log('Database populated successfully');
  } catch (error) {
      console.error('Error populating database:', error);
  } finally {
      mongoose.disconnect(); // Close the connection
  }
};

populateDatabase();