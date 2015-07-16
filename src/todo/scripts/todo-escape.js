import {ngDirective} from './decorators';
import {TODO_MVC, ESCAPE_KEY} from './const';

/**
 * Directive that executes an expression when the element it is applied to gets
 * an `escape` keydown event.
 */
@ngDirective(TODO_MVC, { restrict: 'A' })
class todoEscape {
    /**
     * Function fired when directive is mounted onto the DOM
     */
    onAddedToDom(scope, element, attributes) {
        element.bind('keydown', function (event) {
            if (event.keyCode === ESCAPE_KEY) {
                scope.$apply(attributes.todoEscape);
            }
        });

        scope.$on('$destroy', function () {
            element.unbind('keydown');
        });
    }
}

export default todoEscape;
