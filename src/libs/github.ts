import * as Octokit from '@octokit/rest';
import { Spinner } from 'clui';
import * as Configstore from 'configstore';
import { prompter } from './prompter';

export class GitHub {
  pkg = require('../../package.json');
  conf = new Configstore(this.pkg.name);
  octokit = new Octokit();

  getStoredGithubToken() {
    return this.conf.get('github.token');
  }

  async setGithubCredentials() {
    const credentials = await prompter.askGithubCredentials();
    this.octokit = new Octokit({
      auth: {
        ...credentials,
        async on2fa() {
          const { token } = await prompter.askGithubTwoFactor();
          return token;
        },
      },
    });
  }

  async registerNewToken() {
    const status = new Spinner('Authenticating you, please wait...');
    status.start();

    try {
      const response = await this.octokit.oauthAuthorizations.createAuthorization({
        scopes: ['user', 'public_repo', 'repo', 'repo:status'],
        note: 'Git CLI, the command-line tool for initalizing Git repos',
      });
      const token = response.data.token;
      if (token) {
        this.conf.set('github.token', token);
        return token;
      } else {
        throw new Error('Missing Token, GitHub token was not found in the response');
      }
    } catch (err) {
      throw err;
    } finally {
      status.stop();
    }
  }
}

export const github = new GitHub();
