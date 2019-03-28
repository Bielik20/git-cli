import chalk from 'chalk';
import * as clear from 'clear';
import { textSync } from 'figlet';
import { files } from './libs/files';
import { github } from './libs/github';

export async function run() {
  clear();
  console.log(chalk.yellow(textSync('Git CLI', { horizontalLayout: 'full' })));

  if (files.directoryExists('.git')) {
    console.log(chalk.red('Already a git repository!'));
    process.exit(1);
  }

  let token = github.getStoredGithubToken();
  if (!token) {
    await github.setGithubCredentials();
    token = await github.registerNewToken();
  }
  console.log(token);
}
