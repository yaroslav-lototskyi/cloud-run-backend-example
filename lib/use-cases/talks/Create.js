import { dumpTalk } from '../utils/dumps.js';
import Talk         from '../../domain-model/Talk';

export default class TalksCreate {
    static validationRules = {
        data : [ 'required', { 'nested_object' : {
            title       : [ 'required', 'string' ],
            description : [ 'string' ]
        } } ],
        files : [ { 'nested_object' : {
            poster : [ { 'nested_object' : {
                originalname : [ 'required', 'string', 'trim' ],
                mimetype     : [ 'required', 'string', { 'one_of': [ 'image/png', 'image/jpeg', 'image/svg+xml', 'image/jpg' ] } ],
                buffer       : [ 'required' ]
            } } ]
        } } ]
    };

    async run({ data, files }) {
        const talk = await Talk.create(data, files);

        return { data: dumpTalk(talk) };
    }
}
