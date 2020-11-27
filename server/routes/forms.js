import express from 'express'

import { getForms, getFormByID, createForm } from '../controllers/forms.js';

const router = express.Router();

// get all forms
router.get('/', getForms);

// get form by ID
router.get('/:id', getFormByID);

// create new form
router.post('/', createForm);

//update
router.put('/:id', () => {});

//delete
router.delete('/:id', () => {})

export default router;