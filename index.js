"use strict";
exports.__esModule = true;
var discord_js_1 = require("discord.js");
var bot = new discord_js_1.Client();
var limit = 50;
var dotenv_1 = require("dotenv");
dotenv_1.config();
var token = process.env.TOKEN;
var prefix = '!';
bot.on('ready', function () {
    console.log('• bot is online!');
});
bot.on('message', function (message) {
    var args = message.content.substring(prefix.length).split(" ");
    switch (args[0]) {
        case 'ping':
            message.channel.send('pong!');
            break;
        case 'info':
            message.channel.send('Welcome to RollerBot, this free bot allows you to roll dice without moving your fingers away from the keyboard, not like they leave there anyway...\nWell at least RollerBot is more efficient and faster than using google to roll dice because you can\'t aford real dice cause the lazy sack of potatoes that you are does not understand how to get off your couch and work like a **man,** **woman,** **attack helicopter,** or whatever it is you identify as(we are not sexist here)\nI guess this is your only option then, hope you enjoy using RollerBot :)\n\n\nTo roll a dice type:\n**!roll** followed by the amount of die you want to roll and the type of dice, e.g. !roll 4 d4');
            break;
        case 'roll':
            var _a = args[1].split('d'), lValue = _a[0], rValue_1 = _a[1];
            lValue = parseInt(lValue);
            rValue_1 = parseInt(rValue_1);
            console.log(lValue, rValue_1, limit, lValue < limit, rValue_1 < limit);
            if (!lValue || !rValue_1) {
                message.channel.send('Error, the roll you entered does not fufil the roll requirements. \nType **!help** for a list of commands or **!info** on how to format the command correctly');
                break;
            }
            else if (lValue > limit || rValue_1 > limit) {
                message.channel.send("User Size Limit Exceeded! Try inputting a value lower than " + limit);
                break;
            }
            var diceResults = Array.from({ length: lValue }, function (_, i) { return Math.round(Math.random() * rValue_1); });
            // for(let i = 0; lValue > i; i++){
            //     diceResults.push(Math.round(Math.random() * rValue))
            // }   
            message.channel.send(diceResults);
            break;
        case 'limit':
            message.channel.send('The limit for the amount of dice that can be rolled is ' + limit);
            break;
        case 'help':
            message.channel.send('Commands:\n\n**!info** explains how to format **!roll** correctly\n**!roll** to roll dice\n**!limit** to find the dice rolling limit\n**!clear** clears messages starting from the !clear message *Admin role only*\n**!suport** for any questions or suggestions\n\n*Have a nice day, we care about you greatly*');
            break;
        case 'support':
            message.channel.send('Do you really think we care about your questions or suggestions?\nIf yes press **alt + f4** or for premium support press **windows + X + U + U** really fast\nThank you for you cooperation with our premium support service');
            break;
    }
});
bot.login(token);
