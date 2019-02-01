"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var puppeteer_1 = tslib_1.__importDefault(require("puppeteer"));
function getScreenshot(page) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, page.screenshot({ path: 'testing-blog.png', fullPage: true })];
                case 1:
                    _a.sent();
                    console.log('save screenshot');
                    return [2];
            }
        });
    });
}
function main() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var browser, page, url;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, puppeteer_1.default.launch({ headless: true })];
                case 1:
                    browser = _a.sent();
                    return [4, browser.newPage()];
                case 2:
                    page = _a.sent();
                    page.setViewport({ width: 1200, height: 800 });
                    url = 'https://www.nict.go.jp/JST/JST5.html';
                    return [4, page.goto(url)];
                case 3:
                    _a.sent();
                    return [4, page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 10000 })];
                case 4:
                    _a.sent();
                    return [4, getScreenshot(page)];
                case 5:
                    _a.sent();
                    return [4, browser.close()];
                case 6:
                    _a.sent();
                    return [2];
            }
        });
    });
}
main()
    .then(function () { return console.log('end'); })
    .catch(function (e) { return console.error(e); });
