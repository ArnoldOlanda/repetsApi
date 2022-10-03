import { Request } from "express";
import path from 'path'
import fileUpload from "express-fileupload";
import { v4 as uuidv4 } from 'uuid';

export const uploadFiles = (req: Request, extensionesValidas = ['png', 'jpg', 'jpeg'], carpeta = '') => {

    return new Promise((resolve, reject) => {

        if (req.files) {
            const image = req.files.image as fileUpload.UploadedFile;

            const nombreCortado = image.name.split('.');
            const extension = nombreCortado[nombreCortado.length - 1];

            if (!extensionesValidas.includes(extension)) {
                return reject(`La extension ${extension} no es permitida - [${extensionesValidas}]`)
            }

            const nombreTemp = uuidv4() + '.' + extension;

            const uploadPath = path.join(__dirname, '../../uploads/',carpeta , nombreTemp);

            image.mv(uploadPath, (err: Error) => {
                if (err) {
                    reject(err);
                }

                resolve(nombreTemp)
            });

            return;
        }

    })



}