let AppConstants = {
    PIN_APP: 'pinterest',

    PATH_BASE: '/',
    PATH_BOARDS: '/boards',
    PATH_PINS: '/pins',

    PDK_ID: '4779443942242386671',
    PDK_SCOPE: 'read_public',
    PDK_FIELDS_USER: 'first_name,bio,counts,image',
    PDK_FIELDS_BOARDS: 'id,name,image[300x500]',
    PDK_FIELDS_PIN: 'id,note,board,link,image,attribution,metadata',
    PDK_ERROR_LOGIN: 'error.pdk.login',
    PDK_ERROR_INIT: 'error.pdk.init',

    LOGIN_ERROR_MSG: 'Whoops! That didn\'t quite work. Try again!'
};

AppConstants.Routes = {
    [AppConstants.PATH_BASE] : {
        title: 'Main',
        templateUrl: 'views/main/template.html',
        controller: 'MainController',
        controllerAs: 'ctrl'
    },
    [AppConstants.PATH_BOARDS] : {
        title: 'Boards',
        templateUrl: 'views/boards/template.html',
        controller: 'BoardController',
        controllerAs: 'ctrl'
    },
    [AppConstants.PATH_PINS] : {
        title: 'Pins',
        templateUrl: 'views/pins/template.html',
        controller: 'PinController',
        controllerAs: 'ctrl'
    }
}

export default AppConstants;