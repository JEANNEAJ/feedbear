import express from 'express'

import { getForms, createForm } from '../controllers/forms.js';

const router = express.Router();

// get all forms
router.get('/', getForms);

// create new form
router.post('/', createForm);

//update
router.put('/:id', () => {});

//delete
router.delete('/:id', () => {})

export default router;