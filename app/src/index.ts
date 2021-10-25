import Server from './server'

const port = process.env.PORT || 3000

const server = new Server().getServer().listen(port, () => console.log(`Server is listening on port ${port}!`));

process.on('SIGINT', () => {
  console.log('SIGINT');
  server.close(() => {
    console.log('Closed out remaining connections');
    process.exit(0);
  });
  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM');
  server.close(() => {
    console.log('Closed out remaining connections');
    process.exit(0);
  });
  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
});

process.on('SIGUSR2', () => {
  console.log('SIGUSR2');
  server.close(() => {
    console.log('Closed out remaining connections');
    process.exit(0);
  });
  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
});

process.on('exit', () => {
  console.log('exit');
  server.close(() => {
    console.log('Closed out remaining connections');
    process.exit(0);
  });
  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
});

const shutDown = () => {
  console.log('Received kill signal, shutting down gracefully');
  server.close(() => {
      console.log('Closed out remaining connections');
      process.exit(0);
  });

  setTimeout(() => {
      console.error('Could not close connections in time, forcefully shutting down');
      process.exit(1);
  }, 10000);
}

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

