import { Exception as X } from '../../../packages.mjs';
import Talk               from '../../domain-model/Talk.mjs';
import { dumpTalk }       from '../utils/dumps.mjs';


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
