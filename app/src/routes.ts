import { Application, Router } from "express";
import { employeeRouter } from "./routers/employeeRouter";
import { monitoringRouter } from "./routers/monitoringRouter";
import invalidRequestController from "./controllers/invalidRoutesController";

const _routes: [string, Router][] = [
  ["/", employeeRouter],
  ["/monitoring", monitoringRouter],
];

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, controller] = route;
    app.use(url, controller);
  });
  app.use("/*", invalidRequestController);
};
