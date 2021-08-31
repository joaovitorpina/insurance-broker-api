import express from 'express';
import IControllerBase from '@interfaces/IControllerBase.interface';

class App {
    public app: express.Application

    public port: number

    public hostname: string

    constructor(appInit: { port: number; hostname: string; middleWares: any;
    controllers: IControllerBase[]; errorHandlers: any }) {
      this.app = express();
      this.port = appInit.port;
      this.hostname = appInit.hostname;

      this.middlewares(appInit.middleWares);
      this.routes(appInit.controllers);
      this.errorHandlers(appInit.errorHandlers);
    }

    private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
      middleWares.forEach((middleWare) => {
        this.app.use(middleWare);
      });
    }

    private routes(controllers: { forEach: (arg0: (controller: IControllerBase) => void)
            => void; }) {
      controllers.forEach((controller) => {
        this.app.use(controller.path, controller.router);
      });
    }

    private errorHandlers(errorHandlers: { forEach: (arg0: (errorHandler: any) => void)
            => void;}) {
      errorHandlers.forEach(((errorHandler) => {
        this.app.use(errorHandler);
      }));
    }

    public listen() {
      this.app.listen(this.port, this.hostname, () => {
        console.log(`App listening on the http://${this.hostname}:${this.port}`);
      });
    }
}

export default App;
