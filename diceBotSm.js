const Discord = require("discord.js")
const client = new Discord.Client()
const Database = require("@replit/database")
const db = new Database()
const fs = require('fs')
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
  if(msg.content.includes("cosa?") || msg.content.includes("che cosa?") ||   msg.content.includes("chi?")){
    msg.channel.send("STOCAZZO", {files: ["https://c.tenor.com/Ww4jX1oirBYAAAAM/marilyn-monroe-sto-cazzo.gif"] });
  }

    if(msg.content.includes("desde moment") || msg.content.includes("Desde moment")){
    msg.channel.send("",{files: ["https://media1.giphy.com/media/Ys2Z1pTvkGhH2/giphy.gif?cid=ecf05e472dmsieqm8s05ytemm4nd1ksupr627gdt7n6hegnd&rid=giphy.gif&ct=g"] });
  }

  if(msg.content.includes("Iago moment") || msg.content.includes("iago moment")){
    msg.channel.send("",{files: ["https://media4.giphy.com/media/eah2loce5T8VW/giphy.gif?cid=ecf05e47ib9c4hq9hligxrq54xei0wvbt05nrixhub5g9zlc&rid=giphy.gif&ct=g"] });
  }

  if(msg.content.includes("Zhao moment") || msg.content.includes("zhao moment")){
    msg.channel.send("",{files: ["https://media1.giphy.com/media/Eld43dWug4rqE/giphy.gif?cid=ecf05e47pg0rn2iosip5tkcr6721vcyxy5tsnk0igxpobp2n&rid=giphy.gif&ct=g"] });
  }
  
  if(msg.content.includes("basito") || msg.content.includes("f4") || msg.content.includes("F4") ){
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

  // if(msg.content.includes("Autobots, assemble!")){
  //   const embed = new Discord.MessageEmbed()
  //    .setTitle('OPTIMUS FIZZ')
  //    .setImage(attachment:"C:\Users\User\Desktop\dani mac\dani\vari\dnd\immagini stupide\optimus fizz.jpg");
  //   console.log(embed);
  //   msg.channel.send({embed});  
  // }
  
  if(msg.content.startsWith('bot') || msg.content.startsWith('Bot') ){
    var message = msg.content.split('bot ');
    var parsedMsg = parseIstruction(msg);
    var msg1 = "**result** " + JSON.stringify(parsedMsg.result);

    //sistemare qua
    if(parsedMsg.success > 0 || parsedMsg.partialSuccess > 0 ){
      if(parsedMsg.partialSuccesses > 0){
        msg1 += "**partialSuccesses** "+ JSON.stringify(parsedMsg.partialSuccesses);
        msg.reply(msg1);
      } else{
        
      }
    /////////////////////////////////////////////////////
           
    }else if(msg.content.includes('chance')){
      msg.reply("**Critical failure**");
    }else if(!msg.content.includes('init')){
      msg.reply("**Fail**");
    }
  }

  if (msg.content  === "ShutDown") {
    msg.channel.send("Shutting down...").then(() => {
      getDBresults()
      client.destroy()
    })
  }

  if(msg.content.includes("Gaia") || msg.content.includes("gaia")){
    msg.channel.send("STA STRONZA", {files: [] });
  }

  if(msg.content.includes("Giove") || msg.content.includes("giove")){
    msg.channel.send("STO STRONZO", {files: [] });
  }

  
})

function rollDice(successValue, partialSuccessValue, diceNumber, explodesOn){
  var i=0;
  var successes = 0;
  var partialSuccesses = 0;
  var results = [];
  
  while(i<diceNumber){
    const randomNumber = Math.round((Math.random() * (3) + 1 + Math.random() * (3) +1)) + 2;
    results.push(randomNumber);
    
    if(randomNumber >= successValue){
      successes++;
    } else if(randomNumber >= partialSuccessValue && randomNumber <= successValue){
      partialSuccesses++;
    }

    if(randomNumber === explodesOn) diceNumber++;
    i++;  
  }
  
  db.get("rolls").then(rolls => {
    rolls.push(
      {
        result: results,
        successes: successes,
        partialSuccesses : partialSuccesses
      }
    )
    db.set("rolls", rolls)
  })

  return {
          result: results,
          successes: successes,
          partialSuccesses : partialSuccesses
  }
}

function rote(successValue, partialSuccessValue, diceNumber, explodesOn){
  var i=0;
  var successes = 0;
  var results = [];
  var reroll = true;
  var partialSuccesses = 0;
  
  
  while(i<diceNumber){
    const randomNumber = Math.round((Math.random() * (3) + 1 + Math.random() * (3) +1)) + 2;
    results.push(randomNumber);
    
    if(randomNumber >= partialSuccessValue){
      if(randomNumber <= successValue){
        partialSuccesses++;
      }else{
        reroll = true;
        successes++;
      }
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
        successes: successes,
        partialSuccesses : partialSuccesses
      }
    )
    db.set("rolls", rolls)
  })

  return {
          result: results,
          successes: successes,
          partialSuccesses : partialSuccesses
  }
  
}

function parseIstruction(msg){
  var message = msg.content.split(' ');
  
  switch (message[1]){
    case 'roll':
      var obj = rollDice(9, 6, message[2], 10);
      console.log('roll ', obj);
      return obj;
     
    case 'rote':
      var obj = rote(9, 6, message[2], 10);
      return obj;
     
   case 'Nagain':
      var obj = rollDice(9, 6,  message[2], 9);
     return obj;
      
   case 'Eagain':
      var obj = rollDice(9, 6, message[2], 8);
      return obj;
      
   case 'init':
      var obj = rollDice(11, 11, 1, 11);
      return obj;
      
   case 'chance':
      var obj = rollDice(11, 11, 1, 11);
      return obj;
  }
}

//WIP
function getDBresults(){
  db.get("rolls").then(rolls => {
    if (rolls.length > 1) {
      fs.writeFile('C:\Users\User\Desktop\test.txt', JSON.stringify(rolls), { flag: 'a+' },  err => {
        if (err) {
          console.error(err)
          return
        }
      })
    } 
    return
  })
}

client.login(process.env.TOKEN)