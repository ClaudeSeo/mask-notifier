module.exports = Object.freeze({
  kakaoApiKey: process.env.KAKAO_API_KEY,
  telegram: {
    token: process.env.TELEGRAM_BOT_TOKEN,
    chatId: process.env.TELEGRAM_BOT_CHAT_ID,
  },
});
