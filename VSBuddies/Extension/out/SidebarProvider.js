"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarProvider = void 0;
const vscode = require("vscode");
const authenticate_1 = require("./authenticate");
const constants_1 = require("./constants");
const getNonce_1 = require("./getNonce");
const TokenManager_1 = require("./TokenManager");
class SidebarProvider {
    constructor(_extensionUri) {
        this._extensionUri = _extensionUri;
    }
    resolveWebviewView(webviewView) {
        this._view = webviewView;
        webviewView.webview.options = {
            // Allow scripts in the webview
            enableScripts: true,
            localResourceRoots: [this._extensionUri],
        };
        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
        webviewView.webview.onDidReceiveMessage(async (data) => {
            switch (data.type) {
                case "onInfo": {
                    if (!data.value) {
                        return;
                    }
                    vscode.window.showInformationMessage(data.value);
                    break;
                }
                case "onError": {
                    if (!data.value) {
                        return;
                    }
                    vscode.window.showErrorMessage(data.value);
                    break;
                }
                case "get-token": {
                    webviewView.webview.postMessage({ type: 'token', value: TokenManager_1.TokenManager.getToken() });
                    break;
                }
                case "auth": {
                    (0, authenticate_1.authenticate)(() => {
                        webviewView.webview.postMessage({ type: 'token', value: TokenManager_1.TokenManager.getToken() });
                    });
                    break;
                }
                case "logout": {
                    TokenManager_1.TokenManager.setToken(undefined);
                    break;
                }
                case "extensions": {
                    const userExtensions = vscode.extensions.all.map(ext => ext.packageJSON.name);
                    webviewView.webview.postMessage({ type: 'extensions', value: { ext: userExtensions, token: TokenManager_1.TokenManager.getToken() } });
                    break;
                }
                case "gotowebsite": {
                    vscode.commands.executeCommand("vscode.open", vscode.Uri.parse(`https://vsbuddies.netlify.app`));
                    break;
                }
            }
        });
    }
    revive(panel) {
        this._view = panel;
    }
    _getHtmlForWebview(webview) {
        const styleResetUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media", "reset.css"));
        const styleVSCodeUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media", "vscode.css"));
        const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "out", "compiled/sidebar.js"));
        const styleMainUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "out", "compiled/sidebar.css"));
        // Use a nonce to only allow a specific script to be run.
        const nonce = (0, getNonce_1.getNonce)();
        return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<!--
					Use a content security policy to only allow loading images from https or from our extension directory,
					and only allow scripts that have a specific nonce.
        -->
        <meta http-equiv="Content-Security-Policy" content="default-src ${constants_1.apiBaseUrl} ${constants_1.apiBaseUrl.includes("https")
            ? constants_1.apiBaseUrl.replace("https", "wss")
            : constants_1.apiBaseUrl.replace("http", "ws")} img-src https: data:; style-src 'unsafe-inline' ${webview.cspSource}; script-src 'nonce-${nonce}';">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<link href="${styleResetUri}" rel="stylesheet">
				<link href="${styleVSCodeUri}" rel="stylesheet">
        <link href="${styleMainUri}" rel="stylesheet">
			<script nonce = "${nonce}">
		const tsvscode = acquireVsCodeApi();
		const apiBaseUrl = ${JSON.stringify(constants_1.apiBaseUrl)}
			</script>
				</head>
			<body>
				<script nonce="${nonce}" src="${scriptUri}">
				</script>
			</body>
			</html>`;
    }
}
exports.SidebarProvider = SidebarProvider;
//# sourceMappingURL=SidebarProvider.js.map