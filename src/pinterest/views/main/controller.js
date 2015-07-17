import {ngController} from '../../decorators';
import {PIN_APP} from '../../const';

/*
 * Main controller for the application. Manages login.
 */
@ngController(PIN_APP, ['User'])
class MainController {

    constructor(User) {
        this.User = User;
    }

    /*
     * Intermediate between view and User model
     */
    login() {
        this.User.login();
    }
}

export default MainController;