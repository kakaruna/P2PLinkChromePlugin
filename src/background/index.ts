import { Results } from "../shared";

export class BackGround {
    private result: Results;

    constructor() {
        chrome.runtime.onMessage.addListener(
            (request: any, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void) => {
                this.onRequest(request, sender, sendResponse);
            }
        );

        chrome.tabs.onSelectionChanged.addListener((id, obj) => {
            chrome.tabs.sendRequest(id, { ask: "getResult" }, response => {
                if (response) {
                    this.result = response.result;
                }
            });
        });
    }

    onRequest(request: any, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void) {
        console.log(request);
        if (request.ask === "p2plinks") {
            this.showPopup(request.result, sender.tab.id);
        }

        var copyLinks = request.links.replace(/\r\n/g, "\\\\r\\\\n");

        let writeCode = `
            var sGetter = document.createElement("script");
            sGetter.type = "application/javascript";
            sGetter.textContent = "var r = setInterval(function()" +
                "{ if(top.Core && top.Core.OFFL5Plug) {" +
                    "top.Core.OFFL5Plug.OpenLink();"+
                    "setTimeout(function() {"+
                        "top.$('#js_offline_new_add').val(\\"${copyLinks}\\");"+
                    "}, 10);"+
                    "clearInterval(r);" +
                "} },300);";
            document.body.appendChild(sGetter);
        `;

        // top.Core.OFFL5Plug.OpenLink();
        // setTimeout(function() {
        //     $('#js_offline_new_add').val(${copyLinks});
        // }, 1);
        // clearInterval(r);

        if (request.ask === "openTab") {
            chrome.tabs.create({ url: request.url }, tab => {
                chrome.tabs.executeScript(tab.id, { code: writeCode }, () => {});
            });
        }
    }

    showPopup = function(result, id) {
        this.result = result;
        chrome.pageAction.show(id);
    };
}

new BackGround();
