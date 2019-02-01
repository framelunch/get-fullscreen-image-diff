"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var path_1 = tslib_1.__importDefault(require("path"));
var fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
var puppeteer_1 = tslib_1.__importDefault(require("puppeteer"));
var scrollToBottom_1 = require("./scrollToBottom");
function wait(msec) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            return [2, new Promise(function (resolve) { return setTimeout(resolve, msec); })];
        });
    });
}
function getFullscreenCapture(_a) {
    var url = _a.url, filename = _a.filename, width = _a.width, height = _a.height, user = _a.user, pass = _a.pass;
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var browser, page, authBuffer, pathname;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4, puppeteer_1.default.launch({ headless: true })];
                case 1:
                    browser = _b.sent();
                    return [4, browser.newPage()];
                case 2:
                    page = _b.sent();
                    page.setViewport({ width: width, height: height });
                    if (!(user && pass)) return [3, 4];
                    authBuffer = new Buffer(user + ":" + pass).toString('base64');
                    return [4, page.setExtraHTTPHeaders({ Authorization: "Basic " + authBuffer })];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4: return [4, page.goto(url, { waitUntil: 'networkidle2' })];
                case 5:
                    _b.sent();
                    return [4, wait(5000)];
                case 6:
                    _b.sent();
                    return [4, scrollToBottom_1.scrollToBottom(page, height)];
                case 7:
                    _b.sent();
                    pathname = path_1.default.dirname(path_1.default.join(process.cwd(), filename));
                    fs_extra_1.default.mkdirpSync(pathname);
                    return [4, page.screenshot({ path: filename, fullPage: true })];
                case 8:
                    _b.sent();
                    console.log('save screenshot');
                    return [4, browser.close()];
                case 9:
                    _b.sent();
                    return [2];
            }
        });
    });
}
exports.getFullscreenCapture = getFullscreenCapture;
