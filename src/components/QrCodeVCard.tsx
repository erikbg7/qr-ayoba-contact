import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import clsx from 'clsx';

type Props = {
  nickname: string;
  phone: string;
};

const getVCardData = (nickname: string, phone: string) => {
  const username = nickname.split(' ').reverse().join(';').concat(';');
  return `BEGIN:VCARD\nVERSION:2.1\nN:${username}\nFN:${nickname}\nTEL;HOME;VOICE:${phone}\nEND:VCARD`;
};

const QrCodeVCard: React.FC<Props> = (props) => {
  const qrCode = getVCardData(props.nickname, props.phone);

  return (
    <section className="w-fit h-fit p-3 text-center bg-blue-400/90 rounded-2xl">
      <QRCodeSVG
        level={'H'}
        size={256}
        value={qrCode}
        className="rounded-2xl"
        includeMargin={true}
        bgColor={'#ffffff'}
        fgColor={'#000000'}
        imageSettings={{
          src: 'https://developer.ayoba.me/_next/image?url=%2Fassets%2FLogo%2FAyobaFinalIcon.png&w=128&q=75',
          height: 64,
          width: 64,
          excavate: true,
        }}
      />
      <footer className="my-4">
        <h1 id="user-nickname" className={clsx('text-gray-50 text-4xl font-semibold ')}>
          {props.nickname}
        </h1>
        <h2 id="msisdnText" className={clsx('text-gray-300 text-2xl')}>
          {props.phone}
        </h2>
      </footer>
    </section>
  );
};

export { QrCodeVCard };
