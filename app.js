const { App } = require('@slack/bolt');

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

app.message(/hey|hi/i, async ({ message, say }) => {
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

          action_id: 'me_develop',
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

          action_id: 'me_joinMeet',
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

          action_id: 'me_contribute',
        },
      },
    ],
    text: `Welcome to the team, <@${message.user}>! 🎉 You can introduce yourself in this channel.`,
  });
});

// handle click response
app.action('me_develop', async ({ body, ack, say }) => {
  // Acknowledge the action
  await ack();
  await say(
    `There are 5 Working Groups that develop metrics based on different aspects of open source community health: Risk, Value, Evolution, DEI, and Common.  More information about each of these groups can be found here: https://handbook.chaoss.community/community-handbook/community-initiatives/working-groups and the metrics are developed during our Working Group meetings.
  `
  );
});

app.action('me_joinMeet', async ({ body, ack, say }) => {
  // Acknowledge the action
  await ack();
  await say(
    `All CHAOSS meetings are open to everyone, and they happen virtually at  <https://zoom.us/my/chaoss> We recommend a good first meeting is our Weekly Community Call (Every Tuesday at 11:00 am US Central/Chicago time) but you can see a calendar of all our meetings at https://chaoss.community/participate.
  `
  );
});
app.action('me_contribute', async ({ body, ack, say }) => {
  // Acknowledge the action
  await ack();
  await say(
    `All CHAOSS meetings are open to everyone, and they happen virtually at  <https://zoom.us/my/chaoss> We recommend a good first meeting is our Weekly Community Call (Every Tuesday at 11:00 am US Central/Chicago time) but you can see a calendar of all our meetings at https://chaoss.community/participate.
  `
  );
});
//**************************************************************************** */

// sends message to channel if member joins a channel

const testChannel = 'C03CSUSNDNJ';
app.event('member_joined_channel', async ({ event, client, logger }) => {
  try {
    const result = await client.chat.postMessage({
      channel: testChannel,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `Welcome to *CHAOSS Community* <@${event.user}>! 🎉How would you like to get started? \n\nI want to..`,
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

            action_id: 'mem_develop',
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: '*Join a Meeting*',
          },
          accessory: {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Choose',
              emoji: true,
            },

            action_id: 'mem_joinMeet',
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

            action_id: 'mem_contribute',
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: '*Help with the Website*',
          },
          accessory: {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Choose',
              emoji: true,
            },
            value: 'website',
            action_id: 'mem_helpWithWebsite',
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: '*Write or Edit Documentation*',
          },
          accessory: {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Choose',
              emoji: true,
            },
            value: 'docs',
            action_id: 'mem_docs',
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: '*Contribute through a Mentorship Program*',
          },
          accessory: {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Choose',
              emoji: true,
            },
            value: 'mentorship',
            action_id: 'mem_mentorship',
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: '*Implement Metrics in my Project*',
          },
          accessory: {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Choose',
              emoji: true,
            },
            value: 'implement_metrics',
            action_id: 'mem_implement_metrics',
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: '*Learn About Something Else*',
          },
          accessory: {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Choose',
              emoji: true,
            },
            value: 'learn_something_else',
            action_id: 'mem_learn_something_else',
          },
        },
      ],
      text: `Welcome to the team, <@${event.user}>! 🎉.`,
    });
    logger.info(result);
  } catch (error) {
    logger.error(error);
  }
});

// handle the button click and show the responses
app.action('mem_develop', async ({ ack, say }) => {
  await ack();
  await say(
    `There are 5 Working Groups that develop metrics based on different aspects of open source community health: Risk, Value, Evolution, DEI, and Common.  More information about each of these groups can be found here: <https://handbook.chaoss.community/community-handbook/community-initiatives/working-groups> and the metrics are developed during our Working Group meetings.
    `
  );
});

app.action('mem_joinMeet', async ({ ack, say }) => {
  // Acknowledge the action
  await ack();
  await say(
    `All CHAOSS meetings are open to everyone, and they happen virtually at  <https://zoom.us/my/chaoss> We recommend a good first meeting is our Weekly Community Call (Every Tuesday at 11:00 am US Central/Chicago time) but you can see a calendar of all our meetings at https://chaoss.community/participate.
    `
  );
});

app.action('mem_contribute', async ({ ack, say }) => {
  // Acknowledge the action
  await ack();
  await say(
    `You are welcome to contribute. Please see this documentation: https://handbook.chaoss.community/community-handbook/contributing/development.
    `
  );
});

app.action('mem_helpWithWebsite', async ({ ack, say }) => {
  await ack();
  await say(
    `The first step is getting to know our community! You can connect with us in any of the ways described in our Participate page here: https://chaoss.community/participate.
    `
  );
});

app.action('mem_docs', async ({ ack, say }) => {
  await ack();
  await say(
    `Please see this documentation: https://handbook.chaoss.community/community-handbook/contributing/documentation.
    `
  );
});

app.action('mem_mentorship', async ({ ack, say }) => {
  await ack();
  await say({
    // Choosing "Contribute through a mentorship program" triggers these nested radio buttons
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'Which mentorship program are you interested in?',
        },
        accessory: {
          type: 'radio_buttons',
          options: [
            {
              text: {
                type: 'plain_text',
                text: '*Outreachy*',
                emoji: true,
              },
              value: 'outreachy',
            },
            {
              text: {
                type: 'plain_text',
                text: '*Google Summer of Code*',
                emoji: true,
              },
              value: 'gsoc',
            },
            {
              text: {
                type: 'plain_text',
                text: '*Google Season of Docs*',
                emoji: true,
              },
              value: 'gsod',
            },
          ],
          action_id: 'mem_mentorship_selection',
        },
      },
    ],
    text: 'Which mentorship program are you interested in?',
  });
});

// this handler is for the nested radio buttons above
app.action('mem_mentorship_selection', async ({ action, ack, say }) => {
  await ack();
  console.log(action.selected_option.value);
  if (action.selected_option.value === 'outreachy') {
    await say(
      `The Outreachy Application period has ended for our participation in this program this year. You can still join the CHAOSS community in any of the ways found on our Participate page here: https://chaoss.community/participate.`
    );
  }
  if (action.selected_option.value === 'gsoc') {
    await say(
      `The Google Summer of Code Application period has ended for our participation in this program this year. You can still join the CHAOSS community in any of the ways found on our Participate page here: https://chaoss.community/participate.`
    );
  }
  if (action.selected_option.value === 'gsod') {
    await say(
      `Welcome! If you haven’t yet, please join the <#C03C239HN1F> Slack channel and take note of the pinned item at the top of the channel for more information about next steps.`
    );
  }
});

app.action('mem_implement_metrics', async ({ ack, say }) => {
  await ack();
  await say(
    `We encourage you to join one of our Working Groups for specific questions about implementing your metrics. You can read more about them here: https://handbook.chaoss.community/community-handbook/community-initiatives/working-groups.`
  );
});

app.action('mem_learn_something_else', async ({ ack, say }) => {
  await ack();
  await say(
    `We encourage you to read through our Community Handbook: https://handbook.chaoss.community/community-handbook/, and if you still can’t find what you’re looking for, feel free to ask your question in our #newcomers slack channel.`
  );
});

// **************************************
//sends dm to new member when they join slack
app.event('team_join', async ({ event, client, logger }) => {
  try {
    const result = await client.chat.postMessage({
      channel: event.user.id,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `Welcome to *CHAOSS Community* <@${event.user.id}>! 🎉How would you like to get started? \n\nI want to..`,
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
            text: '*Join a Meeting*',
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
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: '*Help with the Website*',
          },
          accessory: {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Choose',
              emoji: true,
            },
            value: 'website',
            action_id: 'helpWithWebsite',
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: '*Write or Edit Documentation*',
          },
          accessory: {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Choose',
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
            text: '*Contribute through a Mentorship Program*',
          },
          accessory: {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Choose',
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
            text: '*Implement Metrics in my Project*',
          },
          accessory: {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Choose',
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
            text: '*Learn About Something Else*',
          },
          accessory: {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Choose',
              emoji: true,
            },
            value: 'learn_something_else',
            action_id: 'learn_something_else',
          },
        },
      ],
      text: `Welcome to the team, <@${event.user.id}>! 🎉.`,
    });
    logger.info(result);
  } catch (error) {
    logger.error(error);
  }
});

// handle the button click and show the responses
app.action('develop', async ({ ack, say }) => {
  await ack();
  await say(
    `There are 5 Working Groups that develop metrics based on different aspects of open source community health: Risk, Value, Evolution, DEI, and Common.  More information about each of these groups can be found here: <https://handbook.chaoss.community/community-handbook/community-initiatives/working-groups> and the metrics are developed during our Working Group meetings.
    `
  );
});

app.action('joinMeet', async ({ ack, say }) => {
  // Acknowledge the action
  await ack();
  await say(
    `All CHAOSS meetings are open to everyone, and they happen virtually at  <https://zoom.us/my/chaoss> We recommend a good first meeting is our Weekly Community Call (Every Tuesday at 11:00 am US Central/Chicago time) but you can see a calendar of all our meetings at https://chaoss.community/participate.
    `
  );
});

app.action('contribute', async ({ ack, say }) => {
  // Acknowledge the action
  await ack();
  await say(
    `You are welcome to contribute. Please see this documentation: https://handbook.chaoss.community/community-handbook/contributing/development.
    `
  );
});

app.action('helpWithWebsite', async ({ ack, say }) => {
  await ack();
  await say(
    `The first step is getting to know our community! You can connect with us in any of the ways described in our Participate page here: https://chaoss.community/participate.
    `
  );
});

app.action('docs', async ({ ack, say }) => {
  await ack();
  await say(
    `Please see this documentation: https://handbook.chaoss.community/community-handbook/contributing/documentation.
    `
  );
});

app.action('mentorship', async ({ ack, say }) => {
  await ack();
  await say({
    // Choosing "Contribute through a mentorship program" triggers these nested radio buttons
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'Which mentorship program are you interested in?',
        },
        accessory: {
          type: 'radio_buttons',
          options: [
            {
              text: {
                type: 'plain_text',
                text: '*Outreachy*',
                emoji: true,
              },
              value: 'outreachy',
            },
            {
              text: {
                type: 'plain_text',
                text: '*Google Summer of Code*',
                emoji: true,
              },
              value: 'gsoc',
            },
            {
              text: {
                type: 'plain_text',
                text: '*Google Season of Docs*',
                emoji: true,
              },
              value: 'gsod',
            },
          ],
          action_id: 'mentorship_selection',
        },
      },
    ],
    text: 'Which mentorship program are you interested in?',
  });
});

// this handler is for the nested radio buttons above
app.action('mentorship_selection', async ({ action, ack, say }) => {
  await ack();
  console.log(action.selected_option.value);
  if (action.selected_option.value === 'outreachy') {
    await say(
      `The Outreachy Application period has ended for our participation in this program this year. You can still join the CHAOSS community in any of the ways found on our Participate page here: https://chaoss.community/participate.`
    );
  }
  if (action.selected_option.value === 'gsoc') {
    await say(
      `The Google Summer of Code Application period has ended for our participation in this program this year. You can still join the CHAOSS community in any of the ways found on our Participate page here: https://chaoss.community/participate.`
    );
  }
  if (action.selected_option.value === 'gsod') {
    await say(
      `Welcome! If you haven’t yet, please join the <#C03C239HN1F> Slack channel and take note of the pinned item at the top of the channel for more information about next steps.`
    );
  }
});

app.action('implement_metrics', async ({ ack, say }) => {
  await ack();
  await say(
    `We encourage you to join one of our Working Groups for specific questions about implementing your metrics. You can read more about them here: https://handbook.chaoss.community/community-handbook/community-initiatives/working-groups.`
  );
});

app.action('learn_something_else', async ({ ack, say }) => {
  await ack();
  await say(
    `We encourage you to read through our Community Handbook: https://handbook.chaoss.community/community-handbook/, and if you still can’t find what you’re looking for, feel free to ask your question in our #newcomers slack channel.`
  );
});
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
