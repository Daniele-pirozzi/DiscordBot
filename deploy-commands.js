const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');


const commands = [
	new SlashCommandBuilder().setName('YOU DECIDE!').setDescription('replies with button selection and action'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
]
.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

await rest.put(Routes.applicationGuildCommands(clientId), { body: commands })
.then(() => console.log('Successfully registered application commands.'))
.catch(console.error);

