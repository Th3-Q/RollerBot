const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] }); //{ intents: [Intents.FLAGS.GUILDS] }

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});

// client.on('message', e => console.log(e))

client.on("warn", (err) => console.warn("[WARNING]", err));
client.on("error", (err) => console.error("[ERROR]", err));
client.on("disconnect", () => {
    console.warn("Disconnected!");
    process.exit(0);
});
process.on("unhandledRejection", (reason, promise) => {
    console.log("[FATAL] Possibly Unhandled Rejection at: Promise ", promise, " reason: ", reason.message);
});

client.on('interactionCreate', async interaction => {
	console.log("RECIEVED", interaction);

	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token);