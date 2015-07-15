import {ngDirective} from './decorators';
import {TODO_MVC} from './const';

/**
 * Directive that places focus on the element it is applied to when the
 * expression it binds to evaluates to true
 */
@ngDirective(TODO_MVC, { restrict: 'A' })
class todoFocus {
    /**
     * Function fired when directive is mounted onto the DOM
     */
    onAddedToDom(scope, element, attributes) {
        scope.$watch(attributes.todoFocus, (newVal) => {
            if (newVal) {
                setTimeout(() => {
                    element[0].focus();
                }, 0);
            }
        });
    }
}

export default todoFocus;
