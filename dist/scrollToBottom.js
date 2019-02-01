"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
function scrollToBottom(page, viewportHeight) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var getScrollHeight, scrollHeight, currentPosition, scrollNumber, nextPosition;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    getScrollHeight = function () { return Promise.resolve(document.documentElement.scrollHeight); };
                    return [4, page.evaluate(getScrollHeight)];
                case 1:
                    scrollHeight = _a.sent();
                    currentPosition = 0;
                    scrollNumber = 0;
                    _a.label = 2;
                case 2:
                    if (!(currentPosition < scrollHeight)) return [3, 6];
                    scrollNumber += 1;
                    nextPosition = scrollNumber * viewportHeight;
                    return [4, page.evaluate(function (scrollTo) { return Promise.resolve(window.scrollTo(0, scrollTo)); }, nextPosition)];
                case 3:
                    _a.sent();
                    return [4, page
                            .waitForNavigation({ waitUntil: 'networkidle2', timeout: 5000 })
                            .catch(function (e) { return console.log('timeout exceed. proceed to next operation'); })];
                case 4:
                    _a.sent();
                    currentPosition = nextPosition;
                    console.log("scrollNumber: " + scrollNumber);
                    console.log("currentPosition: " + currentPosition);
                    return [4, page.evaluate(getScrollHeight)];
                case 5:
                    scrollHeight = _a.sent();
                    console.log("ScrollHeight " + scrollHeight);
                    return [3, 2];
                case 6: return [2];
            }
        });
    });
}
exports.scrollToBottom = scrollToBottom;
