import './config/env.cjs';
import './database/index.js';

import App from './app/app.js'
import Router from './routes/router.js';
import Admin from './routes/admin.js';
import Client from './routes/client.js';
import Movies from './routes/movies.js';

const server = new App({
  port: 3000,
  routes: new Router([
    Admin,
    Client,
    Movies
  ])
});

server.start();