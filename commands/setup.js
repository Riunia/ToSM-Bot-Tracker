var fs = require('fs');
const { SlashCommandBuilder, Message } = require('discord.js');

//Retrieve boss properties from bossConfig file
const bossConfig = require('../exports/bossConfig.js')
const properties = bossConfig.bossProperties
const menuChoices = properties.map(
    ({name, value}) => ({name, value})
    );

// Set up the command for deployment.

let data = new SlashCommandBuilder()
		.setName('setup')
		.setDescription('Setup timer / status messages for WBs')
		.setDefaultMemberPermissions('32') 	// Member has manage server permissions.
		.setDMPermission(false)
		.addStringOption(option =>
			option.setName('boss')
				.setDescription('The boss you wish to setup.')
				.setRequired(true)
				)
				menuChoices.forEach(m =>{
				data.options[0].addChoices(m);
				})

// Export and execute the command.
module.exports = {
	data: data,
	async execute(interaction) {	
		try {
			// Cache and set the channel.
			const channel = client.channels.cache.get(interaction.channelId);
			// Remove the command's reply.
			await interaction.deferReply({ ephemeral: true });
			await interaction.deleteReply();

		 	// Retrieve channel counts for the selected boss
			let { chCount, chOption } = getChannels();

			// Respawn timer header
			await channel.send(`__**RESPAWN TIMERS**__`)
			// Cache boss selection info.
			// Send the message i times, based on no. of channels inputted.
			for (let i = 0; i < chCount; i++) {

				// Emulate typing.
				await channel.sendTyping();
				// send messages to boss thread on discord.
				msg = await channel.send(`**Channel ${i+1}:** No Timer set`) 	// message to channel
				const msg_id = msg.id 											// get message id
				const selected =  (chOption + `${i+1}`) 						// get boss key

				// Retrieve and convert JSON file containing boss message IDs to a map.
				let rawdata = fs.readFileSync('./exports/BossMessageMap.json')
				let objdata = JSON.parse(rawdata);
				const idMap = new Map(Object.entries(objdata))

				//cache message ID.
					for (let i = 0; i < chCount; i++) {
						idMap.set (selected, msg_id);
					}

				// Convert map and overwrite the JSON file.
				const bossTimerIDs = Object.fromEntries(idMap);
				fs.writeFileSync('./exports/BossMessageMap.json', JSON.stringify(bossTimerIDs, ',', 4) , 'utf-8')
				};
			//console.log (bossTimers);

		} catch (error) {
			return console.log(error);
		}

		function getChannels() {
			const bossVal = interaction.options.getString('boss');
			let choice = properties.find(r => r.value === bossVal);
			let chOption = (choice.key);
			let chCount = (choice.channels);
			return { chCount, chOption };
		}
	},
};
