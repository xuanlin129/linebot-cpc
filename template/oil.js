export default {
  type: 'flex',
  altText: '油價',
  contents: {
    type: 'bubble',
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: '油價',
          size: 'xxl',
          weight: 'bold',
          align: 'center',
        },
      ],
    },
    footer: {
      type: 'box',
      layout: 'horizontal',
      spacing: 'sm',
      contents: [
        {
          type: 'text',
          size: 'xs',
          color: '#aaaaaa',
          contents: [
            {
              type: 'span',
              text: '牌價生效日期：',
            },
            {
              type: 'span',
              text: '20250204',
            },
          ],
          align: 'center',
        },
      ],
      flex: 0,
    },
  },
};
