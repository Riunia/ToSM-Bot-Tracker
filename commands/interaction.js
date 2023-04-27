const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, StringSelectMenuBuilder } = require('discord.js');

// Load boss config file and set up the relevant variables.
const bossConfig = require('../exports/bossConfig.js')
const properties = bossConfig.bossProperties
const menuChoices = properties.map(
    ({name, value}) => ({name, value})
    );

// Set up the command for deployment.
let data = new SlashCommandBuilder()
    .setName('interaction')
    .setDescription('Create an interactable object.')
    .setDefaultMemberPermissions('32') // Member has manage server permissions.
    .setDMPermission(false)
    .addStringOption(option =>
    option.setName('boss_menu')
        .setDescription('The object you wish to create.')
        .setRequired(true)
        )
    // Fetches available boss options from bossConfig file.
    menuChoices.forEach(m =>{
        data.options[0].addChoices(m);
    }),

// Export and execute the command.
module.exports = {
    data: data,
    async execute (interaction) {
        try {
            // Cache and set the channel.
            const channel = client.channels.cache.get(interaction.channelId);  
            // Remove the command's reply.
            await interaction.deferReply({ ephemeral: true });
            await interaction.deleteReply();

            // Find or create the string selection menu options for the chosen boss.
            const bossVal = interaction.options.getString('boss_menu');
            let choice = properties.find(r => r.value === bossVal)
            let timestamp = (choice.value + 'Timestamp');
            let chOption = (choice.key)
            let chCount = (choice.channels)
            const stringselect = [];                        // Create an array containting channel options.
            for (let i = 0; i < chCount; i++ ) {
                stringselect.push({
                    label: `Channel ${i+1}`, 
                    value: (chOption + `${i+1}`)}
                )};

                const actionButtons = generateButtons();    // Missing, Cooldown, Killed and '?' buttons.
             
                    // Build select menus.
                    const bossSelector = new ActionRowBuilder()
                        .addComponents(
                            new StringSelectMenuBuilder()
                                .setCustomId(timestamp)                                
                                .setPlaceholder('Select Channel')
                                .addOptions(stringselect)   // Retrieve the array containing channel options.
                                )
                    await channel.send({ components: [actionButtons, bossSelector] });                
        } catch (error) {
            return console.log(error);
        }
    }
};

function generateButtons() {
    return new ActionRowBuilder()
        // Make a button that marks the boss in the selected channel as missing.
        .addComponents(
            new ButtonBuilder()
                .setCustomId('markMissing')
                .setLabel(`Missing!`)
                .setEmoji(`🥷`)
                .setStyle(ButtonStyle.Danger)
        )
        // Make a button that replies with a countdown of the user's line change.
        .addComponents(
            new ButtonBuilder()
                .setCustomId('lineCooldown')
                .setLabel(`Cooldown`)
                .setEmoji(`⌚`)
                .setStyle(ButtonStyle.Secondary)
        )
        // Make a button that marks the boss in the selected channel as defeated.
        .addComponents(
            new ButtonBuilder()
                .setCustomId('markDefeated')
                .setLabel(`Killed!`)
                .setEmoji(`⚰`)
                .setStyle(ButtonStyle.Success)
        )
        // Make a button that displays instructions on how to use the interaction menu.
        .addComponents(
            new ButtonBuilder()
                .setCustomId('help')
                .setEmoji(`❔`)
                .setStyle(ButtonStyle.Primary)
        );
}
