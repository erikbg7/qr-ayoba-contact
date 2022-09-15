import React from 'react';
import { QrCodeVCard } from './components/QrCodeVCard';

const profile = {
  name: 'Erik Blanca',
  phone: '+34123456789',
};

const handleMsisdn = () => {
  const ayobaApi = (window as any)?.Ayoba;
  const msisdn = ayobaApi?.getMsisdn?.();
  const nickname = ayobaApi?.getNickname?.();
  return { msisdn, nickname };
};

const handleMsisdn2 = () => {
  const ayobaApi = (window as any)?.Ayoba;
  const msisdn = ayobaApi?.getMsisdn?.();
  const nickname = ayobaApi?.getNickname?.();
  alert(msisdn.concat(nickname));
};

const skeletonClass = 'shadow animate-pulse rounded-xl bg-gray-700/40 text-transparent';

const App = () => {
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const intervalID = setInterval(() => {
      const { msisdn, nickname } = handleMsisdn();
      if (msisdn) {
        clearInterval(intervalID);
        setLoading(false);
      }
    }, 100);

    return () => clearInterval(intervalID);
  });

  return (
    <main className="flex flex-col justify-center items-center h-[100vh]">
      <QrCodeVCard nickname={profile.name} phone={profile.phone} />
      <p className="text-lg text-gray-400 mt-8 mb-20">Scan the QR code to add the contact</p>
      <button onClick={handleMsisdn2}>Click</button>
    </main>
  );
};

export default App;
