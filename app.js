const { App, subtype } = require('@slack/bolt');

const dotenv = require('dotenv');
dotenv.config();

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  userToken: process.env.SLACK_USER_TOKEN,
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
          text: `Welcome to *CHAOSS Community* <@${message.user}>! 🎉How would you like to get started? \n\nI want to..`,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*Develop Metrics*',
        },
        accessory: {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Choose',
            emoji: true,
          },

          action_id: 'develop',
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*Join Meeting*',
        },
        accessory: {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Choose',
            emoji: true,
          },

          action_id: 'joinMeet',
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*Contribute or Review Code*',
        },
        accessory: {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Choose',
            emoji: true,
          },

          action_id: 'contribute',
        },
      },
    ],
    text: `Welcome to the team, <@${message.user}>! 🎉 You can introduce yourself in this channel.`,
  });
});

// handle click response
app.action('develop', async ({ body, ack, say }) => {
  // Acknowledge the action
  await ack();
  await say(
    `There are 5 Working Groups that develop metrics based on different aspects of open source community health: Risk, Value, Evolution, DEI, and Common.  More information about each of these groups can be found here: <https://handbook.chaoss.community/community-handbook/community-initiatives/working-groups> and the metrics are developed during our Working Group meetings.
  `
  );
});

app.action('joinMeet', async ({ body, ack, say }) => {
  // Acknowledge the action
  await ack();
  await say(
    `All CHAOSS meetings are open to everyone, and they happen virtually at  <https://zoom.us/my/chaoss> We recommend a good first meeting is our Weekly Community Call (Every Tuesday at 11:00 am US Central/Chicago time) but you can see a calendar of all our meetings at https://chaoss.community/participate.
  `
  );
});
app.action('contribute', async ({ body, ack, say }) => {
  // Acknowledge the action
  await ack();
  await say(
    `All CHAOSS meetings are open to everyone, and they happen virtually at  <https://zoom.us/my/chaoss> We recommend a good first meeting is our Weekly Community Call (Every Tuesday at 11:00 am US Central/Chicago time) but you can see a calendar of all our meetings at https://chaoss.community/participate.
  `
  );
});

/*
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
*/
// welcome newcomer to channel

/*const channelId = 'C03AJ5JUZ71';

// When a user joins the team, send a message in a predefined channel asking them to introduce themselves
app.event('team_join', async ({ event, client, logger }) => {
  try {
    // Call chat.postMessage with the built-in client
    console.log(event);
    const result = await client.chat.postMessage({
      channel: channelId,
      text: `Welcome to the team, <@${event.user.id}>! 🎉 You can introduce yourself in this channel.`,
    });
    logger.info(result);
  } catch (error) {
    logger.error(error);
  }
});
*/
// Send message to DM

app.event('team_join', async ({ event, client, logger }) => {
  try {
    // Call chat.postMessage with the built-in client
    const result = await client.chat.postMessage({
      channel: event.user.id,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `Welcome to CHAOSS Community <@${event.user.id}>! 🎉How would you like to get started? \n\nI want to..`,
          },
        },

        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: 'Develop metrics',
          },
          accessory: {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Click Me',
              emoji: true,
            },
            value: 'develop_metrics',
            action_id: 'develop_metrics',
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: 'Join a meeting.',
          },
          accessory: {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Click Me',
              emoji: true,
            },
            value: 'join_meeting',
            action_id: 'join_meeting',
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: 'Contribute or Review Code.',
          },
          accessory: {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Click Me',
              emoji: true,
            },
            value: 'code',
            action_id: 'code',
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: 'Help with the Website.',
          },
          accessory: {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Click Me',
              emoji: true,
            },
            value: 'website',
            action_id: 'website',
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: 'Write or Edit Documentation.',
          },
          accessory: {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Click Me',
              emoji: true,
            },
            value: 'docs',
            action_id: 'docs',
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: 'Contribute through a Mentorship Program.',
          },
          accessory: {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Click Me',
              emoji: true,
            },
            value: 'mentorship',
            action_id: 'mentorship',
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: 'Implement Metrics in my Project.',
          },
          accessory: {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Click Me',
              emoji: true,
            },
            value: 'implement_metrics',
            action_id: 'implement_metrics',
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: 'Learn About Something Else.',
          },
          accessory: {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Click Me',
              emoji: true,
            },
            value: 'learn_something_else',
            action_id: 'learn_something_else',
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: "Just Hangin' Around.",
          },
          accessory: {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Click Me',
              emoji: true,
            },
            value: 'just_hangin',
            action_id: 'just_hangin',
          },
        },

        {
          type: 'actions',
          elements: [
            {
              type: 'channels_select',
              placeholder: {
                type: 'plain_text',
                text: 'Select a channel',
                emoji: true,
              },
              initial_channel: 'C12345678',
              action_id: 'actionId-2',
            },
          ],
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: 'Please select the channel you would like to join',
          },
          accessory: {
            type: 'channels_select',
            placeholder: {
              type: 'plain_text',
              text: 'Select appropriate channel',
              emoji: true,
            },
            action_id: 'users_select-action',
          },
        },
      ],
      text: `Hey there <@${event.user.id}>!`,
    });
    logger.info(result);
  } catch (error) {
    logger.error(error);
  }
});

app.action('develop_metrics', async ({ body, ack, say }) => {
  // Acknowledge the action
  await ack();
  await say(`<@${body.user.id}> Please join the #developMetrics channel`);
});
// Testiing
/*
app.event('team_join', async ({ event, client, logger }) => {
  try {
    // Call chat.scheduleMessage with the built-in client
    const result = await client.users.identity({
      channel: event.user.id,
      post_at: whenSeptemberEnds,
      text: 'Summer has come and passed',
    });
  } catch (error) {
    logger.error(error);
  }
});
*/
(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
