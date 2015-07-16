import {ngService} from './decorators';
import Const from './const';

/*
 * Service for managing user data and state.
 */
@ngService(Const.PIN_APP, ['Pdk', '$rootScope', '$location'])
class User {

    constructor() {
        this.$extend(arguments);
        this.boards = null;
        this.pins = {};
    }

    /*
     * Initialize the Pinterest SDK, test for authentication
     */
    init() {
        return this.Pdk.init()
            .then(this::this.setup)
            .catch(()=>{});
    }

    /*
     * Handle unauthenticated routing and logic
     */
    isAuthenticated() {
        if (!this.loggedIn) {
            this.$location.path(Const.PATH_BASE);
        }
        return this.loggedIn;
    }

    /*
     * Handle routing on /pins if no board is selected
     */
    boardSelected() {
        if (!this.selectedBoard) {
            this.$location.path(Const.PATH_BOARDS);
        }
        return !!this.selectedBoard;
    }

    /*
     * Handle logging in via the pinterest SDK
     */
    login() {
        return this.Pdk.login().then(this::this.setup);
    }

    /*
     * Handle success callback of SDK login
     */
    setup(user) {
        angular.extend(this, user);
        this.loggedIn = true;
        this.viewBoards();
    }

    /*
     * Fetch and route boards view
     */
    viewBoards() {
        this.Pdk.getBoards()
            .then((boards) => {
                this.boards = boards;
                this.$location.path(Const.PATH_BOARDS);
                this.$rootScope.$apply();
            });
    }

    /*
     * Fetch a boards pins and route to pins view
     */
    viewPins(board) {
        this.selectedBoard = board;
        this.Pdk.getPins(board.id)
            .then((pins) => {
                this.pins[board.id] = pins;
                this.$location.path(Const.PATH_PINS);
                this.$rootScope.$apply();
            });
    }
}

export default User;
