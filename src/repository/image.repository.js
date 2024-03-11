import Image from '../models/image.model.js';

class ImageRepo {
  async create(data) {
    try {
      const newImage = await Image.create({ ...data });
      return newImage.toObject();
    } catch (error) {
      console.log(error.toString());
    }
  }
}

const ImageRepository = new ImageRepo();
export default ImageRepository;
