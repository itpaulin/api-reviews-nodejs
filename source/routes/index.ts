import express from 'express';
import { router as test  } from './test'; 

export const router = require('express').Router()

router.use('/test', test)
