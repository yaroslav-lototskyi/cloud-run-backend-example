import Sequelize from 'sequelize';

class Base extends Sequelize.Model {
    static init(sequelize, options = {}) {
        super.init(this.schema, { ...options, sequelize });
    }

    static initRelationsAndHooks() {
        if (this.initRelations) this.initRelations();
        if (this.initHooks) this.initHooks();
    }
}

export default Base;
