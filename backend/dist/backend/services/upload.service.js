"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const formidable_1 = __importDefault(require("formidable"));
const fs_1 = __importDefault(require("fs"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const config_1 = require("../config/config");
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: config_1.config.s3accessKey,
    secretAccessKey: config_1.config.s3secretAccess,
});
class UploadService {
    uploadToS3(file) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('file' + file);
            const readStream = fs_1.default.createReadStream(file.filepath);
            const params = {
                Bucket: 'bigchallenge',
                Key: file.originalFilename,
                Body: readStream
            };
            return new Promise((resolve, reject) => {
                s3.upload(params, function (err, data) {
                    readStream.destroy();
                    if (err) {
                        return reject(err);
                    }
                    return resolve(data);
                });
            });
        });
    }
    parseFiles(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const form = (0, formidable_1.default)({ multiples: false });
                form.parse(req, (err, fields, files) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        return reject(err);
                    }
                    const filePath = yield this.uploadToS3(files.file);
                    resolve(filePath);
                }));
            });
        });
    }
    uploadFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const imageUrl = yield this.parseFiles(req);
            return imageUrl;
        });
    }
}
exports.UploadService = UploadService;
