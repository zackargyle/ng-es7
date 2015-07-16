import angular from 'angular';

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
        target.prototype.$extend = $extend;
        angular.module(app)[method](target.name, target);
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
            directive.link = directive.onAddedToDom;
            return directive;
        });
    };
}

function $extend(args) {
    let names = this.$inject || [];
    [].forEach.call(args, (arg, index) => {
        this[names[index]] = arg;
    });
}

export default {
    ngApp,
    ngController,
    ngDirective,
    ngService
};
