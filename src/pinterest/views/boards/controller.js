import {ngController} from '../../decorators';
import {PIN_APP} from '../../const';
require('./style.scss');

/*
 * Controller for the board view. Manages layout and
 * routing to new pins
 */
@ngController(PIN_APP, ['User'])
class BoardController {
    
    constructor(User) {
        this.User = User;
        if (this.User.isAuthenticated()) {
            this.boards = this.User.boards;
        }
    }

    /*
     * Intermediate between view and User model
     */
    viewPins(board) {
        this.User.viewPins(board);
    }

}

export default BoardController;