import express from 'express';
import testFunction from '../controllers/test.controller';

export const router = express.Router()

router.get('/testRoute', testFunction);

