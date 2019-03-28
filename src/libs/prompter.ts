import * as inquirer from 'inquirer';

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
}

export const prompter = new Prompter();
