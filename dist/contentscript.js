(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.content = {})));
}(this, (function (exports) { 'use strict';

    var Content = /** @class */ (function () {
        function Content() {
            var _this = this;
            this.ed2k_regex = /ed2k:\/\/\|file\|.+?\//gi;
            this.magnet_regex = /magnet\:\?[^\"]+/gi;
            this.ed2k_result = [];
            this.magnet_result = [];
            this.init();
            chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
                _this.onRequest(request, sender, sendResponse);
            });
        }
        Content.prototype.init = function () {
            if (this.ed2k_regex.test(document.body.innerHTML) || this.magnet_regex.test(document.body.innerHTML)) {
                this.getResult();
                chrome.extension.sendRequest({ ask: "p2plinks", result: this.result }, function (response) {
                });
            }
        };
        Content.prototype.onRequest = function (request, sender, sendResponse) {
            if (request.ask == "getResult") {
                if (this.result) {
                    sendResponse({ result: this.result });
                }
                else {
                    this.getResult();
                    sendResponse({ result: this.result });
                }
            }
            else if (request.ask == "refreshResult") {
                this.getResult();
                sendResponse({ result: this.result });
            }
        };
        Content.prototype.getResult = function () {
            this.ed2k_result = document.body.innerHTML.match(this.ed2k_regex) || [];
            this.magnet_result = document.body.innerHTML.match(this.magnet_regex) || [];
            this.result = { ed2k_result: this.ed2k_result, magnet_result: this.magnet_result };
        };
        return Content;
    }());
    new Content();

    exports.Content = Content;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=contentscript.js.map
