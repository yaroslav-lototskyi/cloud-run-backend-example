import keyBy       from 'lodash/keyBy.js';
import chista      from '../chista.mjs';
import TalksCreate from '../../../use-cases/talks/Create.mjs';
import TalksList   from '../../../use-cases/talks/List.mjs';
import TalksShow   from '../../../use-cases/talks/Show.mjs';

export default {
    create : chista.makeServiceRunner(TalksCreate, req => ({ data: { ...req.body }, files: keyBy(req.files || [], 'fieldname') })),
    list   : chista.makeServiceRunner(TalksList, req => ({ ...req.query, ...req.params })),
    show   : chista.makeServiceRunner(TalksShow, req  => ({ id: req.params.id }))
};
