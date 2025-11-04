const express = require('express')
const app = express();
const PORT = 3000;
const db = require("./model");
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.listen(PORT, () => {
    console.log('Server started on port 3000');
})

db.sequelize.sync()
    .then((result) => {
        app.listen(3000, () => {
            console.log('Server Started');
        })
    })
    .catch((err) => {
        console.log(err);
    })

app.post("/film", async (req, res) => {
    const data = req.body;
    try {
        const film = await db.film.create(data);
        res.status(201).send({
            message: "Film berhasil ditambahkan!",
            film: film
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            message: "Terjadi kesalahan pada server",
            error: err.message
        });
    }
});



app.get('/film', async (req, res) => {
    try {
        const film = await db.film.findAll();
        res.send(film);
    }
    catch (err) {
        res.send(err);
    }
});

app.put('/film/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    try {
        const film = await db.film.findByPk(id);

        if (!film) {
            return res.status(404).send({ message: 'Film tidak ditemukan' });
        }

        await film.update(data);
        res.status(200).send({
            message: 'film berhasil diupdate',
            film: film
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            message: 'Terjadi kesalahan pada server',
            error: err.message
        });
    }
});




app.delete('/film/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const film = await db.film.findByPk(id);
        if (!film) {
            return res.status(404).send({ message: 'film tidak ditemukan untuk dihapus' });
        }
        await film.destroy();
        res.send({ message: 'film berhasil dihapus' });
    } catch (err) {
        res.status(500).send
    }
});
