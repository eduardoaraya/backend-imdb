export default class Register {
  constructor({ prefix, routers }) {
    this._prefix = prefix;
    this._routers = routers;
    return this;
  }
  register(routerExpress) {
    this._routers.forEach(route => this.setRoute(routerExpress, route))
  }
  setRoute(routerExpress, { method, path, handle, middlewares = [] }) {
    if (typeof routerExpress[method] !== "undefined") {
      routerExpress[method](`${this._prefix}/${path}`, middlewares, handle);
    }
  }
}