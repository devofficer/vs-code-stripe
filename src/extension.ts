// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Credentials } from './credentials';
import { License } from './license';


export async function activate(context: vscode.ExtensionContext) {	
	context.subscriptions.push(vscode.commands.registerCommand('extension.getGitHubUser', async () => {
		const licenseKey = vscode.workspace.getConfiguration('githubAuth').get('license_key');
		vscode.window.showInformationMessage(`${licenseKey}`);
	
		const license = new License();
		const activated = await license.activate(context);
		
		if (activated) {
			const credentials = new Credentials();
			await credentials.initialize(context);
	
			/**
			 * Octokit (https://github.com/octokit/rest.js#readme) is a library for making REST API
			 * calls to GitHub. It provides convenient typings that can be helpful for using the API.
			 * 
			 * Documentation on GitHub's REST API can be found here: https://docs.github.com/en/rest
			 */
			const octokit = await credentials.getOctokit();
			const userInfo = await octokit.users.getAuthenticated();

			vscode.window.showInformationMessage(`Logged into GitHub as ${userInfo.data.login}`);
		}
	}));
}

// this method is called when your extension is deactivated
export function deactivate() {}
