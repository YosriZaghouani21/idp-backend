import { UserRepository } from '../output/userRepository.interface';
import { UserM } from 'src/User/domain/model/user';
import { v2 as cloudinary } from 'cloudinary';

export class UploadimageUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async upload(
    userId: string,
    file: any,
  ): Promise<{ url: string; user: UserM }> {
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: `uploads/${userId}` },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      );
      uploadStream.end(file.buffer);
    });

    const fileUrl = (result as any).secure_url;

    const updatedUser = await this.userRepository.update(userId, {
      image: fileUrl,
    });
    return {
      url: fileUrl,
      user: updatedUser,
    };
  }
}
