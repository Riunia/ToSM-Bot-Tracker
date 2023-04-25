var fs = require('fs');
const bossTimers = require('../exports/bossMessageIDTemplate.js');
const { SlashCommandBuilder, Message } = require('discord.js');

// Set up the command for deployment.
module.exports = {
 data: new SlashCommandBuilder()
		.setName('setup')
		.setDescription('Initial timer / status setup messages for WBs')
		.setDefaultMemberPermissions('32') // Member has manage server permissions.
		.setDMPermission(false)
		.addStringOption(option =>
			option.setName('boss')
				.setDescription('The boss you wish to setup.')
				/* To add new bosses, follow the format below and add the new boss details, preferably in alphabetical order. */
				.addChoices(
					{ name: 'Apophis', value: 'apophisChannel' },
					{ name: 'Barbarossa', value: 'barbarossaChannel' },
					{ name: 'Culton', value: 'cultonChannel' },
					{ name: 'Devourer', value: 'devourerChannel' },
					{ name: 'Dragon', value: 'dragonChannel' },
					{ name: 'Eva', value: 'evaChannel' },
					{ name: 'Frost Bot', value: 'frostbotChannel' },
					{ name: 'Haboela', value: 'haboelaChannel' },
					{ name: 'Harrah', value: 'harrahChannel' },
					{ name: 'Lucia', value: 'luciaChannel' },
					{ name: 'Magma', value: 'magmaChannel' },
					{ name: 'Nakya', value: 'nakyaChannel'},
					{ name: 'Robarg', value: 'robargChannel' },
					{ name: 'Rudolph', value: 'rudolphChannel' },
					{ name: 'Scylla', value: 'scyllaChannel' },
					{ name: 'Sobek', value: 'sobekChannel' },
					)
				.setRequired(true)
				)
		.addIntegerOption(option =>
			option.setName('channels') // Number of channels
				.setDescription('Number of channels with the world boss')
				.setMinValue(1)
				.setMaxValue(30)
				.setRequired(true)
				),
	// Execute the command.
	async execute(interaction) {
		
		try {
			// Cache and set the channel.
			const channel = client.channels.cache.get(interaction.channelId);
			// Remove the command's reply.
			await interaction.deferReply({ ephemeral: true });
			await interaction.deleteReply();
			// Respawn timer header
			await channel.send(`__**RESPAWN TIMERS**__`)
			// Cache boss selection info.
			let bossch = (interaction.options.getString('boss'));
			// Send the message i times, based on no. of channels inputted.
			for (let i = 0; i < (interaction.options.getInteger('channels')); i++) {
				// Emulate typing.
				await channel.sendTyping();
				// send messages to boss thread on discord.
				msg = await channel.send(`**Channel ${i+1}:** No Timer set`) // message to channel
				const msg_id = msg.id // get message id
				const selected =  (`${bossch}${i+1}`) // get boss key
				//cache message ID.
				bossTimers.bossTimers.find((r,n) => {
						if (r.key === selected) {
						bossTimers.bossTimers[n] = {key: selected, messageID: msg_id};
						return true;
						}
					});
			// write to JSON file "BossMessageID.json" in exports folder
			let bossTimersIDs = bossTimers.bossTimers
			fs.writeFileSync('./exports/BossMessageID.json', JSON.stringify(bossTimersIDs, ',', 4) , 'utf-8')
			};
			console.log (bossTimers);

		} catch (error) {
			return console.log(error);
		}
	},
};