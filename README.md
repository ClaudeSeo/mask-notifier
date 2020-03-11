# mask-notifier

- 집 근처 약국 마스크 수량을 텔레그램으로 알려주는 봇이다.
- 오전 10시 ~ 오후 4시까지 1시간에 한번씩 알림을 발송한다.

## 설치 방법

1. 프로젝트를 내려 받는다.

```sh
$ git clone https://github.com/ClaudeSeo/mask-notifier.git
```

2. 모듈을 설치한다.

```sh
$ npm install
```

## 실행 방법

1. 로컬 환경 설정 파일을 추가ㅎ 한 후 환경에 맞게 수정한다.

```sh
$ cp config.sample.json config.development.json

$ cat config.development.json
{
    "KAKAO_API_KEY": "",
    "TELEGRAM_BOT_TOKEN": "",
    "TELEGRAM_BOT_CHAT_ID": "",
    "ADDRESS": "서울특별시 강남구 강남대로 396"
}
```

2. 실행한다.

```sh
$ npm run invoke
```

## 배포 방법

1. 배포 환경 설정 파일을 추가 한 후 환경에 맞게 수정한다.

```sh
$ cp config.sample.json config.production.json

$ cat config.production.json
{
    "KAKAO_API_KEY": "",
    "TELEGRAM_BOT_TOKEN": "",
    "TELEGRAM_BOT_CHAT_ID": "",
    "ADDRESS": "서울특별시 강남구 강남대로 396"
}
```

2. 배포한다.

```sh
$ npm run deploy:prod
```
