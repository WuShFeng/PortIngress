import * as vscode from 'vscode';
import { PortWebviewProvider } from "./view/view";
export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
			PortWebviewProvider.viewType,
			new PortWebviewProvider(context.extensionUri)
		)
	);
}

export function deactivate() { }
