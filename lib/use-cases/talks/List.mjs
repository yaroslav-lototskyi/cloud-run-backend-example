
import Talk         from '../../domain-model/Talk.mjs';
import { dumpTalk } from '../utils/dumps.mjs';

const DEFAULT_LIMIT  = 20;
const DEFAULT_OFFSET = 0;

export default class TalksList {
    static validationRules = {
        limit    : [ 'positive_integer' ],
        offset   : [ 'integer', { 'min_number': 0 } ],
        sortedBy : [ { 'one_of': [ 'id', 'createdAt', 'updatedAt' ] } ],
        order    : [ { 'one_of': [ 'ASC', 'DESC' ] } ]
    };

    async run({
        limit        = DEFAULT_LIMIT,
        offset       = DEFAULT_OFFSET,
        sortedBy     = 'createdAt',
        order        = 'DESC'
    }) {
        const dbRequest = {
            order : [ [ sortedBy, order ] ],
            limit,
            offset
        };

        const [ existingTalks, totalCount ] = await Promise.all([
            Talk.findAll(dbRequest),
            Talk.count(dbRequest)
        ]);

        const data = existingTalks.map(dumpTalk);

        return {
            data,
            meta : {
                totalCount,
                limit,
                offset
            }
        };
    }
}
