const { App } = require('@slack/bolt');

const testChannel = 'C03NGRCE279';

async function productProgram(message, client) {
  try {
    return await client.chat.postMessage({
      channel: testChannel,

      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `Hello<@${message.user}> :wave:`,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: " A huge welcome to you for joining us on the *product-project-program-mgt* channel. We have several events every month that would most definitely be of interest to you, make sure to check your messages frequently so you wouldn't miss out on any of them.",
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: " Do not hesitate to drop your product-related questions on the channel and someone would definitely assist. Remember to also network with other members of the channel as we're all here to learn. ",
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `If you're new to Product Management, we have a study guide that you can use to learn at your own pace. \n <https://mixed-mantis-ad2.notion.site/SCA-PRODUCT-MANAGEMENT-2022-01b9aec3ffc54f3b9fb442391f50ea19> \nIn case you need more clarification, feel free to reach out to the channel lead <@Betty Bada>. Here's to becoming awesome PMs 🎉🎉
            `,
          },
        },
      ],

      text: `Welcome to SheCodeAfrica, <@${message.user}>! 🎉.`,
    });
  } catch (error) {
    console.log(error);
  }
}

exports.productProgram = productProgram;
