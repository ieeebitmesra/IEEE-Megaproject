"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenManager = void 0;
const KEY = "vscode.Memento";
class TokenManager {
    static setToken(token) {
        return this.globalState.update(KEY, token);
    }
    static getToken() {
        return this.globalState.get(KEY);
    }
}
exports.TokenManager = TokenManager;
//# sourceMappingURL=TokenManager.js.map