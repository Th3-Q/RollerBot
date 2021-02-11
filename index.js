const Discord = require('discord.js')
const bot = new Discord.Client();
const limit = 50

const dotenv = require("dotenv")
dotenv.config()

const token = process.env.TOKEN;

const prefix = '!';

bot.on('ready', () =>{
    console.log('bot is online!')
})

bot.on('message', message=>{
    var args = message.content.substring(prefix.length).split(" ")
    var diceResult;
    var totalResult = 0;
    switch(args[0]){
        case 'ping':
        message.channel.send('pong!')
        break;
        case 'info':
        message.channel.send('Welcome to RollerBot, this free bot allows you to roll dice without moving your fingers away from the keyboard, not like they leave there anyway...\nWell at least RollerBot is more efficient and faster than using google to roll dice because you can\'t aford real dice cause the lazy sack of potatoes that you are does not understand how to get off your couch and work like a **man,** **woman,** **attack helicopter,** or whatever it is you identify as(we are not sexist here)\nI guess this is your only option then, hope you enjoy using RollerBot :)\n\n\nTo roll a dice type:\n**!roll** followed by the amount of die you want to roll and the type of dice, e.g. !roll 4 d4')
        break;
        case 'roll':
                if(args[1] < limit) {
                        var diceResults = [];
                        for(let i = 0; args[1] > i; i++){
                            var argument = args[2].replace('d','');
                            parseInt(args[2])
                            argument -= 1;
                            diceResult = Math.round(Math.random()*argument);
                            diceResult += 1;
                            totalResult += diceResult;
                            diceResults.push(diceResult);
                            
                    }   if(totalResult){
                            message.channel.send(diceResults);
                            message.reply(totalResult);
                    }
                } else {
                    message.channel.send('Error, the roll you entered does not fufil the roll requirements. \nType **!help** for a list of commands or **!info** on how to format the command correctly')
                }
        break;
        case 'clear':
            if(!message.member.roles.cache.find(r => r.name === "Admin")) return message.channel.send('You do not have permission to use this command')
            if(!args[1]) return message.reply('Error please define second arg') 
                message.channel.bulkDelete(args[1]);
        break;
        case 'limit':
                message.channel.send('The limit for the amount of dice that can be rolled is ' + limit)
        break;
        case 'help':
                message.channel.send('Commands:\n\n**!info** explains how to format **!roll** correctly\n**!roll** to roll dice\n**!limit** to find the dice rolling limit\n**!clear** clears messages starting from the !clear message *Admin role only*\n**!suport** for any questions or suggestions\n\n*Have a nice day, we care about you greatly*')
        break;
        case 'support':
                message.channel.send('Do you really think we care about your questions or suggestions?\nIf yes press **alt + f4** or for premium support press **windows + X + U + U** really fast\nThank you for you cooperation with our premium support service')
        break;
        case 'unlimited':
        message.channel.send(message.author, {files : 'C:/Users/t.shires/Desktop/Discord_Bot/unlimited.png'})
        break;
    }
})




bot.login(token);
