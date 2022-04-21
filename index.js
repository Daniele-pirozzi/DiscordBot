const Discord = require("discord.js")
const client = new Discord.Client()
const Database = require("@replit/database")
const db = new Database()
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

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

client.on("ready", msg => {
  console.log(`Logged in as ${client.user.tag}!`)
})

// client.on('interactionCreate', async interaction => {
// 	if (!interaction.isCommand()) return;

// 	if (interaction.commandName === 'ping') {
// 		const row = new MessageActionRow()
// 			.addComponents(

        
// 			);

// 		const embed = new MessageEmbed()
// 			.setColor('#0099ff')
// 			.setTitle('Some title')
// 			.setDescription();

// 		await interaction.reply({ content: {} , ephemeral: true, embeds: [embed], components: [row] });
// 	}
// });

client.on("message", msg => {
  if(msg.content.includes("cosa?") || msg.content.includes("che cosa?") || msg.content.includes("chi?")){
    msg.channel.send("STOCAZZO", {files: ["https://c.tenor.com/Ww4jX1oirBYAAAAM/marilyn-monroe-sto-cazzo.gif"] });
  }

  if(msg.content.includes("clara moment") || msg.content.includes("Clara moment")){
    msg.channel.send("",{files: ["https://c.tenor.com/EaGblD_u2BAAAAAC/tefacciocorca-corcare.gif"] });
  }

  if(msg.content.includes("basito") || msg.content.includes("f4")){
    msg.channel.send("",{files: ["https://c.tenor.com/eU8TztSCXysAAAAC/f4basito-boris.gif"] });    
  }

  if(msg.content.includes("kyne") ||
      msg.content.includes("loric") || 
      msg.content.includes("varination")||
      msg.content.includes("nage") ||
      msg.content.includes("dorcelnessness") ||
      msg.content.includes("harfam"))
  {
    msg.channel.send("",{files: ["https://i.kym-cdn.com/photos/images/newsfeed/002/206/828/c67.jpg"] });   
  }

  if(msg.content.includes("pacchetto")){
    msg.channel.send("è fisicamente un ...",{files: ["https://c.tenor.com/LMgcm-AwNKsAAAAS/frustrated-yelling.gif"] });  
  }
  
  if(msg.content.startsWith('bot')){
    var message = msg.content.split('bot ');
    var parsedMsg = parseIstruction(msg);
    
    var msg1 = JSON.stringify(parsedMsg.result);
    console.log(msg1);
    msg.reply("**result** " + msg1);

    if(parsedMsg.successes > 0 ){
      msg1 = JSON.stringify(parsedMsg.successes);
      console.log(msg1);
      msg.reply("**successes** " + msg1);
      
    }else if(msg.content.includes('chance')){
      msg.reply("**Critical failure**");
    }else if(!msg.content.includes('init')){
      msg.reply("**Fail**");
    }
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

function rote(successValue, diceNumber, explodesOn){
  var i=0;
  var successes = 0;
  var results = [];
  var reroll = true;
  
  while(i<diceNumber){
    const randomNumber = Math.round((Math.random() * (3) + 1 + Math.random() * (3) +1)) + 2;
    results.push(randomNumber);
    
    if(randomNumber >= successValue){
      reroll = true;
      successes++;
      
    }else if(reroll){
      reroll = false;
      diceNumber++;
    }else{
      reroll = true;
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

function parseIstruction(msg){
  var message = msg.content.split(' ');
  
  switch (message[1]){
    case 'roll':
      var obj = rollDice(9, message[2], 10);
      console.log('roll ', obj);
      return obj;
     
    case 'rote':
      var obj = rote(8, message[2], 10);
      return obj;
     
   case 'Nagain':
      var obj = rollDice(9, message[2], 9);
     return obj;
      
   case 'Eagain':
      var obj = rollDice(8, message[2], 8);
      return obj;
      
   case 'init':
      var obj = rollDice(11, 1, 11);
      return obj;
      
   case 'chance':
      var obj = rollDice(11, 1, 11);
      return obj;
  }
}

function printDbFile(){
  
}

client.login(process.env.TOKEN)