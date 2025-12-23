import * as vscode from 'vscode';

class DomainItem extends vscode.TreeItem {
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

export class DomainTreeDataProvider implements vscode.TreeDataProvider<DomainItem> {

    private _onDidChangeTreeData: vscode.EventEmitter<DomainItem | undefined | null | void> = new vscode.EventEmitter<DomainItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<DomainItem | undefined | null | void> = this._onDidChangeTreeData.event;

    private frpList: { label: string, address: string, token: string }[] = [];

    constructor() {
        this.frpList = [
        ];
    }

    getTreeItem(element: DomainItem): vscode.TreeItem {
        if (element.label === 'Domain列表') {
            element.contextValue = 'frpRoot';
        }
        return element;
    }

    getChildren(element?: DomainItem): Thenable<DomainItem[]> {
        if (!element) {
            return Promise.resolve([new DomainItem('Domain列表', undefined, undefined, vscode.TreeItemCollapsibleState.Expanded)]);
        }
        return Promise.resolve([]);
    }

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }
}