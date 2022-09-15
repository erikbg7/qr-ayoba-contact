import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

type Profile = {
  name: string;
  phone: string;
};

const profile = {
  name: 'Erik Blanca',
  phone: '+34646070475',
};

const getVCardData = (profile: Profile) => {
  const { name: vCardFormattedName, phone: vCardPhone } = profile;
  const vCardName = profile.name.split(' ').reverse().join(';');

  return 'BEGIN:VCARD\nVERSION:2.1\nN:Blancaddd;Erik;;\nFN:Erik Blanca\nTEL;HOME;VOICE:+34646070475\nEND:VCARD';
};

const App = () => {
  return (
    <main className="flex flex-col justify-center items-center h-[100vh]">
      <section className="w-fit h-fit p-8 text-center bg-blue-400/90 rounded-2xl">
        <h1 className="text-gray-50 text-4xl font-semibold"> {profile.name} </h1>
        <h2 className="text-gray-300 text-2xl mb-6"> {profile.phone} </h2>
        <QRCodeSVG
          value={getVCardData(profile)}
          size={256}
          bgColor={'#ffffff'}
          fgColor={'#000000'}
          level={'H'}
          style={{ borderRadius: '1rem' }}
          includeMargin={true}
          imageSettings={{
            src: 'https://developer.ayoba.me/_next/image?url=%2Fassets%2FLogo%2FAyobaFinalIcon.png&w=128&q=75',
            x: undefined,
            y: undefined,
            height: 64,
            width: 64,
            excavate: true,
          }}
        />
      </section>
      <p className="text-lg text-gray-400 mt-8 mb-20">Scan the QR code to add the contact</p>
    </main>
  );
};

export default App;
