import {
    DataTypes as DT
    // Exception as X
}                                             from '../../packages.mjs';
// import config                                 from '../config.cjs';
import Base                                   from './Base.js';


class Talk extends Base {
    static schema = {
        id          : { type: DT.INTEGER, autoIncrement: true, primaryKey: true },
        title       : { type: DT.STRING, allowNull: false  },
        description : { type: DT.TEXT, defaultValue: '' }
    };

    static async create(data, files) {
        const talk = await super.create(data);

        if (files && files.poster) {
            await talk.setPoster(files.poster);
        }

        return talk;
    }

    async setPoster({
        // buffer,
        // originalname,
        // mimetype
    }) {
        // const extention      = path.extname(originalname);
        // const remoteFileName = `${uuid.v4()}${extention}`;
        // const params = {
        //     Bucket       : BucketName,
        //     Key          : `images/talks/${remoteFileName}`,
        //     Body         : buffer,
        //     ContentType  : mimetype,
        //     CacheControl : cacheControlHeader
        // };

        // try {
        //     const data = await s3.uploadAsync(params);

        //     await this.update({ posterUrl: data.Key });

        //     return { posterUrl: this.posterUrl };
        // } catch (error) {
        //     throw new X({
        //         code   : 'FAILED_TO_DOWNLOAD',
        //         fields : {
        //             file : 'FAILED_TO_DOWNLOAD'
        //         }
        //     });
        // }
    }
}

export default Talk;
