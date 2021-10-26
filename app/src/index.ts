import Server from "./server";
const port = process.env.PORT || 3000;

const expressServer = new Server();
const server = expressServer.getServer();
const app = server.listen(port);

const shutDown = () => {
  console.log("Received kill signal, shutting down gracefully");
  app.close(() => {
    console.log("Closed out remaining connections");
    process.exit(0);
  });

  setTimeout(() => {
    console.error(
      "Could not close connections in time, forcefully shutting down"
    );
    process.exit(1);
  }, 10000);
};

process.on("SIGTERM", shutDown);
process.on("SIGINT", shutDown);
process.on("exit", shutDown);

module.exports = app;
