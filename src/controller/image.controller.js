import { AppError } from '../models/error.model.js';
import ImageRepository from '../repository/image.repository.js';
import { uploadImageToCloudinary } from '../services/cloundinary.service.js';

class ImageControll {
  async createImage(data) {
    try {
      const dinaryResult = await uploadImageToCloudinary(data.url, 'products');
      if (!dinaryResult) throw new AppError('Upload image fail');
      const result = await ImageRepository.create({
        url: dinaryResult,
      });
      return result;
    } catch (error) {
      console.log(error.toString());
    }
  }
}

const ImageController = new ImageControll();
export default ImageController;
