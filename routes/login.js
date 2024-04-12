const express=require('express')
const fs=require('fs')
const routes=express.Router();
const path=require('path')
const bodyParser=require('body-parser')
routes.use(bodyParser.urlencoded({ extended: false }));

routes.get("/login", (req, res) => {
    res.send('<form action="/user" method="post"><label for="user">Username</label><br><input name="user" type="text"> <button type="submit">Login</button></form>');
});

routes.post("/user", (req, res) => {
    const  username  = req.body.user;
    res.redirect(`/?username=${username}`);
});

routes.get("/", (req, res) => {
    const username = req.query.username;
    const filepath = path.join(__dirname, "../message.txt");
    var ht;
    fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading messages:", err);
            res.status(500).send("Error reading messages");
        } else {
            // Split messages by newline character and display them
            const messages = data.split('\n').filter(message => message.trim() !== '');
            const messageList = messages.map(message => `<li>${message}</li>`).join('');
             ht = `<h1>Messages</h1><ul>${messageList}</ul>`;
             res.send(`${ht} <br><form action="/mes?username=${username}" method="post"><label for="message">Message</label><br><input name="message" type="text"> <button type="submit">Enter</button></form>`);
            }
        })
   
});

routes.post("/mes", (req, res) => {
    const username = req.query.username;
    const message = req.body.message;
    const filepath = path.join(__dirname, "../message.txt");
    const data = `${username}: ${message}\n`;
    fs.appendFile(filepath, data, (err) => {
        if (err) {
            console.error("Error appending the message:", err);
            res.status(500).send("Error appending the message");
        } else {
            console.log("Message appended successfully.");
            res.redirect(`/?username=${username}`);
        }
    });
});

module.exports = routes;