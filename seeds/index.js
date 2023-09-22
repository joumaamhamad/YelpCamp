const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const {places , descriptors} = require('./seedHelper');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
.then(() => {
    console.log("MONGO CONNECTION OPEN!!")
})
.catch(err => {
    console.log("OH NO MONGO CONNECTION ERROR!!");
    console.log(err);
})


const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {

    await Campground.deleteMany({});

    for(let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '65085befe9b3a4e000e27d03',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)}  ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'lorem ckje cecbeucke cececbecje cejebk' , 
            price: price,
        });

        await camp.save();
    }
}

seedDB().then(() => {

    mongoose.connection.close();
})