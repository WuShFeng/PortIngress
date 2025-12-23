import * as vscode from 'vscode';

class FrpTreeItem extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly address?: string,
        public readonly token?: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState = vscode.TreeItemCollapsibleState.None,
        public readonly command?: vscode.Command
    ) {
        super(label, collapsibleState);
        if (address && token) {
            this.tooltip = `Address: ${address}\nToken: ${token}`;
        }
    }
}

export class FrpTreeDataProvider implements vscode.TreeDataProvider<FrpTreeItem> {

    private _onDidChangeTreeData: vscode.EventEmitter<FrpTreeItem | undefined | null | void> = new vscode.EventEmitter<FrpTreeItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<FrpTreeItem | undefined | null | void> = this._onDidChangeTreeData.event;

    private frpList: { label: string, address: string, token: string }[] = [];

    constructor() {
        this.frpList = [
        ];
    }

    getTreeItem(element: FrpTreeItem): vscode.TreeItem {
        if (element.label === 'Frp列表') {
            element.contextValue = 'frpRoot';
        }
        return element;
    }

    getChildren(element?: FrpTreeItem): Thenable<FrpTreeItem[]> {
        if (!element) {
            return Promise.resolve([new FrpTreeItem('Frp列表', undefined, undefined, vscode.TreeItemCollapsibleState.Expanded)]);
        }
        return Promise.resolve([]);
    }

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }
}