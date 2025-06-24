import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as fs from 'fs';
import { join } from 'path';
import { Response } from 'express';

// return fs.createReadStream(join(process.cwd(), `images/${name}`));
// const fileBuffer = fs.readFileSync(`images/${name}`);
// console.log(name)
// return fileBuffer.toString('base64');

@Injectable()
export class ImagesService {
    async createImage(file: Express.Multer.File): Promise<string> {
        fs.mkdirSync('images', {recursive: true});
        try {
            const extension = file.originalname.split('.')[1];
            const fileId = randomUUID();
            fs.writeFileSync(`images/${fileId}.${extension}`, file.buffer);
            return `${fileId}.${extension}`;
        }
        catch (err) {
            return err;
        }
    }

    async getImage(name: string, res: Response): Promise<void> {
        try {
            // Handle case where name might contain multiple filenames
            const imageName = name.split(',')[0]; // Take only the first image name
            
            const filePath = join(process.cwd(), 'images', imageName);
            
            if (!fs.existsSync(filePath)) {
                console.error(`Image not found: ${imageName}`);
                res.status(404).send('Image not found');
                return;
            }

            // Set appropriate content type based on file extension
            const ext = imageName.split('.').pop()?.toLowerCase() || '';
            const contentType = {
                'png': 'image/png',
                'jpg': 'image/jpeg',
                'jpeg': 'image/jpeg',
                'gif': 'image/gif',
                'webp': 'image/webp'
            }[ext] || 'application/octet-stream';

            res.setHeader('Content-Type', contentType);
            fs.createReadStream(filePath).pipe(res);
        } catch (error) {
            console.error('Error reading image:', error);
            res.status(500).send('Error reading image');
        }
    }

    async deleteImage(name: string): Promise<boolean> {
        try {
            const filePath = join(process.cwd(), 'images', name);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error deleting image:', error);
            return false;
        }
    }
}
