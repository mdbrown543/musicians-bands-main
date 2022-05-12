const {Band} = require('./Band')
const {Musician} = require('./Musician')

//one-to-many relationship
Band.hasMany(Musician)
Musician.belongsTo(Band,{
    foreignKey: 'bandId'
  });

module.exports = {
    Band,
    Musician
};
