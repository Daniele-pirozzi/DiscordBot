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

client.on('interactionCreate', async interaction => {
  
  const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

  collector.on('collect', async buttonMessage => {
  	if (buttonMessage.customId === 'first') {
  		await i.update({ content: 'A button was clicked!', components: [] });
  	}else if (buttonMessage.customId === 'second'){
  		await i.update({ content: 'A button was clicked!', components: [] });  
    }else if(buttonMessage.customId === 'third'){
  		await i.update({ content: 'A button was clicked!', components: [] });
    }else if(buttonMessage.customId === 'fourth'){
  		await i.update({ content: 'A button was clicked!', components: [] });
    }
  });
  
  // if(interaction.isButton &&  ){
  
  // }

	// if (interaction.commandName === 'decide') {
	// 	const row = new MessageActionRow()
	// 		.addComponents(
	// 			new MessageButton()
	// 				.setCustomId('first')
	// 				.setLabel('Iago Moment')
	// 				.setStyle('PRIMARY'),
	// 		)
 //      .addComponents(
	// 			new MessageButton()
	// 				.setCustomId('second')
	// 				.setLabel('Clara Moment')
	// 				.setStyle('PRIMARY'),
	// 		)
 //      .addComponents(
 //        new MessageButton()
 //          .setCustomId('third')
 //          .setLabel('Desde Moment')
 //          .setStyle('PRIMARY'),
	// 		)
 //      .addComponents(
 //        new MessageButton()
 //          .setCustomId('fourth')
 //          .setLabel('Zhao Moment')
 //          .setStyle('PRIMARY'),
 //  		)
	// 	await interaction.reply({ content: 'SELECT appropiate reaction', ephemereal : true, components: [row]});
	// }

  if (interaction.commandName === 'DELETE DATABASE') {
    const row = new MessageActionRow()
			.addComponents(
        new MessageButton()
          .setCustomId('delete')
          .setLabel('Delete')
          .setStyle('DELETE'),
  		)
      .addComponents(
        new MessageButton()
          .setCustomId('cancel')
          .setLabel('Cancel')
          .setStyle('PRIMARY'),
  		)
    await interaction.reply({ content: 'ARE YOU SURE?', ephemereal : true, components : [row]})
  }
  
});

client.on("message", msg => {
  if(msg.content.includes("cosa?") || msg.content.includes("che cosa?") || msg.content.includes("chi?")){
    msg.channel.send("STOCAZZO", {files: ["https://c.tenor.com/Ww4jX1oirBYAAAAM/marilyn-monroe-sto-cazzo.gif"] });
  }

  if(msg.content.includes("clara moment") || msg.content.includes("Clara moment")){
    msg.channel.send("",{files: ["https://c.tenor.com/EaGblD_u2BAAAAAC/tefacciocorca-corcare.gif"] });
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

  if (msg.content.includes("campanella") || msg.content.includes("mutande") || msg.content.includes("ding dong")){
    msg.channel.send("",{files: ["https://m.media-amazon.com/images/I/31ntnn2FXvL._AC_.jpg"] });
  }

  if(msg.content.includes("pacchetto")){
    msg.channel.send("è fisicamente un ...",{files: ["https://c.tenor.com/LMgcm-AwNKsAAAAS/frustrated-yelling.gif"] });  
  }
  
  if(msg.content.startsWith('bot') || msg.content.startsWith('Bot')){
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
      var obj = rollDice(8, message[2], 10);
      console.log('roll ', obj);
      return obj;
     
    case 'rote':
      var obj = rote(8, message[2], 10);
      return obj;
     
   case 'Nagain':
      var obj = rollDice(8, message[2], 9);
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

function deleteDB(){
  db.list()
    .then(keys => {
      keys.forEach(key => {
        db.delete(key)
      })
    });
  
  db.get("rolls").then(rolls => {
    if (!rolls || rolls.length < 1) {
      db.set("rolls", [])
    }  
  })
}

function getDBresults(){
  db.get("rolls").then(rolls => {
    path=process.cwd();
    if (rolls.length > 1) {    
      fs.writeFile(path+"/DatabaseContent/DB.txt", JSON.stringify(rolls), { flag: 'a+' },  err => {
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