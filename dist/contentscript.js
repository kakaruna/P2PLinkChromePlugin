(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.content = {})));
}(this, (function (exports) { 'use strict';

    class Content {
        constructor() {
            this.ed2k_regex = /ed2k:\/\/\|file\|.+?\//gi;
            this.magnet_regex = /magnet\:\?[^\"]+/gi;
            this.ed2k_result = [];
            this.magnet_result = [];
            this.init();
            chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
                this.onRequest(request, sender, sendResponse);
            });
        }
        init() {
            if (this.ed2k_regex.test(document.body.innerHTML) || this.magnet_regex.test(document.body.innerHTML)) {
                this.getResult();
                chrome.runtime.sendMessage({ ask: "p2plinks", result: this.result }, (response) => {
                });
            }
        }
        onRequest(request, sender, sendResponse) {
            console.log(request);
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
        }
        getResult() {
            this.ed2k_result = document.body.innerHTML.match(this.ed2k_regex) || [];
            this.magnet_result = document.body.innerHTML.match(this.magnet_regex) || [];
            this.result = { ed2k_result: this.ed2k_result, magnet_result: this.magnet_result };
        }
    }
    var content = new Content();

    exports.Content = Content;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=contentscript.js.map
