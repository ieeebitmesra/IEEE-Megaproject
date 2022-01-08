"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const vscode = require("vscode");
const constants_1 = require("./constants");
const polka = require("polka");
const TokenManager_1 = require("./TokenManager");
const authenticate = (fn) => {
    const app = polka();
    app.get("/auth/:token", async (req, res) => {
        const { token } = req.params;
        if (!token) {
            res.end("<h1>Something Went Wrong</h1>");
            return;
        }
        await TokenManager_1.TokenManager.setToken(token);
        res.end("<h1>Auth Successful</h1><br />You can close this now");
        app.server.close();
        fn();
    });
    app.listen(64589, (err) => {
        if (err) {
            vscode.window.showErrorMessage(err.message);
        }
    });
    vscode.commands.executeCommand("vscode.open", vscode.Uri.parse(`${constants_1.apiBaseUrl}/auth/github`));
};
exports.authenticate = authenticate;
//# sourceMappingURL=authenticate.js.map