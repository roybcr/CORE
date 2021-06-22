import { Resolver, Mutation, Arg } from 'type-graphql';
import { createWriteStream } from 'fs';
import { Upload } from '../../../../types/Upload';
import { GraphQLUpload } from 'graphql-upload';

@Resolver()
export class ProfileResolver {
  @Mutation(() => Boolean)
  async addProfilePicture(
    @Arg('picture', () => GraphQLUpload)
    { createReadStream, filename }: Upload
  ): Promise<boolean> {
    return new Promise((resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(__dirname + `/images/${filename}`))
        .on('finish', () => resolve(true))
        .on('error', () => reject(false))
    );
  }
}
