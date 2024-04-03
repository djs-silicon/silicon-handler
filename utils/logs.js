const chalk = require("chalk")
const package = require('../package.json')
const { time } = require('../utils/time');

const formattedTime = time()

const messages = {
    loggedIn: `${chalk.gray(`[${formattedTime}]`) + `${chalk.yellowBright("[?]")} Discordjs Silicon Handler is Ready!\n` + `${chalk.gray(`[${formattedTime}]`) + chalk.yellowBright("[?]")} You're running on version ${chalk.greenBright(`${package.version}`)}`}  `,
    refreshing: `${chalk.gray(`[${formattedTime}]`) + `${chalk.yellowBright("[?]")} Started refreshing application (/) commands.`}`,
    finishedRefreshing: `${chalk.gray(`[${formattedTime}]`) + `${chalk.yellowBright("[?]")} Successfully reloaded application (/) commands.`}`
};

const errors = {
    notFound: `No command matching was found.`,
};

const warnings = {
    commandsSetWarning:`${chalk.gray(`[${formattedTime}]`) + `${chalk.redBright("[!]")} There's a command missing a required "data" or "execute" property.`}`,
}

module.exports = {errors,warnings,messages};

