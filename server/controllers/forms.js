import Mongoose from 'mongoose';
import FormMessage from '../models/formMessage.js';

export const getForms = async (req, res) => {
	try {
		const formMessages = await FormMessage.find();
		res.status(200).json(formMessages);
	} catch (err) {
		res.status(404).json({ message: err });
	}
};

export const createForm = async (req, res) => {
	const body = req.body;
	console.log(body);

	const newForm = new FormMessage(body);

	try {
		await newForm.save();
		res.status(201).json(newForm);
	} catch (err) {
		res.status(409).json({ message: err });
	}
}

export const updateForm = async (req, res) => {
	const { id: _id } = req.params;
	const form = req.body;

	if (!Mongoose.Types.ObjectId.isValid(_id)) {
		return res.status(404).send('No form found with that id')
	}
	
	try {
		const updatedForm = await FormMessage.findByIdAndUpdate(_id, { ...form, _id}, { new: true });
		return res.status(200).json(updatedForm);
	} catch (err) {
		res.status(400).json({ message: err });
	}
}

export const deleteForm = async (req, res) => {
	const { id: _id } = req.params
	try {
		await FormMessage.deleteOne({_id})
		res.status(204);
	} catch (err) {
		res.status(400).json({ message: err });
	}
}