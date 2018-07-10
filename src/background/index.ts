import { Result } from "../shared/index";

export class BackGround {
    private result: Result;

    constructor() {
        chrome.extension.onRequest.addListener(
            (
                request: any, 
                sender: chrome.runtime.MessageSender, 
                sendResponse: (response: any) => void
            ) => {
                this.onRequest(request, sender, sendResponse)
            }
        );

        chrome.tabs.onSelectionChanged.addListener((id, obj) => {
            chrome.tabs.sendRequest(id, { ask: "getResult" }, (response) => {
                this.result = response.result;
            });
        });
    }

    onRequest(request: any, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void) {
        if (request.ask == "p2plinks") {
            this.showPopup(request.result, sender.tab.id);
        }
    }

    showPopup = function(result, id) {
        this.result = result;
        chrome.pageAction.show(id);
    };
}

new BackGround();
