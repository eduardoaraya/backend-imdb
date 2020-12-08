import express from 'express';
import bodyParser from 'body-parser';

export default class App {
  constructor({ port, routes }) {
    this._port = port;
    this._routes = routes;
    this._server = express();
  }
  start() {
    this.middlewares();
    return this._server.listen(this._port, () => {
      console.log('API on: ' + this._port)
    })
  }
  middlewares() {
    this._server.use(bodyParser.json());
    this._server.use(bodyParser.urlencoded({ extended: true }));
    this._server.use(this._routes);
  }
}