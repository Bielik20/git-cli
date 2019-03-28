import chalk from 'chalk';
import * as clear from 'clear';
import { textSync } from 'figlet';

export function run() {
  clear();
  console.log(chalk.yellow(textSync('Git CLI', { horizontalLayout: 'full' })));
}
