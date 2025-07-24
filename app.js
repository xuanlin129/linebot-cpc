import 'dotenv/config';

import linebot from 'linebot';
import express from 'express';
import station from './command/station.js';
import oilPrice from './command/oil-price.js';

const app = express();
const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});

bot.on('message', async function (event) {
  if (event.message.type === 'location') {
    // 直營站訊息
    station(event);
  } else if (event.message.type === 'text') {
    // 傳送位置
    if (event.message.text === '中油直營站查詢') {
      event.reply({
        type: 'text',
        text: '請提供位置訊息',
        quickReply: {
          items: [
            {
              type: 'action',
              action: {
                type: 'location',
                label: '發送位置',
              },
            },
          ],
        },
      });
    }

    // 油價訊息
    if (event.message.text === '油價查詢') {
      oilPrice(event);
    }
  }
});

app.get('/ping', (req, res) => {
  if (req.query.key !== process.env.PING_SECRET) {
    return res.status(403).send('Forbidden');
  }
  res.send('pong');
});

app.post('/', bot.parser());

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動');
});
