require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType} = require('discord.js');

const commands = [
  {
    name: 'hey',
    description: 'Replies with hey!',
  },
  {
    name: 'ping',
    description: 'Pong!',
  },
  {
    name: "add",
    description: "Adds two numbers",
    options: [
      {
        name: "num1",
        description: "First number",
        type: ApplicationCommandOptionType.Number,
        choices: [
          {
            name: "one",
            value: 1
          },
          {
            name: "two",
            value: 2
          },
          {
            name: "three",
            value: 3
          },
        ],
        required: true
      },
      {
        name: "num2",
        description: "Second number",
        type: ApplicationCommandOptionType.Number,
        required: true
      }
    ]
  },
  {
    name: "embed",
    description: "Sends an embed message",
  },

];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

((async () => {
  try {
    console.log("Registering slash commands");
    await rest.put (
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands}
    )
    console.log("Successfully registered slash commands");
  } catch (error) {
    console.log(`Error occured: ${error}`)
  }
})());