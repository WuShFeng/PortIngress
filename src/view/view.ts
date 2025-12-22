import * as vscode from 'vscode';

export class PortWebviewProvider implements vscode.WebviewViewProvider {
    public static readonly viewType = "portForwardBottomView";
    constructor(private readonly _extensionUri: vscode.Uri) { }

    resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken
    ) {
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._extensionUri]
        };

        webviewView.webview.html = this.getHtmlContent();
    }

    private getHtmlContent(): string {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Ports</title>
                <style>
                    body {
                        padding: 0;
                        margin: 0;
                        font-family: var(--vscode-font-family);
                        font-size: var(--vscode-font-size);
                        color: var(--vscode-foreground);
                        background-color: var(--vscode-editor-background);
                    }
                    
                    .table-container {
                        width: 100%;
                        overflow-x: auto;
                    }
                    
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        background-color: var(--vscode-editor-background);
                    }
                    
                    th {
                        background-color: var(--vscode-sideBarSectionHeader-background);
                        color: var(--vscode-sideBarSectionHeader-foreground);
                        padding: 8px 12px;
                        text-align: left;
                        font-weight: 600;
                        font-size: 12px;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                        border-bottom: 1px solid var(--vscode-tree-tableHeaderBorder);
                    }
                    
                    td {
                        padding: 8px 12px;
                        border-bottom: 1px solid var(--vscode-tree-inactiveIndentGuidesStroke);
                    }
                    
                    tr:hover {
                        background-color: var(--vscode-list-hoverBackground);
                    }
                    
                    .port-column {
                        width: 100px;
                    }
                    
                    .forwarded-column {
                        min-width: 150px;
                    }
                    
                    .process-column {
                        flex: 1;
                    }
                    
                    .origin-column {
                        width: 150px;
                    }
                    
                    .add-port-btn {
                        background-color: var(--vscode-button-background);
                        color: var(--vscode-button-foreground);
                        border: none;
                        padding: 6px 12px;
                        border-radius: 3px;
                        cursor: pointer;
                        font-size: 12px;
                        font-weight: 600;
                    }
                    
                    .add-port-btn:hover {
                        background-color: var(--vscode-button-hoverBackground);
                    }
                    
                    .origin {
                        font-size: 12px;
                        color: var(--vscode-descriptionForeground);
                    }
                    
                    .running-icon {
                        color: var(--vscode-terminal-ansiGreen);
                        margin-right: 6px;
                    }
                </style>
            </head>
            <body>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th class="port-column">Port</th>
                                <th class="forwarded-column">Forwarded Address</th>
                                <th class="process-column">Running Process</th>
                                <th class="origin-column">Origin</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <span class="running-icon">●</span>
                                    3000
                                </td>
                                <td>localhost:3000</td>
                                <td></td>
                                <td class="origin">User Forwarded</td>
                            </tr>
                            <tr>
                                <td colspan="4">
                                    <button class="add-port-btn">Add Port</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </body>
            </html>
        `;
    }
}
