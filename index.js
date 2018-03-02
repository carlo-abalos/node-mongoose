const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Dishes = require('./models/dishes');


const url = 'mongodb://localhost:27017/conFusion';

mongoose.connect(url);

mongoose.connection.then((db) => {

	console.log('Connected correctly to server');


	Dishes.create({
		name: 'Carlo',
		description: 'test'
	})
	.then((dish) => {
		console.log(dish);

		return Dishes.findByIdAndUpdate(dish._id, {
			$set: {description: "Updated test"}
		},{
			new: true
		}).exec();
	})
	.then((dish) => {
		console.log(dish);

		dish.comments.push({
			rating: 5,
			comment: 'Im getting a sinking feeling',
			author: 'Carlo Abalos'
		});

		return dish.save();

	})
	.then((dish) => {
		console.log(dish);

		return db.collection('dishes').drop();
	})
	.then(() => {
		return db.close();
	})
	.catch((err) => {
		console.log(err);
	});
});