const { App } = require('@slack/bolt');

async function newMember(message, client) {
  try {
    if (message.channel !== 'C03CSUSNDNJ') {
      return await client.chat.postMessage({
        channel: message.user,

        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `Hello<@${message.user}>! :wave:`,
            },
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: ` Welcome to She Code Africa Community. Please go ahead and make an introduction on the<#C03CSUSNDNJ> \n Clueless on where to start? Do check out our community guidelines. Our Community Managers <#D03961HLBTN> and <#D03NKPB2BRU> are only a DM away If you have any questions.`,
            },
          },
        ],
        text: `Welcome to SheCodeAfrica, <@${message.user}>! 🎉.`,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

exports.newMember = newMember;
