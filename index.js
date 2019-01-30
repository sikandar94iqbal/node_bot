const SlackBot = require('slackbots');
const axios = require('axios');
var request = require('request');
var promise = require('promise');
var exec = require('child_process').exec;

const PORT = process.env.PORT || 5000
var express = require('express');
var app = express();

var routers = require('./routes/routes.js');

app.use('/', routers);

app.listen(PORT, function () {
  console.log("App is running on port " + PORT);




  // listen to every message workspace recieves
  bot.on('message', data => {
    if (data.type !== 'message') {
      return;
    }


    // ID of jenkins bot
    // To grab jenkins job status response
    //=== "BFKMWAXRT"




    if (data.bot_id) {

      var data1 = data;
      bot_info(data.bot_id).then((data) => {

        if (data == "jenkins" && orignal_text.includes("jenkins")) {

          console.log(data1.bot_id);
          console.log(data);

          var fall = "";
          var channel = data.channel;
          var colr = "";
          for (var i = 0; i < data1['attachments'].length; i++) {

            fall = data1['attachments'][i].fallback;
            colr = data1['attachments'][i].color;

          }


          single_message(orig_channel, fall, ts, bot.name, colr);


        } else {
          console.log("jus a random msg");
        }



      });


      // user id 
      // execute command on jenkins server
    } else if (data.user) {

      console.log(data);

      ts = data.ts;
      orig_channel = data.channel;
      orignal_text = data.text;
      dir = exec("curl -X POST localhost:8080/job/stuff1/build --user admin:11ef9a67870948d88e4cdd33c3e8217b59", function (err, stdout, stderr) {
        if (err) {

        }

      });


    } else {
      console.log('else condition');
    }



  });




});

const bot = new SlackBot({
  //Bot token from slack app console
  token: 'xoxb-520780954817-523184333009-ts90VvByq7SpvvUVqnSNCbEm',
  name: 'sikandar-bot'
});

// Start Handler
bot.on('start', () => {
  // const params = {
  //   icon_emoji: ':smiley:'
  // };

  // bot.postMessageToChannel(
  //   'devops',
  //   'Get Ready To Laugh With @sikandar-bot!',
  //   params
  // );
});

// Error Handler
bot.on('error', err => console.log(err));

var stuff_ts = "";
var stuff_std = "";
var orig_channel = "";
var orignal_text = "";



function single_message(channel, fall, ts, bot_name, colr) {

  var escaped_str = require('querystring').escape(fall);

  var api = 'https://slack.com/api/chat.postMessage?';
  // Add token from Slack apps console
  var token = 'token=xoxp-520780954817-523176800977-536184602912-d89a6b57c51615e106a7932840565d8c&';
  var channel_id = 'channel=' + channel + '&';
  var thread_tss = 'thread_ts=' + ts + '&';
  var text = 'text=' + escaped_str + '&';
  var pret = 'pretty=1&';
  var botname = 'username=' + 'Jenkins' + '&';
  var icon_url = 'icon_url=https://a.slack-edge.com/ae7f/img/services/jenkins-ci_512.png&';
  var attachment = 'attachments= [{"text" : "' + escaped_str + '", "color" : "' + colr + '"}] ';
  var path = api + token + channel_id + text + thread_tss + pret + botname + attachment;
  console.log(path);
  axios.get(api + token + channel_id + thread_tss + pret + botname + icon_url + attachment);
  return;
}


function bot_info(bot_id) {


  // console.log(bot_id);
  return new Promise(function (resolve, reject) {

    request('https://slack.com/api/bots.info?token=xoxp-520780954817-523176800977-536184602912-d89a6b57c51615e106a7932840565d8c&bot=' + bot_id + '&pretty=1', function (error, response, body) {
      if (!error && response.statusCode == 200) {

        var info = JSON.parse(body);
        // console.log(info['bot'].name);
        bname = info['bot'].name;
        resolve(bname);
      }
    });




  });


}


