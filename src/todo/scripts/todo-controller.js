import {ngController} from './decorators';
import {TODO_MVC, DONE} from './const';

/*
 * Controller for the todomvc application. Manages
 * view layer actions from index.html
 */
@ngController(TODO_MVC)
class TodoController {
    /*
     * This handles the initial state of the controller, including
     * a watcher to sync completed counts
     */
    constructor($scope, $filter, TodoStorage) {
        this.storage = TodoStorage;

        /*
         * Watch for changes to the list and corresponding values
         */
        $scope.$watch(() => (this.todos), () => {
            this.remainingCount = $filter('filter')(this.todos, { done: false }).length;
            this.completedCount = this.todos.length - this.remainingCount;
            this.allChecked = !this.remainingCount;
        }, true);

        this.init();
    }

    /*
     * Initialize view-state variables
     */
    init() {
        this.newTodo = { done: false, title: '' }
        this.todos = this.storage.get();
        this.filter = {};
    }

    /*
     * Create and save a new todo item
     */
    addTodo() {
        this.todos.unshift(this.newTodo);
        this.storage.put(this.todos);
        this.newTodo = { done: false, title: '' }
    }

    /*
     * Remove the todo item at <index>
     */
    removeTodo(index) {
        this.todos.splice(index, 1);
        this.storage.put(this.todos);
    }

    /*
     * Open editing of the todo item
     */
    editTodo(todo) {
        this.originalTodo = angular.copy(todo);
        this.editedTodo = todo;
    }

    /*
     * Save edits made to a todo item
     */
    saveTodo(todo) {
        angular.extend(todo, this.editedTodo);
        this.storage.put(this.todos);
        this.editedTodo = null;
    }

    /*
     * Revert edits made to a todo item
     */
    revertEdit(todo) {
        angular.extend(todo, this.originalTodo);
        this.editedTodo = null;
    }

    /*
     * Toggle <done> state of each todo
     */
    markAll(value) {
        this.todos.forEach((todo) => {
            todo.done = this.allChecked;
        });
    }

    /*
     * Set filter for which todos to display
     */
    setFilter(value) {
        if (value) {
            this.filter.done = value === DONE;
        } else {
            delete this.filter.done;
        }
    }

    /*
     * Remove all completed todo items from the list
     */
    clearCompletedTodos() {
        this.todos = this.todos.filter((todo) => {
            return !todo.done;
        });
        this.storage.put(this.todos);
    }

}

export default TodoController;
