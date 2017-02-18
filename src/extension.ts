'use strict';
import * as vscode from 'vscode';
import * as csso from 'csso';

const fullRange = doc => doc.validateRange(new vscode.Range(0, 0, Number.MAX_VALUE, Number.MAX_VALUE));

class CSSOFormatting implements vscode.DocumentFormattingEditProvider {
    provideDocumentFormattingEdits(document: vscode.TextDocument, options: vscode.FormattingOptions, token: vscode.CancellationToken) {
        let result = csso.minify(document.getText()).css;
        document.getText = () => result;
        return [
            vscode.TextEdit.replace(fullRange(document), result)
        ];
    }
}

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.languages.registerDocumentFormattingEditProvider('css', new CSSOFormatting);
    context.subscriptions.push(disposable);
}

export function deactivate() {

}