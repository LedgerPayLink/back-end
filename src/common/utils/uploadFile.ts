import { BadRequestException } from '@nestjs/common';
import { ErrorCode, MulterError } from 'multer';
import path, { extname, resolve } from 'path';
import { JwtPayload } from 'src/auth/types';

export const allowedFileExtensions = ['.jpg', '.png', '.jpeg', '.png'];
export enum FileValidationErrors {
  UNSUPPORTED_FILE_TYPE,
}

var errorMessages = {
  UNSUPPORTED_FILE_TYPE: `Only images are allowed. Accepted file extensions are: ${allowedFileExtensions.toString()}`,
};

export const imageFileFilter = (req, file, callback) => {
  const extension = path.extname(file.originalname);
  if (allowedFileExtensions.includes(extension.toLowerCase())) {
    callback(null, true);
  } else {
    // provide the validation error in the request
    setFileUploadErrorToReq(req, errorMessages.UNSUPPORTED_FILE_TYPE);
    return callback(null, false);
  }
};

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};

export const editAvatarFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  callback(null, `avatar-${name}${fileExtName}`);
};

export const getUserIdFromRequest = (req) => {
  const user = req.user as JwtPayload;
  return user.sub;
};

export const destinationFile = (req, file, callback) => {
  //   const userId = getUserIdFromRequest(req);
  return callback(null, resolve('.', 'files'));
};

////////////////////////////////////// SPECIFIC ERRORS /////////////////////////////////////

export const setFileUploadErrorToReq = (req: any, message: string) => {
  req.fileValidationError = true;
  req.fileValidationErrorMessage = message;
};

export const handleFileUploadErrors = (req: any) => {
  if (req.fileValidationError) {
    // if so, throw the BadRequestException
    throw new BadRequestException(req.fileValidationErrorMessage);
  }
};
