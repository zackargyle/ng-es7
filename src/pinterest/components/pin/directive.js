import {ngDirective} from '../../decorators';
import {PIN_APP} from '../../const';

/*
 * Base component directive for a pin.
 */
@ngDirective(PIN_APP)
class pin {

    constructor() {
        angular.extend(this, {
            templateUrl: 'components/pin/template.html',
            restrict: 'E',
            replace: true,
            scope: {
                pin: '=',
                grid: '='
            }
        });
    }

    /*
     * Wait for pin image to be loaded, and then call the
     * masonry grid's layout function
     */
    onAddedToDom(scope, $elem) {
        imagesLoaded($elem[0], () => {
            scope.grid.appended($elem[0]);
            scope.grid.layout();
            $elem.removeClass('u-invisible');
        });
    }
}

export default pin;
