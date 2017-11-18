import { Application } from 'express';

export abstract class AbstractController {

    protected app: Application;
    constructor(app: Application) {
        this.app = app;
    }
    
}