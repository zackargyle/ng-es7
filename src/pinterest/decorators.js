/*
 * Create and register a new base module
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
function ngController(app, dependencies) {
    return module(app, dependencies, 'controller');
}

/*
 * Create and register a new service instance
 */
function ngService(app, dependencies) {
    return module(app, dependencies, 'service');
}

/*
 * Helper for creating and registering an app module
 */
function module(app, dependencies=[], method) {
    return function(target) {
        target.prototype.$inject = target.$inject = dependencies;
        target.prototype.$extend = target::$extend(dependencies);
        angular.module(app)[method](target.name, target);
    };
}

/*
 * Create and register a new component directive
 */
function ngDirective(app, dependencies=[], options={}) {
    return function(target) {
        target.prototype.$extend = target::$extend(dependencies);
        return angular.module(app).directive(target.name, () => {
            let injector = angular.element(document.documentElement).injector();
            let deps = dependencies.map((dep) => injector.get(dep) );
            let directive = new target(...deps);
            directive.link = directive::directive.onAddedToDom;
            return directive;
        });
    };
}

/*
 * Closure for extending dependency injected models onto
 * the <this> of the corresponding module
 */
function $extend(dependencies) {
    return (args) => {
        [].forEach.call(args, (arg, index) => {
            this.prototype[dependencies[index]] = arg;
        });
    }
}

export default {
    ngApp,
    ngController,
    ngDirective,
    ngService
};
