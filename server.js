const mongoose = require('mongoose');
const dotenv =  require('dotenv');
const app = require('./app');

dotenv.config({path: './config.env'});
const DB = process.env.DATABASE.replace(
  '<PASSWORD>', 
  process.env.DATABASE_PASSWORD
  );

mongoose
.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then(() =>
    console.log('DB Connection Successful'));
    
    const tourSchema = new mongoose.Schema({
      name: {
        type: 'string',
        required: [true, 'A tour must have a name'],
        unique: true,
      },
      rating: {
        type: Number,
        default: 4.5
      },
      price: { 
        type: 'number',
        required: [true, 'A tour must have a price']
      }
    });
    const Tour = mongoose.model('Tour', tourSchema);

    const testTour = new Tour ({
      name: 'Fuji Explorer',
      rating: '4.1',
      price: 217
    });

    testTour
    .save()
    .then(doc => {
      console.log(doc);
    }) 

//SERVER
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("App running on port ${port}.... ");
});