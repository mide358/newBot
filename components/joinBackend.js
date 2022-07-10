const { App } = require('@slack/bolt');

const channelId = 'C03BZP17E06';

// async function backendChannel(message, client) {
//   let testit = [
//     {
//       type: 'section',
//       text: {
//         type: 'mrkdwn',
//         text: `Hello <@${message.user}> :wave:`,
//       },
//     },
//     {
//       type: 'section',
//       text: {
//         type: 'mrkdwn',
//         text: ' Test We are happy that you chose to join the backend channel. ',
//       },
//     },
//     {
//       type: 'section',
//       text: {
//         type: 'mrkdwn',
//         text: ` If you're new to backend development, we have a study guide that you can use to learn at your own pace.`,
//       },
//     },
//     {
//       type: 'section',
//       text: {
//         type: 'mrkdwn',
//         text: ` In case you need more clarification, feel free to reach out to the channel lead @Olanesoft or any of the channel co-lead @fiyin and @ Ifenna`,
//       },
//     },
//   ];

//   return testit;
// }

async function backendChannel(message, client) {
  try {
    return await client.chat.postMessage({
      channel: channelId,

      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `Hello <@${message.user}> :wave:`,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: ' We are happy that you chose to join the backend channel. ',
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: ` If you're new to backend development, we have a study guide that you can use to learn at your own pace.`,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: ` In case you need more clarification, feel free to reach out to the channel lead @Olanesoft or any of the channel co-lead @fiyin and @ Ifenna`,
          },
        },
      ],

      text: `Welcome to SheCodeAfrica, <@${message.user}>! 🎉.`,
    });
  } catch (error) {
    console.log(error);
  }
}

exports.backendChannel = backendChannel;
