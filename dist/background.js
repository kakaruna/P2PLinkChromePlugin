(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.background = {})));
}(this, (function (exports) { 'use strict';

    var BackGround = /** @class */ (function () {
        function BackGround() {
            var _this = this;
            this.showPopup = function (result, id) {
                this.result = result;
                chrome.pageAction.show(id);
            };
            chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
                _this.onRequest(request, sender, sendResponse);
            });
            chrome.tabs.onSelectionChanged.addListener(function (id, obj) {
                chrome.tabs.sendRequest(id, { ask: "getResult" }, function (response) {
                    _this.result = response.result;
                });
            });
        }
        BackGround.prototype.onRequest = function (request, sender, sendResponse) {
            if (request.ask == "p2plinks") {
                this.showPopup(request.result, sender.tab.id);
            }
        };
        return BackGround;
    }());
    new BackGround();

    exports.BackGround = BackGround;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=background.js.map
