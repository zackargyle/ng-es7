import {ngDirective} from '../../decorators';
import {PIN_APP} from '../../const';
require('./style.scss')

/*
 * Base component directive for the header.
 */
@ngDirective(PIN_APP, ['User', '$rootScope'])
class pinHeader {

    constructor() {
        this.$extend(arguments);
        angular.extend(this, {
            templateUrl: 'components/header/template.html'
        });
    }

    /*
     * 
     */
    onAddedToDom(scope) {
        this.User.init();

        this.$rootScope.$on('login', () => {
            scope.authenticated = true;
        });

        scope.logout = () => {
            this.User.logout()
                .then(() => {
                    scope.authenticated = false;
                    this.$rootScope.$apply();
                });
        }
    }
}

export default pinHeader;
