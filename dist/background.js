(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.background = {})));
}(this, (function (exports) { 'use strict';

    class BackGround {
        constructor() {
            this.showPopup = function (result, id) {
                this.result = result;
                chrome.pageAction.show(id);
            };
            chrome.extension.onRequest.addListener((request, sender, sendResponse) => {
                this.onRequest(request, sender, sendResponse);
            });
            chrome.tabs.onSelectionChanged.addListener((id, obj) => {
                chrome.tabs.sendRequest(id, { ask: "getResult" }, (response) => {
                    this.result = response.result;
                });
            });
        }
        onRequest(request, sender, sendResponse) {
            if (request.ask == "p2plinks") {
                this.showPopup(request.result, sender.tab.id);
            }
        }
    }
    new BackGround();

    exports.BackGround = BackGround;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=background.js.map
