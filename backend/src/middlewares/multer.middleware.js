import multer from 'multer';
import APIError from '../lib/api-error.lib';
import logger from '../lib/logger.lib';

const storage = multer.memoryStorage();

function fileFilter(req, file, cb) {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/jpg',
  ];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    logger.error('Invalid file type uploaded', {
      label: 'MulterMiddleware',
      fileType: file.mimetype,
    });
    return cb(
      new APIError(400, 'Invalid file type. Only image files are allowed.', {
        type: 'InvalidFileType',
        details: [
          {
            field: 'avatar',
            message:
              'Only image files (jpeg, png, gif, webp, jpg) are allowed.',
          },
        ],
      }),
      false
    );
  }

  cb(null, true);
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2 MB
  },
});

export function uploadSingle(fieldName) {
  return upload.single(fieldName);
}

export function uploadArray(fieldName, maxCount) {
  return upload.array(fieldName, maxCount);
}

export function uploadFields(fields) {
  return upload.fields(fields);
}
