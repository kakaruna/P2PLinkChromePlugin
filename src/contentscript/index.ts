import { Result } from "../shared/index";

export class Content {
    private ed2k_regex: RegExp = /ed2k:\/\/\|file\|.+?\//gi;
    private magnet_regex: RegExp = /magnet\:\?[^\"]+/gi;
    private result: Result;
    private ed2k_result: Array<string> = [];
    private magnet_result: Array<string> = [];

    constructor(){
        this.init();

        chrome.runtime.onMessage.addListener(
                (
                    request: any, 
                    sender: chrome.runtime.MessageSender, 
                    sendResponse: (response: any) => void
                ) => {
                    this.onRequest(request, sender, sendResponse)
                }
            );
    }

    init() {
        if (this.ed2k_regex.test(document.body.innerHTML) || this.magnet_regex.test(document.body.innerHTML)) {
            this.getResult();
    
            chrome.runtime.sendMessage(
                { ask: "p2plinks", result: this.result }, 
                (response) => {

                }
            );
        }
    }

    onRequest(request: any, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void) {
        console.log(request);
        if (request.ask == "getResult") {
            if (this.result) {
                sendResponse({ result: this.result });
            } else {
                this.getResult();
                sendResponse({ result: this.result });
            }
        }else if (request.ask == "refreshResult") {
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