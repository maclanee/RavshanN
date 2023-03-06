require('dotenv').config();

const tmi = require('tmi.js');

const client = new tmi.Client({
  connection: {
    reconnect: true
  },
  channels: ['ravshann'],
  identity: {
    username: process.env.TWITCH_BOT_USERNAME,
    password: process.env.TWITCH_OAUTH_TOKEN
  }
});

client.connect();

client.on('message', (channel, userstate, message, user, self) => {
  if (self) return;
  let messageRepeatCount = message.split(' ')
  //console.log(message);
  if (message.toLowerCase() === '1' && userstate.username === 'snussed') {
    client.say(channel, `@${userstate.username} Works.`)
  }
  // спам
  if ((message.startsWith('!спам') || message.startsWith('!spam')) && userstate.username === 'snussed') {
    for (let i = 0; i < + messageRepeatCount[1]; i++) {
      client.say(channel, `${message.slice(8)}`);
    }
  }
  // тг
  if (message.toLowerCase() === '!тг' || message.toLowerCase() === '!tg') {
    client.say(channel, `@${userstate.username} TG - https://t.me/RavshanNstream MorphinTime`)
  }
  if ((message.startsWith('!tg') || message.startsWith('!тг')) && userstate.username === 'ravshann') {
    for (let i = 0; i < + messageRepeatCount[1]; i++) {
      client.say(channel, `TG - https://t.me/RavshanNstream MorphinTime`);
    }
  }
  // инст
  if (message.toLowerCase() === '!инст' || message.toLowerCase() === '!inst') {
    client.say(channel, `@${userstate.username} inst - https://www.instagram.com/ravshann_13/ MorphinTime`)
  }
  if ((message.startsWith('!инст') || message.startsWith('!inst')) && userstate.username === 'ravshann') {
    for (let i = 0; i < + messageRepeatCount[1]; i++) {
      client.say(channel, `inst -  https://www.instagram.com/ravshann_13/ MorphinTime`);
    }
  }
  // winline
  if (message.startsWith('!wl') && userstate.username === 'ravshann') {
    for (let i = 0; i < + messageRepeatCount[1]; i++) {
      client.say(channel, `WINLINE промо: rav - https://winline.tv/3pWr1GS winline-1`);
    }
  }
  
  // onMessageHandler(channel, userstate, message, user)
});

// SPAM MODERATORS

client.on('chat', (channel, user, message, userstate) => {
  if (user.mod) {
    let messageRepeatCount = message.split(' ')

    if (message.toLowerCase() === '1') {
      client.say(channel, `/me Works.`)
    }
    if (message.startsWith('!tg') || message.startsWith('!тг')) {
      for (let i = 0; i < + messageRepeatCount[1]; i++) {
        client.say(channel, `TG - https://t.me/RavshanNstream MorphinTime`);
      }
    }
    if (message.startsWith('!wl')) {
      for (let i = 0; i < + messageRepeatCount[1]; i++) {
        client.say(channel, `WINLINE промо: rav - https://winline.tv/3pWr1GS winline-1`);
      }
    }
    if (message.startsWith('!инст') || message.startsWith('!inst')) {
      for (let i = 0; i < + messageRepeatCount[1]; i++) {
        client.say(channel, `inst -  https://www.instagram.com/ravshann_13/ MorphinTime`);
      }
    }
  }
})

// EMOTEONLY on/off

client.on('message', (channel, userstate, message, self) => {
  if (message.toLowerCase() === '!on' && userstate.username === 'snussed') {
    client.emoteonly(channel)
  }
  if (message.toLowerCase() === '!off' && userstate.username === 'snussed') {
    client.emoteonlyoff(channel)
  }
})
