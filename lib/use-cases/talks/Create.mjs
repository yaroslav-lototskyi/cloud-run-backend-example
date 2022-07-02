import { dumpTalk } from '../utils/dumps.mjs';
import Talk         from '../../domain-model/Talk.mjs';
import UseCaseBase  from '../Base.mjs';

export default class TalksCreate extends UseCaseBase {
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

    async execute({ data, files }) {
        const talk = await Talk.create(data, files);

        return { data: dumpTalk(talk) };
    }
}
