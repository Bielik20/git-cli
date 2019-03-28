import * as inquirer from 'inquirer';
import * as minimist from 'minimist';
import { files } from './files';

export class Prompter {
  askGithubCredentials(): Promise<any> {
    const questions = [
      {
        name: 'username',
        type: 'input',
        message: 'Enter your GitHub username or e-mail address:',
        validate(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your username or e-mail address.';
          }
        },
      },
      {
        name: 'password',
        type: 'password',
        message: 'Enter your password:',
        validate(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your password.';
          }
        },
      },
    ];
    return inquirer.prompt(questions);
  }

  async askGithubTwoFactor(): Promise<any> {
    const questions = [
      {
        name: 'token',
        type: 'input',
        message: 'Two-factor authentication Code:',
        validate(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter authentication code.';
          }
        },
      },
    ];
    return inquirer.prompt(questions);
  }

  askRepoDetails(): Promise<any> {
    const argv = minimist(process.argv.slice(2));

    const questions = [
      {
        type: 'input',
        name: 'name',
        message: 'Enter a name for the repository:',
        default: argv._[0] || files.getCurrentDirectoryBase(),
        validate(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter a name for the repository.';
          }
        },
      },
      {
        type: 'input',
        name: 'description',
        default: argv._[1] || null,
        message: 'Optionally enter a description of the repository:',
      },
      {
        type: 'list',
        name: 'visibility',
        message: 'Public or private:',
        choices: ['public', 'private'],
        default: 'public',
      },
    ];
    return inquirer.prompt(questions);
  }
}

export const prompter = new Prompter();
