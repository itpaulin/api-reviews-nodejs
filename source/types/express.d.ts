import express from 'express';
declare module 'express' {
  export interface Request {
    user?: any;
  }
  export interface Response {
    user?: any;
  }
}
