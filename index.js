const Discord = require("discord.js")
const client = new Discord.Client()
const Database = require("@replit/database")
const db = new Database()
var dice = Math.floor(Math.random() * 4);

db.get("rolls").then(rolls => {
  if (!rolls || rolls.length < 1) {
    db.set("rolls", [])
  }  
})

db.get("responding").then(value => {
  if (value == null) {
    db.set("responding", true)
  }  
})

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", msg => {
  if (msg.content === "ping") {
    msg.reply("pong");
  }

  
})

function rollDice(maxValue, successValue, diceNumber, explodesOn){
  var i=0;
  var successes = 0;
  var results = [];
  
  while(i<diceNumber){
    const randomNumber = this.dice + this.dice + 2;
    results.push(randomNumber);
    
    if(randomNumber >= successValue) successes++;
    if(randomNumber === explodesOn) diceNumber++;
    i++;  
  }
  
  db.get("rolls").then(rolls => {
    rolls.push(
      {
        result: results,
        successes: successes
      }
    )
    db.set("rolls", rolls)
  })

  return {
          result: results,
          successes: successes
        }
}

// function chance(){
  
// }

// function rote(){
  
// }

// function Eagain(){
  
// }

// function Nagain(){
  
// }

// function parseIstruction(msg){
//   var message = msg.content.split("!");
  
//   for(index in message){
//    switch{
//      case 'roll'
//      case 'rote'
//      case 'Nagain'
//      case 'Eagain'
//      case 'init'
//      case 'chance'

//      case 
//     }
//   }
// }

client.login(process.env.TOKEN)