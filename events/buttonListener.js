const { ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle,  } = require('discord.js');

client.on(Events.InteractionCreate, async interaction => {
    try {
	if (!interaction.isButton()) return;
	if (interaction.customId === 'lineCooldown')
	{
		const timestamp = Date.now();
		const relativeTimer =  Math.floor((timestamp / 1000) + 1800);
		interaction.reply({content: `Your channel cooldown ends at <t:${relativeTimer}:t>, <t:${relativeTimer}:R>.`, ephemeral:true });
	}
	else if (interaction.customId === 'help')
	{
		interaction.reply({content: 
			`__**How to use the World Boss Timer Menu**__ 

1. 	Select the channel you are currently in.
2.	Click on the appropriate status update button:
2a.	**[ :coffin: Killed! ]** : Mark the boss in the selected channel as defeated. Starts a 1 hr respawn timer.
2b.	**[ :ninja: Missing! ]** : Mark the boss in the selected channel as missing or sniped. Alerts everyone of an unreported boss kill in said channel.

:warning: **NOTE**: Taking too long to click a button after selecting a channel will cancel the interaction.`, ephemeral:true });
	}
} catch (error) {
    return console.log(error);
    }
});