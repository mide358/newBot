const { App } = require('@slack/bolt');

async function sayHello(message, say) {
  return await say(`Whats up segment <@${message.user}>!`);
}

exports.sayHello = sayHello;
