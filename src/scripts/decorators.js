import angular from 'angular';

/*
 * This is the base constructor for an angular application
 */
class ngApp {
    constructor(name, dependencies) {
        angular.extend(this,
            angular.module(name, dependencies || [])
        );
    }
}

/*
 * Create and register a new controller instance
 */
function ngController(app) {
    return module(app, 'controller');
}

/*
 * Create and register a new service instance
 */
function ngService(app) {
    return module(app, 'service');
}

/*
 * Helper for creating and registering an app module
 */
function module(app, constructor) {
    return function(target) {
        angular.module(app)[constructor](target.name, target);
    };
}

/*
 * Create and register a new component directive
 */
function ngDirective(app, options={}) {
    return function(target) {
        angular.extend(target.prototype, options, { link: target.onAddedToDom });
        return angular.module(app).directive(target.name, () => {
            var directive = new target();
            directive.link = directive.link || directive.onAddedToDom;
            return directive;
        });
    };
}

export default {
    ngApp: ngApp,
    ngController: ngController,
    ngDirective: ngDirective,
    ngService: ngService
};
