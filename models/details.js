const DataTypes = require('sequelize/lib/data-types');

module.exports = (sequelize, type) => {
    return sequelize.define('details', {
        id: {
          type: type.STRING,
          primaryKey: true
        },
        title: type.STRING,
        authors: type.STRING,
        publisher: type.STRING,
        publication_date: type.STRING,
        language: type.STRING,
        subjects:  DataTypes.ARRAY(DataTypes.TEXT),
        license_rights: type.STRING,
    },
    {
        indexes: [
            {
                unique: false,
                fields: ['title', 'authors', 'publication_date']
            }
        ]
    });
}