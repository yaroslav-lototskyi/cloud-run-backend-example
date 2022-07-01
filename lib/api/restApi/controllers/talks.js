import keyBy       from 'lodash/keyBy.js';
import chista      from '../chista.js';
import TalksCreate from '../../../use-cases/talks/Create.js';
import TalksList   from '../../../use-cases/talks/List.js';
import TalksShow   from '../../../use-cases/talks/Show.js';

export default {
    create : chista.makeServiceRunner(TalksCreate, req => ({ data: { ...req.body }, files: keyBy(req.files || [], 'fieldname') })),
    list   : chista.makeServiceRunner(TalksList, req => ({ ...req.query, ...req.params })),
    show   : chista.makeServiceRunner(TalksShow, req  => ({ id: req.params.id }))
};
