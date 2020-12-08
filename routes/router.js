import { Router as ExpressRouter } from 'express';

export default class Router {
  constructor(routeList) {
    this._router = ExpressRouter();
    routeList.forEach(Domain => Domain.register(this._router));
    return this._router;
  }
}