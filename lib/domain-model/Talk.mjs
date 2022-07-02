import path                     from 'path';
import { v4 }                   from 'uuid';
import {
    DataTypes as DT,
    Exception as X
}                               from '../../packages.mjs';
import s3client, { BucketName } from '../infrastructure/s3.mjs';
import Base                     from './Base.mjs';


class Talk extends Base {
    static schema = {
        id          : { type: DT.INTEGER, autoIncrement: true, primaryKey: true },
        title       : { type: DT.STRING, allowNull: false  },
        description : { type: DT.TEXT, defaultValue: '' },
        posterUrl   : { type: DT.STRING, defaultValue: '' }
    };

    static async create(data, files) {
        const talk = await super.create(data);

        if (files && files.poster) {
            await talk.setPoster(files.poster);
        }

        return talk;
    }

    async setPoster({
        buffer,
        originalname,
        mimetype
    }) {
        const extention      = path.extname(originalname);
        const remoteFileName = `${v4()}${extention}`;
        const params = {
            Bucket      : BucketName,
            Key         : `images/${remoteFileName}`,
            Body        : buffer,
            ContentType : mimetype
        };

        try {
            const data = await s3client.uploadAsync(params);

            await this.update({ posterUrl: data.Key });

            return { posterUrl: this.posterUrl };
        } catch (error) {
            console.error(error);
            throw new X({
                code   : 'FAILED_TO_UPLOAD',
                fields : {
                    file : 'FAILED_TO_UPLOAD'
                }
            });
        }
    }
}

export default Talk;
