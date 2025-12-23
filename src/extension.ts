import * as vscode from 'vscode';
import { MyTreeDataProvider } from "./view/view";

export function activate(context: vscode.ExtensionContext) {
	const treeDataProvider = new MyTreeDataProvider();
	const treeView = vscode.window.createTreeView('portForwardPanel', { treeDataProvider });

	context.subscriptions.push(treeView);

	context.subscriptions.push(
		vscode.commands.registerCommand('myTreeView.refresh', () => treeDataProvider.refresh())
	);
}


export function deactivate() { }
