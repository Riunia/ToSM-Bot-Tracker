const { EmbedBuilder, Events, GuildMemberManager, GuildMemberRoleManager, ComponentType, SlashCommandBuilder } = require('discord.js');
var fs = require('fs');

//Respawn time (in seconds). Default is 3600 (1 hour). 
let seconds = 60 //For debugging during setup, seconds = 60 is suggested. Don't forget to change it back afterwards!

// Create objects to store temporary timers and identifiers.
var timeouts = [];
var selected = {};
var reportMap = new Map ([]);

// \/\/\/\/\/\/\/\/\/\/\ Channel Selection \/\/\/\/\/\/\/\/\/\/\
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isStringSelectMenu()) return;        
        try {
            await interaction.deferUpdate();                // Acknowledge menu interaction.
            selected = interaction.values[0]                // get selected boss & channel request
            reportMap.set(interaction.user.id, selected)    // add request to global list of requests, with user id as the key
            //LogReportInfo();                              // Remove comment marker from this command if you prefer to recieve logs.

            // set a new 3s timer on the selection menu. If 3s pass without a followup button press, interaction expires and the request is deleted.
            ResetRequestTimer();
    } catch (error) {
        console.log(error);
        return
    }

    function LogReportInfo() {
        console.log(interaction.user.id + ` is issuing a report for ` + selected);
        console.log('PENDING REQUESTS');
        for (let requests of reportMap)
            console.log(requests);
    }

    function ResetRequestTimer() {
        const thread = interaction.customId;
        timeouts.indexOf(thread) === -1 ? timeouts.push(thread) : {};

        clearTimeout(timeouts[thread]);
        timeouts[thread] = setTimeout(function () {
            interaction.editReply({ content: '' });
            reportMap.delete(interaction.user.id);
        }, 3000);
    }
})

// \/\/\/\/\/\/\/\/\/\/\ 'Killed' button \/\/\/\/\/\/\/\/\/\/\
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isButton()) return;
    if (interaction.customId === 'markDefeated')
        try {
            //Check that the user pressing the button has a pending request via the channel selection menu.
            const buttonUser = interaction.user.id;
            if (reportMap.has(buttonUser) === false) {   // Reject in case of missing or expired request.
                interaction.reply({content: 'You have not selected a Channel or took too long to push a button!', ephemeral:true});
            return;}

            await interaction.deferUpdate();            // Acknowledge the menu interaction.
            const target = reportMap.get(buttonUser)    // Fetch button user's request from the reportMap.
            //console.log ('match found for ' + buttonUser + ', updating ' + target + '...')

            var { channel, bossTimerID, channelNumber, timestamp } = GenerateReport(interaction, target);
            await SendKillReport();
        } catch(error) {
            return console.log(error);
    }

    async function SendKillReport() {
            // Fetch the message by ID and update status.
            await channel.messages.fetch(bossTimerID).then(async (message) => {
            // Report Channel, status, relative and absolute respawn time(timezone-agnostic), and reporting user.
            (await message.edit(`**Channel ${channelNumber}:** :coffin:     Respawns at <t:${Math.floor(timestamp / 1000) + seconds}:t>  /  <t:${Math.floor(timestamp / 1000) + seconds}:R>  (<@!${interaction.user.id}>)`));
            // Clear any old ongoing timers for the selected message.
            clearTimeout(timeouts[bossTimerID]);
            // Start a new timer to update status to "respawned" after (seconds + 5s buffer time).
            timeouts[bossTimerID] = setTimeout(async function () {
                (await message.edit(`**Channel ${channelNumber}:** :white_check_mark:     Respawned`));
            }, 1000 * seconds + 5);
        });
    }
})

// \/\/\/\/\/\/\/\/\/\/\ 'Mark Missing' Button \/\/\/\/\/\/\/\/\/\/\
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isButton()) return;
    if (interaction.customId === 'markMissing')
        try {
            //Check that the user pressing the button has a pending request via the channel selection menu.
            const buttonUser = interaction.user.id;
            if (reportMap.has(buttonUser) === false) {  // Reject in case of missing or expired request.
                interaction.reply({content: 'You have not selected a Channel or took too long to push a button!', ephemeral:true});
            return;}

            await interaction.deferUpdate();            // Acknowledge the menu interaction.
            const target = reportMap.get(buttonUser)    // Fetch button user's request from the reportMap.
            // console.log ('match found for ' + buttonUser + ', updating ' + target + '...')

            var { channel, bossTimerID, channelNumber, timestamp } = GenerateReport(interaction, target);
            await SendMissingReport();
        } catch(error) {
            return console.log(error);
    }

    async function SendMissingReport() {
            // Fetch the message by ID and update status.
            await channel.messages.fetch(bossTimerID).then(async (message) => {
            // Report Channel, status, relative and absolute reporting time(timezone-agnostic), and reporting user.
            (await message.edit(`**Channel ${channelNumber}:** :warning:     Reported missing <t:${Math.floor(timestamp / 1000)}:R>  (<@!${interaction.user.id}>)`));
            // Clear any old ongoing timers for the selected message.
            clearTimeout(timeouts[bossTimerID]);
        });
    }
})

function GenerateReport(interaction, target) {
    let rawdata = fs.readFileSync('./exports/BossMessageMap.json')
    let objdata = JSON.parse(rawdata);
    const bossTimers = new Map(Object.entries(objdata))
    // Generate elements to update the boss status message...
    // Timestamp
    const timestamp = Date.now();
    // Channel number
    const channel = client.channels.cache.get(interaction.channelId);
    const channelNumber = target.match(/\d+/g);
    // Message ID
    let bossTimerID = bossTimers.get(target)
    return { channel, bossTimerID, channelNumber, timestamp };
}