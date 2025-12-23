import * as vscode from 'vscode';
import { DomainTreeDataProvider } from './domain';
import { FrpTreeDataProvider } from './frp';

export class TreeDataProvider implements vscode.TreeDataProvider<vscode.TreeItem> {

    private _onDidChangeTreeData: vscode.EventEmitter<vscode.TreeItem | undefined | null | void> = new vscode.EventEmitter<vscode.TreeItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<vscode.TreeItem | undefined | null | void> = this._onDidChangeTreeData.event;
    private domainProvider = new DomainTreeDataProvider();
    private frpProvider = new FrpTreeDataProvider();

    getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
        return element;
    }

    async getChildren(element?: vscode.TreeItem): Promise<vscode.TreeItem[]> {
        if (!element) {
            const domainRoot = await this.domainProvider.getChildren();
            const frpRoot = await this.frpProvider.getChildren();
            return [...domainRoot, ...frpRoot];
        }
        return Promise.resolve([]);
    }

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }
}