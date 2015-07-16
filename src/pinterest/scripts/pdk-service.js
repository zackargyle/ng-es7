import {ngService} from './decorators';
import Const from './const';

/*
 * Service for interacting with localstorage.
 */
@ngService(Const.PIN_APP)
class Pdk {

    /*
     * Initialize the Pinterest SDK, test for authentication
     */
    init() {
        return new Promise((resolve, reject) => {
            PDK.init({ appId: Const.PDK_ID, cookie: true });
            if (PDK.getSession()) {
                resolve();
            } else {
                reject();
            }
        }).then(() => {
            return this.initUser();
        });
    }

    /*
     * Attempt to login via the SDK popup window.
     */
    login() {
        return new Promise((resolve, reject) => {
            PDK.login({ scope : Const.PDK_SCOPE }, resolve, reject);
        }).then((session) => {
            if (Object.keys(session).length) {
                return this.initUser();
            } else {
                return Promise.reject(Const.PDK_ERROR_LOGIN);
            }
        });
    }

    /*
     * Fetch the user information
     */
    initUser() {
        return new Promise((resolve, reject) => {
            PDK.me((response) => {
                if (response.error) {
                    reject();
                } else {
                    resolve(response);
                }
            });
        });
    }

    getPins(boardId) {
        // if (this.cache.pins[boardId]) {
        //     return Promise.resolve(this.cache.pins[boardId]);
        // }
        var params = { fields: Const.PDK_FIELDS_PIN };
        return new Promise((resolve, reject) => {
            PDK.request(`/boards/${boardId}/pins/`, params, function(response) {
                resolve(response.data);
            });
        });
    }

    getBoards() {
        // if (this.cache.boards[this.user.id]) {
        //     return Promise.resolve(this.cache.boards[boardId]);
        // }
        return new Promise((resolve, reject) => {
            var params = { fields: Const.PDK_FIELDS_BOARDS };
            PDK.me('boards', params, (response) => {
                resolve(response.data);
            });
        });
    }
}

export default Pdk;
