const { App } = require('@slack/bolt');
const newuser = require('./components/newuser');
const newHere = require('./components/newHere');
const joinProduct = require('./components/joinProductProgram');
const joinBackend = require('./components/joinBackend');

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

app.message(/holla/i, async ({ message, say }) => {
  newuser.sayHello(message, say);
});

app.message(/hey|hi/i, async ({ message, say }) => {
  await say(`Whats up <@${message.user}>!`);
});
//

app.message(/new(?=\s+here)/i, async ({ message, client }) => {
  newHere.newMember(message, client);
});

// Member joined Product channel
// app.event('member_joined_channel', async ({ event, message, client }) => {
//   // let back = joinBackend.backendChannel(message);
//   let currentChannel = event.channel;

//   try {
//     await client.chat.postMessage({
//       channel: currentChannel,
//       blocks: joinBackend.backendChannel(message),

//       text: `Welcome to SheCodeAfrica, <@${event.user}>! 🎉.`,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

app.event('member_joined_channel', async ({ event, client }) => {
  console.log(event.channel);
  if (event.channel === 'C03NGRCE279') {
    console.log('new join channel here');
    joinProduct.productProgram(event, client);
  } else if (event.channel === 'C03BZP17E06') {
    console.log('team join channel here');
    joinBackend.backendChannel(event, client);
  }
  // joinProduct.productProgram(event, client);
});

// Member joined Backend channel
// app.event('member_joined_channel', async ({ event, client }) => {
//   joinBackend.backendChannel(event, client);
// });

// app.event('team_join', async ({ event, client, logger }) => {
//   try {
//     // Call chat.scheduleMessage with the built-in client
//     const result = await client.users.identity({
//       channel: event.user.id,
//       post_at: whenSeptemberEnds,
//       text: 'Summer has come and passed',
//     });
//   } catch (error) {
//     logger.error(error);
//   }
// });

// let usersStore = {};

// app.message('intro', async ({ client, logger }) => {
//   // Call the users.list method using the WebClient
//   const result = await client.users.list();
//   saveUsers(result.members);
//   try {
//     for (let i = 0; i < userId.length; i++) {
//       await client.chat.postMessage({
//         channel: userId[i],
//         text: `Hello, I'm CHAOSS BOT!`,
//       });
//     }
//   } catch (error) {
//     console.error(error);
//   }
// });

// // Put users into the JavaScript object
// let userId = [];

// function saveUsers(usersArray) {
//   usersArray.forEach(function (user) {
//     // Key user info on their unique user ID
//     userId.push(user['id']);

//     // Store the entire user object (you may not need all of the info)
//     usersStore[userId] = user;
//     console.log(userId);
//   });
// }

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
