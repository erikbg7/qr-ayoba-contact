import React from 'react';
import { QrCodeVCard } from './components/QrCodeVCard';
import { QrCodeVCardSkeleton } from './components/QrCodeVCardSkeleton';

const profile = {
  nickname: 'Nickname',
  phone: '+00000000000',
  // phone: '+00123456789',
};

const handleMsisdn = () => {
  const ayobaApi = (window as any)?.Ayoba;
  const msisdn = ayobaApi?.getMsisdn?.();
  const nickname = ayobaApi?.getNickname?.();
  return { msisdn, nickname };
};

const handleMsisdn2 = () => {
  const ayobaApi = (window as any)?.Ayoba;
  console.log('get msisdn from app');
  const msisdn = ayobaApi?.getMsisdn?.();
  const nickname = ayobaApi?.getNickname?.();
  alert(msisdn.concat(nickname));
};

const App = () => {
  React.useEffect(() => {
    const intervalID = setInterval(() => {
      const { msisdn, nickname } = handleMsisdn();
      if (msisdn) {
        clearInterval(intervalID);
      }
    }, 100);

    return () => clearInterval(intervalID);
  });

  return (
    <main className="flex flex-col justify-center items-center h-[100vh]">
      <QrCodeVCard nickname={profile.nickname} phone={profile.phone} />
      {/*<QrCodeVCardSkeleton />*/}
      <p className="text-lg text-gray-400 mt-8 mb-20">Scan the QR code to add the contact</p>
      <button onClick={handleMsisdn2}>Click</button>
    </main>
  );
};

export default App;
