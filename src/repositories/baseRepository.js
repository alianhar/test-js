import fs from 'fs/promises';
import path from 'path';

export class BaseRepository {
  constructor(fileName) {
    this.filePath = path.join(process.cwd(), 'src', 'data', fileName);
    this.ensureDataDirectory();
  }

  async ensureDataDirectory() {
    const dataDir = path.dirname(this.filePath);
    try {
      await fs.access(dataDir);
    } catch {
      await fs.mkdir(dataDir, { recursive: true });
    }
  }

  async readData() {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        return [];
      }
      throw error;
    }
  }

  async writeData(data) {
    await this.ensureDataDirectory();
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
  }
}