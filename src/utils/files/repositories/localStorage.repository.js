import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import archiver from 'archiver';
import { exec } from 'child_process';
import crypto from 'crypto';

class FileHandler {
  constructor(filePath, createIfNotExist = false) {
    this.filePath = filePath;
    this.createIfNotExist = createIfNotExist;

    // Ensure file existence if required
    if (this.createIfNotExist && !fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, ''); // Create an empty file if it doesn't exist
    }
  }

  // Upload a file to a destination folder
  async uploadFile(file, destination = './uploads') {
    try {
      await this.createFolder(destination);
      const filePath = path.join(destination, file.originalname);
      await fs.promises.writeFile(filePath, file.buffer);
      return filePath;
    } catch (error) {
      console.error('Error uploading file:', error.message);
      throw error;
    }
  }

  // Delete the file
  async deleteFile() {
    try {
      if (fs.existsSync(this.filePath)) {
        await fs.promises.unlink(this.filePath);
      }
    } catch (error) {
      console.error('Error deleting file:', error.message);
      throw error;
    }
  }

  // Check if file exists
  fileExists() {
    return fs.existsSync(this.filePath);
  }

  // Move a file to a new destination
  async moveFile(destinationPath) {
    try {
      await fs.promises.rename(this.filePath, destinationPath);
    } catch (error) {
      console.error('Error moving file:', error.message);
      throw error;
    }
  }

  // Rename the file
  async renameFile(newName) {
    try {
      const newPath = path.join(path.dirname(this.filePath), newName);
      await fs.promises.rename(this.filePath, newPath);
      return newPath;
    } catch (error) {
      console.error('Error renaming file:', error.message);
      throw error;
    }
  }

  // Get file information
  getFileInfo() {
    try {
      const stats = fs.statSync(this.filePath);
      return {
        name: path.basename(this.filePath),
        size: stats.size,
        type: path.extname(this.filePath),
        createdAt: stats.birthtime,
        updatedAt: stats.mtime,
      };
    } catch (error) {
      console.error('Error fetching file info:', error.message);
      throw error;
    }
  }

  // Create a folder if it doesn't exist
  async createFolder(folderPath) {
    try {
      if (!fs.existsSync(folderPath)) {
        await fs.promises.mkdir(folderPath, { recursive: true });
      }
    } catch (error) {
      console.error('Error creating folder:', error.message);
      throw error;
    }
  }

  // Check if a folder exists
  folderExists(folderPath) {
    return fs.existsSync(folderPath);
  }

  // Read contents of a folder
  async readFolder(folderPath) {
    try {
      return await fs.promises.readdir(folderPath);
    } catch (error) {
      console.error('Error reading folder:', error.message);
      throw error;
    }
  }

  // Delete a folder and its contents
  async deleteFolder(folderPath) {
    try {
      if (fs.existsSync(folderPath)) {
        await fs.promises.rm(folderPath, { recursive: true });
      }
    } catch (error) {
      console.error('Error deleting folder:', error.message);
      throw error;
    }
  }

  // Resize an image
  async resizeImage(width, height) {
    try {
      const buffer = fs.readFileSync(this.filePath);
      const resizedBuffer = await sharp(buffer).resize(width, height).toBuffer();
      fs.writeFileSync(this.filePath, resizedBuffer);
    } catch (error) {
      console.error('Error resizing image:', error.message);
      throw error;
    }
  }

  // Convert image format
  async convertImageFormat(format) {
    try {
      const buffer = fs.readFileSync(this.filePath);
      const convertedBuffer = await sharp(buffer).toFormat(format).toBuffer();
      fs.writeFileSync(this.filePath, convertedBuffer);
    } catch (error) {
      console.error('Error converting image format:', error.message);
      throw error;
    }
  }

  // Compress an image
  async compressImage(quality = 80) {
    try {
      const buffer = fs.readFileSync(this.filePath);
      const compressedBuffer = await sharp(buffer).jpeg({ quality }).toBuffer();
      fs.writeFileSync(this.filePath, compressedBuffer);
    } catch (error) {
      console.error('Error compressing image:', error.message);
      throw error;
    }
  }

  // Compress multiple files into a ZIP archive
  async compressFiles(files, outputPath) {
    return new Promise((resolve, reject) => {
      try {
        const output = fs.createWriteStream(outputPath);
        const archive = archiver('zip');

        output.on('close', () => resolve(outputPath));
        archive.on('error', (err) => reject(err));

        archive.pipe(output);
        files.forEach((file) => {
          archive.file(file.path, { name: file.originalname });
        });
        archive.finalize();
      } catch (error) {
        console.error('Error compressing files:', error.message);
        reject(error);
      }
    });
  }

  // Scan a file for malware
  async scanFile() {
    return new Promise((resolve, reject) => {
      exec(`clamscan ${this.filePath}`, (error, stdout) => {
        if (error) {
          reject(new Error('File is infected or corrupted.'));
        } else {
          resolve(stdout.includes('Infected files: 0') ? 'File is safe.' : 'File is infected.');
        }
      });
    });
  }

  // Encrypt a file
  async encryptFile(secretKey) {
    try {
      const buffer = fs.readFileSync(this.filePath);
      const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, secretKey.slice(0, 16));
      const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
      fs.writeFileSync(this.filePath, encrypted);
    } catch (error) {
      console.error('Error encrypting file:', error.message);
      throw error;
    }
  }

  // Decrypt a file
  async decryptFile(secretKey) {
    try {
      const encryptedBuffer = fs.readFileSync(this.filePath);
      const decipher = crypto.createDecipheriv('aes-256-cbc', secretKey, secretKey.slice(0, 16));
      const decrypted = Buffer.concat([decipher.update(encryptedBuffer), decipher.final()]);
      fs.writeFileSync(this.filePath, decrypted);
    } catch (error) {
      console.error('Error decrypting file:', error.message);
      throw error;
    }
  }
}

export default FileHandler;
