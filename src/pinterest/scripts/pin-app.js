'use strict';

import {ngApp} from './decorators';
import Const from './const';

/*
 * Create the base app module. Must be an import
 * for main.js since imports are hoisted.
 */
class App extends ngApp {
    constructor(name, dependencies=[]) {
        super(name, dependencies);

        /*
         * Route Configurations 
         */
        this.config(($routeProvider) => {
            Object.keys(Const.Routes).forEach((key) => {
                $routeProvider.when(key, Const.Routes[key]);
            });
        });
    }
}

export default new App(Const.PIN_APP, ['ngRoute']);