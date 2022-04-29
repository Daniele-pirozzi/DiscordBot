const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId } = require('./config.json');
const { SlashCommandBuilder } = require('@discordjs/builders');

const commands = [
	new SlashCommandBuilder().setName('decide').setDescription('replies with button selection and action'),
	new SlashCommandBuilder().setName('delete-database').setDescription('resets data on DB and saves results on file'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
]
.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

rest.put(Routes.applicationCommands(clientId), { body: commands })
.then(() => console.log('Successfully registered application commands.'))
.catch(console.error);

//bot priviliges: flipped on both of Privileged Gateway Intents, still getting the same error