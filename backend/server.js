const express = require('express'); // acces a expres
const cors = require("cors"); // permet aux différents serveurs d'échanger entre eux
const mysql= require("mysql");

const app = express(); // permet d'utiliser les méthodes de l'objet Express dans notre variable app

const corsOptions = {
    origin : [
        'http://localhost:3000',
        'http://localhost:8081',
    ],
    optionsSuccessStatus: 200,
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    headers: 'Content-type, Authorization',
    credentials: true, // Autorise l'envoi des cookies par requetes
}
app.use(express.json( )); // Permet d'interpréter les données envoyés par un form ou une API

app.use(cors(corsOptions)); // Ajoute les parametres de securité pour les requetes cross origines

const database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crudnode'
})

// app.get("/", (req, res) => { //creer un endpoint a l'adresse "/", ensuite il attends une requete et une reponse
//     res.json("salut man from backend"); //en reponse on envoi un message
// })
app.get("/", (req, res) => {
    const sql = "SELECT * FROM user"; // créé la requete sql pour récupérer les infos de la table users
    database.query(sql, (err, data)=>{ // foncton de rappel qui prend deux arguments, erreurs et data
        if(err) return res.json("Error"); // si la condition est vraie, on execute le reste du code
        return res.json(data);
    })
})

app.post("/create", (req, res) => {
    const sql = "INSERT INTO user (name, email) VALUES (?)";  // création de la requete sql pour ajouter une ligne à la table students avec comme paramètres
    const values = [
        req.body.name,
        req.body.email
    ]
    database.query(sql, [values], (err, data)=>{ 
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.put("/update/:id", (req, res) => {
    const sql = "UPDATE user SET name = ?, email = ? WHERE id = ?"; 
    const values = [
        req.body.name,
        req.body.email,
    ] 
    const id = req.params.id;
    database.query(sql, [...values, id], (err, data)=>{ 
        if(err) return res.json("Error");
        return res.json(data);
    })
})
app.delete("/user/:id", (req, res) => {
    const sql = "DELETE FROM user WHERE id = (?)"; 
    const id = req.params.id;
    database.query(sql, [id], (err, data)=>{ 
        if(err) return res.json("Error");
        return res.json(data);
    })
})



app.listen(8081, ()=> {
    console.log("Server is running on port 8081"); // attribue un port au serveur et execute une fonction anonyme listen
})
