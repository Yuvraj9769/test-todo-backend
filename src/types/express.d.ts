// src/types/express.d.ts
import express from "express";  // ← REMOVE THIS LINE

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      };
    }
  }
}

export {};