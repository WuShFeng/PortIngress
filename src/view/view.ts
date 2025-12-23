import * as vscode from 'vscode';

class MyTreeItem extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly command?: vscode.Command
    ) {
        super(label, collapsibleState);
    }
}

export class MyTreeDataProvider implements vscode.TreeDataProvider<MyTreeItem> {

    private _onDidChangeTreeData: vscode.EventEmitter<MyTreeItem | undefined | null | void> = new vscode.EventEmitter<MyTreeItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<MyTreeItem | undefined | null | void> = this._onDidChangeTreeData.event;

    getTreeItem(element: MyTreeItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: MyTreeItem): Thenable<MyTreeItem[]> {
        if (!element) {
            // 根节点
            return Promise.resolve([
                new MyTreeItem("Node 1", vscode.TreeItemCollapsibleState.Collapsed),
                new MyTreeItem("Node 2", vscode.TreeItemCollapsibleState.None)
            ]);
        } else {
            // 子节点
            return Promise.resolve([
                new MyTreeItem(`${element.label} Child 1`, vscode.TreeItemCollapsibleState.None),
                new MyTreeItem(`${element.label} Child 2`, vscode.TreeItemCollapsibleState.None)
            ]);
        }
    }

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }
}
