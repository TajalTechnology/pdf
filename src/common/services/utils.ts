import express from 'express';
import path from 'path';

export default {

    initApp: function (_options: { [x: string]: any; baseUri?: string; dirname?: string; hasOwnProperty?: any; }) {
        var app = express();
        for (var property in _options) {
            if (_options.hasOwnProperty(property)) {
                app.locals[property] = _options[property];
            }
        }

        app.locals.dirname += '/';
        app.locals.appdirname = path.basename(app.locals.dirname);
        app.locals.isDev = app.get('env') === 'development' || process.env.NODE_ENV === 'development';
        return app;
    },

    localService: function (_name: string | number, _app: { locals: { [x: string]: any; dirname: string; }; }, _path: string) {
        _path = _path || _app.locals.dirname + '/common/services/';
        return _app.locals[_name] = require(_path + _name).init(_app);
    },
}


