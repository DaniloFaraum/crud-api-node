
import bodyParser from "body-parser";
import express from "express";
import sql from "msnodesqlv8";

const app = express();
app.use(bodyParser.json())

const PORT = 3000
const connectionString = "server=DSN1191109159;Database=carros;Trusted_Connection=Yes;Driver= {Sql Server Native Client 11.0}";

//Leitura

app.route('/carros')
    .get((req,res) => {
        sql.query(connectionString,"SELECT * FROM carro", (err, rows) =>{
            if(err){
                res.status(500).json("Internal Server Error");
            } else{
                res.status(200).json(rows);
            }         
        });
    })
    .post((req, res) =>{
        sql.query(connectionString, `INSERT INTO carro VALUES (${req.body.CarroID}, '${req.body.modelo}', '${req.body.marca}');`, (err, rows) =>{
            if(err){
                res.status(500).json("Internal Server Error");
                console.log(err);
            } else{
                res.status(200).json('Success!');
            }
        })
    })

app.route('/carros/:id')
    .delete((req, res) =>{
        const id = req.params.id
        //const id = req.body.CarroID
        sql.query(connectionString, `DELETE FROM carro WHERE CarroID = ${id};`, (err, rows) =>{
            if(err){
                res.status(500).json("Internal Server Error");
                console.log(err);
            } else{
                res.status(200).json('Success!');
            } 
        })
    })

    .put((req, res) =>{
        const id = req.params.id
        sql.query(connectionString, `UPDATE carro SET modelo = ${req.body.modelo}, marca= ${req.body.marca} WHERE CarroID = ${id};`, (err, rows) =>{
            if(err){
                res.status(500).json("Internal Server Error");
                console.log(err);
            } else{
                res.status(200).json('Success!');
            } 
        })
    })


app.listen(PORT, ()=> console.log(`Server Rodando na porta ${PORT}`));

