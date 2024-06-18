import { Module, Global } from '@nestjs/common';
import * as cloudinary from 'cloudinary';

@Global()
@Module({
  providers: [
    {
      provide: 'CLOUDINARY_INSTANCE',
      useFactory: () => {
        cloudinary.v2.config({
          cloud_name: process.env.CLOUD_NAME,
          api_key: process.env.CLOUDINARY_API_KEY,
          api_secret: process.env.CLOUDINARY_API_SECRET,
          secure: true,
        });
        return cloudinary.v2;
      },
    },
  ],
  exports: ['CLOUDINARY_INSTANCE'],
})
export class CloudinaryConfigModule {}
