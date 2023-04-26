import { Request, Response } from 'express';
import formidable from 'formidable';
import fs from 'fs';
import aws from 'aws-sdk';
import { config } from '../config/config';


type Data = {
    message: string
}

const s3 = new aws.S3({
    accessKeyId: config.s3accessKey,
    secretAccessKey: config.s3secretAccess,
})


export class UploadService {

    async uploadToS3(file: any): Promise<any> {

        console.log('file' + file)
        const readStream = fs.createReadStream(file.filepath);

        const params = {
            Bucket: 'bigchallenge',
            Key: file.originalFilename,
            Body: readStream
        };

        return new Promise((resolve, reject) => {
            s3.upload(params, function (err: any, data: any) {
                readStream.destroy();

                if (err) {
                    return reject(err);
                }

                return resolve(data);
            });
        });
    }

    async parseFiles(req: Request): Promise<string> {

        return new Promise((resolve, reject) => {


            const form = formidable({ multiples: false });

            form.parse(req, async (err, fields, files) => {
                if (err) {
                    return reject(err);
                }

                const filePath = await this.uploadToS3(files.file as formidable.File)
                resolve(filePath);
            })

        })
    }

    async uploadFile(req: Request, res: Response<Data>) {

        const imageUrl = await this.parseFiles(req);

        return imageUrl;

    }
}




