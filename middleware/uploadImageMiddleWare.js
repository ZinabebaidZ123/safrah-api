import multer from 'multer';
import BadRequest from '../errors/badRequest.js';
import {v4 as uuid} from 'uuid'

const multerOptions = (path) => {
    // 1) DisStorage engine
    const multerStorage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `uploads/${path}`)
        },
        filename: function (req, file, cb) {
            // category-{id}-Date.now().jpeg
            const ext = file.mimetype.split('/')[1];
            const filename = `${path}-${uuid()}-${Date.now()}.${ext}`;
            cb(null, filename);
        }
    });
    const fileFilter = async (req, file, cb) => {
        if (file.mimetype.startsWith("image"))
            cb(null, true)
        else
            cb(new BadRequest("Only Images allowed"), false);
    };
    
    return multer({ storage: multerStorage, fileFilter });
    
}

export function uploadSingleImage(fieldName, path) { return multerOptions(path).single(fieldName); }


export function uploadArrayOfImages(arrayOfImages, path) { return multerOptions(path).array(arrayOfImages); } 



// import multer, { memoryStorage as _memoryStorage } from 'multer';
// import { BadRequest } from '../errors';

// const multerOptions = () => {
//     // 1) DisStorage engine
//     // const multerStorage = multer.diskStorage({
//     //     destination: function (req, file, cb) {
//     //         cb(null, 'uploads/categories')
//     //     },
//     //     filename: function (req, file, cb) {
//     //         // category-{id}-Date.now().jpeg
//     //         const ext = file.mimetype.split('/')[1];
//     //         const filename = `category-${uuidv4()}-${Date.now()}.${ext}`;
//     //         cb(null, filename);
//     //     }
//     // });
//     const memoryStorage = _memoryStorage();
//     const fileFilter = async (req, file, cb) => {
//         if (file.mimetype.startsWith("image"))
//             cb(null, true)
//         else
//             cb(new BadRequest("Only Images allowed"), false);
//     };
//     const upload = multer({ storage: memoryStorage, fileFilter });
//     return upload;
// }


// export function uploadSingleImage(fieldName) { return multerOptions().single(fieldName); }


// export function uploadMixOfImages(arrayOfFields) { return multerOptions().fields(arrayOfFields); } 