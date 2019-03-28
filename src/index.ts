import chalk from 'chalk';
import * as clear from 'clear';
import { textSync } from 'figlet';
import { files } from './libs/files';
import { prompter } from './libs/prompter';

export async function run() {
  clear();
  console.log(chalk.yellow(textSync('Git CLI', { horizontalLayout: 'full' })));

  if (files.directoryExists('.git')) {
    console.log(chalk.red('Already a git repository!'));
    process.exit(1);
  }

  const credentials = await prompter.askGithubCredentials();
  console.log(credentials);
}
