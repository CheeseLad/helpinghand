require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder, ClientUser, ActivityType, Guild } = require('discord.js');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on('ready', (c) => {
  console.log(`${c.user.tag}` + " is ready to help!")
  targetGuild = client.guilds.cache.get('1117906015757799494')

  client.user.setActivity({
    name: `${targetGuild.memberCount} Members`,
    type: ActivityType.Watching,
  });
});

client.on('messageCreate', (message) => {
  if (message.author.bot) {
    return;
  }
  if (message.content === "hello") {
    message.reply("hello");
  }
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "hey") {
    interaction.reply("hey");
  }
  if (interaction.commandName === "ping") {
    interaction.reply("pong");
  }

  if (interaction.commandName === "add") {
    const num1 = interaction.options.get("num1").value;
    const num2 = interaction.options.get("num2").value;
    interaction.reply(`The sum is ${num1 + num2}`);
  };

  if (interaction.commandName === "embed") {
    const embed = new EmbedBuilder()
    .setTitle("This is an embed")
    .setDescription("This is a description")
    .setColor("Random")
    .addFields({ 
      name: "Field 1", 
      value: "Value 1",
      inline: true,
     },
     { 
      name: "Field 2", 
      value: "Value 2",
      inline: true,
     });
    interaction.reply({ embeds: [embed] });
  }
});

client.on("messageCreate", (message) => {
  if (message.content === "embed") {
    const embed = new EmbedBuilder()
    .setTitle("This is an embed")
    .setDescription("This is a description")
    .setColor("Random")
    .addFields({ 
      name: "Field 1", 
      value: "Value 1",
      inline: true,
     },
     { 
      name: "Field 2", 
      value: "Value 2",
      inline: true,
     });
    message.reply({ embeds: [embed] });
  }
});

client.on("interactionCreate", async (interaction) => {
  try {
    if (interaction.isButton()) return;

    const role = interaction.guild.roles.cache.get(interaction.customId);
    await interaction.deferReply({ ephemeral: true });
    if (!role) {
      interaction.editReply({
        content: "I couldn't find that role",
      })
      return;
    }
  
    const hasRole = interaction.member.roles.cache.has(role.id);
  
    if (hasRole) {
      await interaction.member.roles.remove(role);
      await interaction.editReply(`The role ${role} has been removed`);
      return;
    }
  
    await interaction.member.roles.add(role);
    await interaction.editReply(`The role ${role} has been added`);

  } catch (error) {
    console.log(error);
  }
})

client.login(process.env.TOKEN);