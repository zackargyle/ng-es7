import {ngController} from '../../decorators';
import {PIN_APP} from '../../const';
require('./style.scss');

/*
 * Controller for the pin view. Manages layout.
 */
@ngController(PIN_APP, ['User'])
class PinController {

    constructor(User) {
        if (User.isAuthenticated() && User.boardSelected()) {
            this.board = User.selectedBoard;
            this.pins = User.pins[this.board.id];
            this.initGrid();
        }
    }

    /*
     * Handles the initial creation of the masonry grid, layout is
     * called each time a pins image has finished loading.
     * See pin-component.js
     */
    initGrid() {
        this.grid = new Masonry('.pin-wrapper', {
            itemSelector: '.pin',
            columnWidth: 250
        });
    }
}

export default PinController;