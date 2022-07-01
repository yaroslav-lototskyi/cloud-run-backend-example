import { Exception as X } from '../../../packages.mjs';
import Talk               from '../../domain-model/Talk';
import { dumpTalk }       from '../utils/dumps';


export default class TalksShow {
    static validationRules = {
        id : [ 'required' ]
    };

    async run({ id }) {
        const existingTalk = await Talk.findOne({ where : {
            id
        } });

        if (!existingTalk) {
            throw new X({
                code   : 'WRONG_ID',
                fields : { id: 'WRONG_ID' }
            });
        }

        return { data: dumpTalk(existingTalk) };
    }
}
