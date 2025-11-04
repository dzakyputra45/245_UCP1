
module.exports = (sequelize, DataTypes) => {
    const film = sequelize.define("film", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Nama_film: { 
            type: DataTypes.STRING
        },
        Deskripsi: {
            type: DataTypes.STRING
        },
        Sutradara: {
            type: DataTypes.STRING
        },
        Tahun_terbit: {
            type: DataTypes.INTEGER
        },
        Genre_: {
            type: DataTypes.STRING
        }
    });
    return film;
}

