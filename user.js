const { App } = require('@slack/bolt');

const dotenv = require('dotenv');
dotenv.config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  userToken: process.env.SLACK_USER_TOKEN,
  port: process.env.PORT || 3000,
});

let usersStore = {};

app.event(async ({ client }) => {
  try {
    // Call the users.list method using the WebClient
    const result = await client.users.list();

    saveUsers(result.members);
  } catch (error) {
    console.error(error);
  }

  // Put users into the JavaScript object
  let userId = '';
  function saveUsers(usersArray) {
    // let userId = '';
    usersArray.forEach(function (user) {
      // Key user info on their unique user ID
      userId = user['id'];

      // Store the entire user object (you may not need all of the info)
      usersStore[userId] = user;
    });
  }
});
(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
