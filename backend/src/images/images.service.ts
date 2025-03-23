import { Injectable, Res, UploadedFile } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class ImagesService {
    async createImage(@UploadedFile() file: Express.Multer.File): Promise<string> {
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

    async getImage(name: string): Promise<any> {
        // return fs.createReadStream(join(process.cwd(), `images/${name}`));
        const fileBuffer = fs.readFileSync(`images/${name}`);
        console.log(fileBuffer)
        return fileBuffer.toString('base64');
    }
}
