import { window, workspace, commands, ExtensionContext } from 'vscode';

export class License {
	async activate(context: ExtensionContext): Promise<boolean> {
		const result = await window.showInputBox({
			value: '',
			placeHolder: 'Input License Key...',
			validateInput: text => {
				return null;
			}
		});
		
		workspace.getConfiguration('githubAuth').update('license_key', result, true);

		return true;
	}
}