const {Band} = require('./Band')
const {Musician} = require('./Musician')
const {Song} = require('./Song')

//one-to-many relationship
Band.hasMany(Musician)
Musician.belongsTo(Band,{
    foreignKey: 'bandId'
  });
//many-to-many relationship
Band.belongsToMany(Song,{through: "band_songs"});
Song.belongsToMany(Band,{through: "band_songs"});

module.exports = {
    Band,
    Musician,
    Song
};
