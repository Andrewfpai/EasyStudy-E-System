import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

@Injectable()
export class StorageService {
  private readonly uploadDir = process.env.UPLOAD_DIR || './uploads';

  ensureSubdir(subfolder: string) {
    const dir = join(this.uploadDir, subfolder);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    return dir;
  }

  buildPublicUrl(subfolder: string, filename: string) {
    const base = process.env.BACKEND_PUBLIC_URL || 'http://localhost:5000';
    return `${base}/uploads/${subfolder}/${filename}`;
  }
}