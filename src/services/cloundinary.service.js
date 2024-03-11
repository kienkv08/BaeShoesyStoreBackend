import cloudinaryConfig from '../config/cloundinary.config.js';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config(cloudinaryConfig);

const uploadImageToCloudinary = async (imagePath, folder) => {
  const result = await cloudinary.uploader.upload(imagePath, {
    folder: folder,
  });

  return result.secure_url;
};

const deleteImageFromCloudinary = async (publicUrl, folder) => {
  const publicId = getPublicIdFromUrl(publicUrl);

  if (!publicId) {
    throw new AppError('Invalid public URL');
  }

  const result = await cloudinary.uploader.destroy(folder ? folder + '/' + publicId : publicId);
  if (result.result === 'ok') {
    return { message: 'Image deleted successfully' };
  } else {
    throw new AppError('Delete image cloudinary failed');
  }
};

const getPublicIdFromUrl = (publicUrl) => {
  const parts = publicUrl.split('/');
  const filename = parts[parts.length - 1];

  const filenameParts = filename.split('.');
  if (filenameParts.length === 2) {
    return filenameParts[0];
  }

  return null;
};

export { getPublicIdFromUrl, deleteImageFromCloudinary, uploadImageToCloudinary };
