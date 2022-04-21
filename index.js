const Discord = require("discord.js")
const client = new Discord.Client()
const Database = require("@replit/database")
const db = new Database()

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
  if (msg.content.includes("ping")) {
    msg.reply("pong");
  }

  if(msg.content.includes("cosa?") || msg.content.includes("che cosa?") || msg.content.includes("chi?")){
    msg.channel.send("STOCAZZO", {files: ["https://c.tenor.com/Ww4jX1oirBYAAAAM/marilyn-monroe-sto-cazzo.gif"] });
  }
  

  if(msg.content.startsWith('bot')){
    var message = msg.content.split('bot ');
    var parsedMsg = parseIstruction(msg);
    msg.reply("result ${parsedMsg.result}\nSuccesses ${parsedMsg.successes}\n");
  }
})


function rollDice(successValue, diceNumber, explodesOn){
  var i=0;
  var successes = 0;
  var results = [];
  
  while(i<diceNumber){
    const randomNumber = Math.round((Math.random() * (3) + 1 + Math.random() * (3) +1)) + 2;
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

function rote(successValue, diceNumber, explodesOn){
  var i=0;
  var successes = 0;
  var results = [];
  var reroll = true;
  
  while(i<diceNumber){
    const randomNumber = this.dice + this.dice + 2;
    results.push(randomNumber);
    
    if(randomNumber >= successValue){
      reroll = true;
      successes++;
      
    }else if(reroll){
      reroll = false;
      diceNumber++;
    }
    
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

// function Eagain(){
  
// }

// function Nagain(){
  
// }

function parseIstruction(msg){
  var message = msg.content.split(' ');
  console.log(message);

  switch (message[1]){
    case 'roll':
      var obj = rollDice(9, message[2], 10);
      console.log('roll ', obj);
      return obj;
     
    case 'rote':
      var obj = rote(9, message[2], 10);
      return obj;
     
   case 'Nagain':
      var obj = rollDice(9, message[2], 10);
     return obj;
      
   case 'Eagain':
   case 'init':
   case 'chance':
  }
}

client.login(process.env.TOKEN)