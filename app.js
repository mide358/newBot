const { App } = require('@slack/bolt');

const dotenv = require('dotenv');
dotenv.config();

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  port: process.env.PORT || 3000,
});

// Listen to incoming message containing hello
app.message('hello', async ({ message, say }) => {
  await say(`Whats up <@${message.user}>!`);
});

app.message(/hey/i, async ({ message, say }) => {
  await say({
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Welcome to CHAOSS <@${message.user}>!`,
        },
        accessory: {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Click Me',
          },
          action_id: 'button_click',
        },
      },
    ],
    text: `Hey there <@${message.user}>!`,
  });
});

// handler to respond to click
app.action('button_click', async ({ body, ack, say }) => {
  // Acknowledge the action
  await ack();
  await say(`<@${body.user.id}> clicked the button`);
});

const whenItsTime = '1649960121';

app.message('wake me up', async ({ message, client, logger }) => {
  try {
    // Call chat.scheduleMessage with the built-in client
    const result = await client.chat.scheduleMessage({
      channel: message.channel,
      post_at: whenItsTime,
      text: 'It is 5:10pm',
    });
  } catch (error) {
    logger.error(error);
  }
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
