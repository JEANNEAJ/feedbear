import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => app.listen(PORT, ( ) => console.log(`Server running on port: ${PORT}`)))
	.catch(err=> console.log(err));


const db = mongoose.connection;

const schema = new mongoose.Schema({ count: Number });


db.once('open', function() {
	console.log('connected');
})

const Counter = mongoose.model('Counter', schema);


app.put('/counter/:id')

app.get('/', async (req, res) => {
	// res.send(req.body);

	try {
		const count = await Counter.find();

		res.status(200).json(count);
	} catch (error) {
		res.status(404).json({ message: error });
	}
})

app.post('/', async (req, res) => {
  console.log(req.body);
  const count = req.body;

  // { count } => req.body.count
  //   count   => req.body

  const newCounter = new Counter({ ...count });

		try {
			await newCounter.save();

			res.status(201).json(newCounter);
		} catch (error) {
			res.status(409).json({ message: error.message });
		}
});



app.patch('/:id', async (req, res) => {
	const { id: _id } = req.params;
	const count = req.body;

	if (!Mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No count with that id');

	const updatedCount = await Counter.findByIdAndUpdate(_id, { ...count, _id }, { new: true });

	res.json(updatedCount);
});
