import express, { Application } from "express";
import { routes } from "./routes";
import errorMiddleware from "./middleware/error.middleware";
import dotenv from "dotenv";
import cors from "cors";
import db from "./data-access/connection";

class Server {
  private app: Application;

  constructor() {
    this.loadEnvVariables();
    this.dbConnection();
    this.app = express();
    this.loadMiddleware();
    this.loadRoutes();
    this.loadErrorMiddleware();
  }

  public getServer = (): Application => {
    return this.app;
  };

  private loadEnvVariables = (): void => {
    dotenv.config();
  };

  private async dbConnection() {
    try {
      await db.authenticate();
    } catch (error) {
      throw new Error(error as any);
    }
  }

  private loadMiddleware(): void {
    this.loadCors();
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  private loadCors(): void {
    this.app.use(cors());
    this.app.options("*", cors);
  }

  private loadRoutes(): void {
    routes(this.app);
  }

  private loadErrorMiddleware(): void {
    this.app.use(errorMiddleware);
  }
}

export default Server;
