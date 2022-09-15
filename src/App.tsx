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
  const vCardName = profile.name.split(' ').reverse().join(';').concat(';');

  return `BEGIN:VCARD\nVERSION:2.1\nN:${vCardName}\nFN:${vCardFormattedName}\nTEL;HOME;VOICE:${vCardPhone}\nEND:VCARD`;
};

const App = () => {
  return (
    <main className="flex flex-col justify-center items-center h-[100vh]">
      <section className="w-fit h-fit p-3 text-center bg-blue-400/90 rounded-[1rem]">
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
            height: 64,
            width: 64,
            excavate: true,
          }}
        />
        <footer className="my-4">
          <h1 className="text-gray-50 text-4xl font-semibold"> {profile.name} </h1>
          <h2 className="text-gray-300 text-2xl"> {profile.phone} </h2>
        </footer>
      </section>
      <p className="text-lg text-gray-400 mt-8 mb-20">Scan the QR code to add the contact</p>
    </main>
  );
};

export default App;
