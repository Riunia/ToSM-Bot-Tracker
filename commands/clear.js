const {SlashCommandBuilder, CommandInteraction} = require('discord.js');

// Set up the command for deployment.
module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('Clear messages sent by the BOT in this channel / thread. Max 50 per command.')
		.setDefaultMemberPermissions('32'), // Member has manage server permissions.
	
	// Execute the command.
	async execute(interaction) {
		await interaction.deferReply({content: ` `, ephemeral: true })
		await interaction.deleteReply();
		const channel = client.channels.cache.get(interaction.channelId)
		const target = client.user // Fetches user id of the bot
		const messages = await channel.messages.fetch()

		if(target) {
			let i = 0;
			const filtered = [];
	
			(await messages).filter((msg) => {
				if (msg.author.id === target.id && i < 50) { // Set to delete last 50 messages by the bot
				filtered.push(msg);
				i++;
			}
		});
		await channel.bulkDelete(filtered) // Delete messages.
		}
	}
}