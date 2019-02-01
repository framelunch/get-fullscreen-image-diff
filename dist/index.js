"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var dotenv_1 = tslib_1.__importDefault(require("dotenv"));
var getFullscreenCapture_1 = require("./getFullscreenCapture");
var imageDiff_1 = require("./imageDiff");
dotenv_1.default.load();
function createCaptures(fileinfo) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, Promise.all(fileinfo.map(function (_a) {
                        var filename = _a.filename, url = _a.url;
                        return getFullscreenCapture_1.getFullscreenCapture({
                            url: url,
                            filename: filename,
                            width: 1200,
                            height: 800,
                        });
                    }))];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    });
}
function main() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var currentFilename, currentUrl, targetFilename, targetUrl, output;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    currentFilename = process.env.IMAGE_PATH + "/" + process.env.CURRENT_IMAGE;
                    currentUrl = process.env.CURRENT_URL || '';
                    targetFilename = process.env.IMAGE_PATH + "/" + process.env.TARGET_IMAGE;
                    targetUrl = process.env.TARGET_URL || '';
                    output = process.env.IMAGE_PATH + "/" + process.env.RESULT_KEY;
                    return [4, createCaptures([{ filename: currentFilename, url: currentUrl }, { filename: targetFilename, url: targetUrl }])];
                case 1:
                    _a.sent();
                    return [4, imageDiff_1.imageDiff(currentFilename, targetFilename, output)];
                case 2:
                    _a.sent();
                    return [2];
            }
        });
    });
}
main()
    .then(function () { return console.log('end'); })
    .catch(function (e) { return console.error(e); });
