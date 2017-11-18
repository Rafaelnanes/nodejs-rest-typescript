import { Application } from 'express';

export interface AppController {
    registerRoutes(app: Application): void;
}
