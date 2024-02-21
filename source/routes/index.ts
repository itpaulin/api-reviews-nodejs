import { Router } from 'express';
import { router as test } from './test';
import authRoutes from './auth';

const rootRouter: Router = require('express').Router();

rootRouter.use('/test', test);
rootRouter.use('/auth', authRoutes);

export default rootRouter;
