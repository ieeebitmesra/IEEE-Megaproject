import * as vscode from "vscode";

const KEY = "vscode.Memento";

export class TokenManager{
  static globalState: vscode.Memento;

  static setToken(token: string|undefined){
    return this.globalState.update(KEY, token);
  }
  static getToken(): string | undefined {
    return this.globalState.get(KEY);
  }
}