import {ngDirective} from './decorators';
import {TODO_MVC} from './const';

/*
 * Base component directive for a todo item.
 */
@ngDirective(TODO_MVC, { templateUrl: 'templates/todo.html' })
class todo {
    constructor() {
        this.scope = {
            ctrl: '=',
            todo: '=data'
        };
    }
}

export default todo;
