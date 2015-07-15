'use strict';

import {ngApp} from './decorators';
import {TODO_MVC} from './const';

/*
 * Create the base app module. Must be an import
 * for main.js since imports are hoisted.
 */
export default new ngApp(TODO_MVC, []);