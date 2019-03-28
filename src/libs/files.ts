import * as fs from 'fs';
import * as path from 'path';

export class Files {
  getCurrentDirectoryBase() {
    return path.basename(process.cwd());
  }

  directoryExists(filePath) {
    try {
      return fs.statSync(filePath).isDirectory();
    } catch (err) {
      return false;
    }
  }
}

export const files = new Files();
