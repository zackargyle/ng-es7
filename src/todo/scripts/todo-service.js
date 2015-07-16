import {ngService} from './decorators';
import {TODO_MVC, STORAGE_ID} from './const';

/*
 * Service for interacting with localstorage.
 */
@ngService(TODO_MVC)
class TodoStorage {
    get() {
        return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
    }

    put(todos) {
        localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
    }
}

export default TodoStorage;
