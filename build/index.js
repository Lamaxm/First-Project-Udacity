"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var sharp = require('sharp');
var app = (0, express_1.default)();
var port = 3000;
app.get('/api', function (req, res) {
    var width = req.query.width;
    var height = req.query.height;
    var photoname = req.query.photoname;
    var fs = require('fs');
    if (fs.existsSync('./thumbnails')) {
        var folder = 'thumbnails';
        var files = fs.readdirSync(folder);
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var file = files_1[_i];
            if ("".concat(photoname, "_").concat(width, "_").concat(height, ".png") == file)
                break;
        }
        sharp("./image/".concat(photoname))
            .resize(Number(width), Number(height))
            .toFile("thumbnails/".concat(photoname, "_").concat(width, "_").concat(height, ".png"));
            res.send('The image has been successfully processed');
    }
    else {
        fs.mkdirSync('./thumbnails');
        sharp("./image/".concat(photoname))
            .resize(Number(width), Number(height))
            .toFile("thumbnails/".concat(photoname, "_").concat(width, "_").concat(height, ".png"));
    }
});
app.listen(port, function () {
    console.log("server started at localhost:".concat(port));
});
