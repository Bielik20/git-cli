import { Spinner } from 'clui';
import { delay } from 'rxjs/operators';
import simple_git from 'simple-git';

export class Repo {
  git = simple_git();

  async createRemoteRepo() {
    const status = new Spinner('Creating remote repository...');

    status.start();
    await delay(2000);
    status.stop();
  }
}

export const repo = new Repo();
