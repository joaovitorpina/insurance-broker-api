import { Router } from 'express';

interface IControllerBase {
    path : string

    router : Router

    initRoutes() : void
}

export default IControllerBase;
