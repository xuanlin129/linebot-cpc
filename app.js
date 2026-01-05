import 'dotenv/config';

import linebot from 'linebot';
import express from 'express';
import axios from 'axios';
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
  const key = req.query.key;
  if (!key || key !== process.env.PING_SECRET) {
    return res.status(403).send('Forbidden');
  }
  res.send('pong');
});

app.post('/', bot.parser());

const port = process.env.PORT || 3000;

// Render Keep-alive
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

setInterval(async () => {
  try {
    const url = process.env.RENDER_EXTERNAL_URL
      ? `${process.env.RENDER_EXTERNAL_URL}/health`
      : `http://localhost:${port}/health`;
    await axios.get(url);
    console.log('Keep-alive ping success');
  } catch (error) {
    console.error('Keep-alive ping failed');
  }
}, 14 * 60 * 1000); // 14 minutes

app.listen(port, () => {
  console.log('機器人啟動');
});
