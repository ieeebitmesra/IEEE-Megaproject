"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const SidebarProvider_1 = require("./SidebarProvider");
const authenticate_1 = require("./authenticate");
const TokenManager_1 = require("./TokenManager");
async function activate(context) {
    TokenManager_1.TokenManager.globalState = context.globalState;
    context.subscriptions.push(vscode.commands.registerCommand('vsbuddies.authenticate', async () => {
        (0, authenticate_1.authenticate)(() => { });
    }));
    const sidebarProvider = new SidebarProvider_1.SidebarProvider(context.extensionUri);
    context.subscriptions.push(vscode.window.registerWebviewViewProvider("vsbuddies-sidebar", sidebarProvider));
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map