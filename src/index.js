const _ = require('lodash');
const axios = require('axios');
const moment = require('moment');
const config = require('./config');

const KAKAO_API_URL = 'https://dapi.kakao.com/v2/local/search/address.json';
const MASK_OPEN_API_URL = 'https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json';
const REMAIN = Object.freeze({
  plenty: '100개 이상',
  some: '30 ~ 99개',
  few: '2 ~ 29개',
  empty: '1개 이하',
});

const getGeoAddr = async (address) => {
  const resp = await axios.get(KAKAO_API_URL, {
    headers: {
      Authorization: `KakaoAK ${config.kakaoApiKey}`,
      'content-type': 'application/json; charset = UTF-8',
    },
    params: {
      query: address,
    },
  });

  const parsedAddress = _.get(resp, 'data.documents.0.address');
  if (_.isEmpty(parsedAddress)) {
    throw new Error('위치 정보를 찾을 수 없습니다.');
  }

  return {
    lat: parsedAddress.y,
    lng: parsedAddress.x,
  };
};

const getMaskInfo = async (geoAddr, m = 300) => {
  const resp = await axios.get(MASK_OPEN_API_URL, {
    params: {
      ...geoAddr,
      m,
    },
  });

  return _.chain(resp)
    .get('data.stores', [])
    .map((store) => {
      const stockDate = moment(store.stock_at, 'YYYY/MM/DD HH:mm:ss');
      return {
        stockDate,
        name: store.name,
        addr: store.addr,
        remain: _.get(REMAIN, store.remain_stat, '알 수 없음'),
      };
    })
    .value();
};

const makeText = (maskInfo) => _.map(maskInfo, (it) => [
  `약국명: ${it.name}`,
  `주소: ${it.addr}`,
  `입고시간: ${it.stockDate.format('YYYY년 MM월 DD일 HH시 mm분 ss초')}`,
  `재고: ${it.remain}`,
].join('\n'))
  .join('\n\n');

const sendMessage = async (text) => {
  const url = `https://api.telegram.org/bot${config.telegram.token}/sendMessage`;
  return axios.post(url, {
    text,
    chat_id: config.telegram.chatId,
  });
};

module.exports.exec = async (data) => {
  if (_.isEmpty(data.address)) {
    throw new Error('주소 정보가 없습니다.');
  }
  const geoAddr = await getGeoAddr(data.address);
  const maskInfo = await getMaskInfo(geoAddr, 300);
  const text = makeText(maskInfo);
  await sendMessage(text);
};
