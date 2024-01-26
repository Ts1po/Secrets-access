import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path";
import {fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(express.static("public"));

var userAuthorisation = false;

app.use(bodyParser.urlencoded({extended: true}));

function authorisation(req, res, next) {
    const password = req.body["password"];
    if(password == "JustSomething") {
        userAuthorisation = true;
    }
    next();
}

app.use(authorisation);


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
    if(userAuthorisation) {
        res.sendFile(__dirname + "/public/secret.html");
    } else {
        res.redirect("/");
    }
    
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});