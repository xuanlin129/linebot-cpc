import axios from 'axios';
import oil from '../template/oil.js';

export default async (event) => {
  try {
    const { data } = await axios.get('https://vipmbr.cpc.com.tw/opendata/sixtypeoillistprice');
    const oils = ['92無鉛汽油', '95無鉛汽油', '98無鉛汽油', '超級柴油'];

    const oilMsg = oil;

    data
      .filter((oil) => oils.includes(oil.產品名稱))
      .forEach((oil) => {
        const info = {
          type: 'box',
          layout: 'baseline',
          contents: [
            {
              type: 'text',
              text: oil.產品名稱,
              size: 'lg',
              flex: 2,
            },
            {
              type: 'text',
              text: `${oil.參考牌價}`,
              flex: 1,
              color: '#ff0000',
              align: 'center',
              size: 'lg',
            },
            {
              type: 'text',
              text: '元/公升',
              flex: 1,
              align: 'center',
              size: 'lg',
            },
          ],
          margin: 'md',
        };
        oilMsg.contents.body.contents.push(info);
        oilMsg.contents.footer.contents[0].contents[1].text = `${oil.牌價生效日期}`;
      });

    event.reply(oilMsg);
  } catch (error) {
    event.reply('發生錯誤');
    console.log(error);
  }
};
