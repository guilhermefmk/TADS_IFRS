import { uploadFile } from '../aws/S3.js';

export const uploadToS3 = async (file) => {
    try {
        return await uploadFile(file);
    } catch (error) {
        console.error(error);
        throw new Error('Error uploading file to S3');
    }
};
