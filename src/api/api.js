const express = require("express");
const bodyParser = require("body-parser")
require("colors");
require("dotenv").config()
const RegisterDB = require("../database/schemas/register")

const app = express();


const Api = async () => {

    app.use(bodyParser.json())
    app.use(express.static("src/template"))
    app.use(express.urlencoded({ extended: false }))


    app.post("/register", async (req, res) => {
        let id = req.body.id;
        let pass = req.body.pass;
        let email = req.body.email

        let data = RegisterDB.create({
            Id: id,
            email: email,
            password: pass
        });

        (await data).save().catch((e) => {
            console.log(`[ERROR]`.red, `${e.message}`)
        })
        console.log(`[SUCCESS]`.cyan, `DATA SUCCESSFULLY INSERTED IN DATABASE`)

        return res.redirect("login.html");
        
    });

    app.post("/login", async (req, res) => {

        let data = RegisterDB.findOne({
            Id: req.body.id,
            password: req.body.pass,
        });
        data.then((Data) => {
            if(Data) {
                console.log(`[FETCH]`.green, `DATA SUCCESSFULLY FETCHED`);
                return res.redirect("home.html")
            } else {
                console.log(`[ERROR]`.red, `USER NOT DEFIND!`);
                return res.redirect("login.html")
            }
        })

    });


    app.listen(process.env.PORT, () => {
        console.log(`[SERVER]`.yellow, `http://localhost:${process.env.PORT}`)
    });

    app.get("/", (req, res) => {
        res.set({
            "ALLOW-access-ALLOW-Origin": "*"
        });
        return res.redirect('register.html');
    });
}


module.exports = Api;