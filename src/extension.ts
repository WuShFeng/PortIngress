import * as vscode from 'vscode';
import { TreeDataProvider } from "./view/view";
export function activate(context: vscode.ExtensionContext) {
	const treeDataProvider = new TreeDataProvider();
	const tree = vscode.window.createTreeView('portForwardPanel', { treeDataProvider });

	context.subscriptions.push(
		vscode.commands.registerCommand('myTreeView.refresh', () => treeDataProvider.refresh())
	);
}


export function deactivate() { }
