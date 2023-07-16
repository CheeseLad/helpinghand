require('dotenv').config();
const { Client, IntentsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

const roles = [
  {
    id: "1129483778570604585",
    label: "Red"
  },
  {
    id: "1129483810103361656",
    label: "Green"
  },
  {
    id: "1129483831993454603",
    label: "Blue"
  },
]

client.on('ready', async (c) => {
  try {
    const channel = await client.channels.cache.get("1126659979517100163");
    if (!channel) return;

    const row = new ActionRowBuilder();
    
    roles.forEach((role) => {
      row.components.push(
        new ButtonBuilder()
        .setCustomId(role.id)
        .setLabel(role.label)
        .setStyle(ButtonStyle.Primary)
      );
    });

    await channel.send({ 
      content: "Add or remove your roles:", 
      components: [row],
    });
    process.exit();
  } catch (error) {
    console.log(error);
  }
});

client.login(process.env.TOKEN);