import * as vscode from 'vscode';
import { SidebarProvider } from "./SidebarProvider";
import { authenticate } from './authenticate';
import { TokenManager } from './TokenManager';
export async function activate(context: vscode.ExtensionContext) {
	TokenManager.globalState = context.globalState;

	context.subscriptions.push(vscode.commands.registerCommand('vsbuddies.authenticate', async() => {
		authenticate(()=>{});
	})
	);
	const sidebarProvider = new SidebarProvider(context.extensionUri);
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
		"vsbuddies-sidebar",
		sidebarProvider
	)
	);


}

// this method is called when your extension is deactivated
export function deactivate() {}
