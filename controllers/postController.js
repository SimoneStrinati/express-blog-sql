const dbConnection = require("../data/db")


const controllers = {

    index: function (req, res) {


        const sqlQuery = "SELECT * FROM posts";

        dbConnection.query(sqlQuery, (error, rows) => {
            if (error) {
                return res.status(500).json({ error: "Database Error", message: 'Errore di richiesta al DB' })
            }

            let results = rows;

            // if (req.query.tags) {
            //     results = rows.filter(post => post.tags.find(tag => tag.toLowerCase() === req.query.tags.toLowerCase()));
            // }  
            // Per ora non serve perché non abbiamo ancora il dato "tag", ma sarà utile a cose fatte una volta fatta la relazione tra tabelle

            res.json(results);
        })
    },

    show: function (req, res) {
        const id = Number(req.params.id);

        const risultato = posts.find(post => post.id == id)

        if (!risultato) {
            res.status(404).json({ error: "Not Found", message: "Post non trovato" });
        }

        res.json(risultato);
    },

    store: function (req, res) {
        // console.log(req.body);

        const newId = Math.max(0, ...posts.map(post => post.id)) + 1;

        const newPost = {
            id: newId, //l'ID non dobbiamo scriverlo noi in realtà, perché sarà il database a crearlo per noi.
            title: req.body.title,
            content: req.body.content,
            image: req.body.image,
            tags: req.body.tags
        };

        posts.push(newPost);

        res.status(201).json(newPost)
    },

    update: function (req, res) {

        const id = Number(req.params.id);

        const risultato = posts.find(post => post.id == id)

        if (!risultato) {
            return res.status(404).json({ error: "Not Found", message: "Post non trovato" });
        }

        risultato.title = req.body.title;
        risultato.content = req.body.content;
        risultato.image = req.body.image;
        risultato.tags = req.body.tags

        res.json(risultato);


    },

    modify: function (req, res) {

        const id = Number(req.params.id);

        const risultato = posts.find(post => post.id == id)

        if (!risultato) {
            return res.status(404).json({ error: "Not Found", message: "Post non trovato" });
        }

        const allowedProperties = ["title", "content", "image", "tags"]

        for (const propertyName of allowedProperties) {
            if (req.body[propertyName] !== undefined) {
                risultato[propertyName] = req.body[propertyName]
            }
        }

        res.json(risultato);

    },

    destroy: function (req, res) {

        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ error: "User Error", message: "Id non valido" })
        }

        const sqlQuery = "DELETE FROM posts WHERE id = ?";
        const queryParam = [id];

        dbConnection.query(sqlQuery, queryParam, error => {
            if (error) {
                res.status(500).json({ errore: "Database Error", message: "Impossibile eliminare post ${id}" })
            }

            return res.sendStatus(204);
        });
    }

};

module.exports = controllers;

