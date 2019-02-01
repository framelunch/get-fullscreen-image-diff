"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var resemblejs_1 = tslib_1.__importDefault(require("resemblejs"));
var fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
function getImageDiff(before, after) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            return [2, new Promise(function (resolve, reject) {
                    try {
                        resemblejs_1.default(before)
                            .compareTo(after)
                            .ignoreColors()
                            .onComplete(function (result) { return resolve(result); });
                    }
                    catch (e) {
                        reject(e);
                    }
                })];
        });
    });
}
function imageDiff(source, compare, output) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var data;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, getImageDiff(source, compare)];
                case 1:
                    data = _a.sent();
                    fs_extra_1.default.writeFileSync(output + ".png", data
                        .getBuffer());
                    fs_extra_1.default.writeFileSync(output + ".json", JSON.stringify(data));
                    return [2];
            }
        });
    });
}
exports.imageDiff = imageDiff;
