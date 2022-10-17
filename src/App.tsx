import React from 'react';
import { QrCodeVCard } from './components/QrCodeVCard';
import { QrCodeVCardSkeleton } from './components/QrCodeVCardSkeleton';

const App = () => {
  const [profile, setProfile] = React.useState({ nickname: '', phone: '' });
  const isLoading = !profile.nickname || !profile.phone;

  React.useEffect(() => {
    const timeoutID = setTimeout(() => {
      const msisdn = document.getElementById('user-msisdn')?.innerText || '';
      const nickname = document.getElementById('user-nickname')?.innerText || '';
      setProfile({ nickname, phone: msisdn });
    }, 500);

    return () => clearTimeout(timeoutID);
  });

  return (
    <main className="flex flex-col justify-center items-center h-[100vh]">
      {!isLoading && <QrCodeVCard nickname={profile.nickname} phone={profile.phone} />}
      {isLoading && <QrCodeVCardSkeleton />}
      <p className="text-lg text-gray-400 mt-8 mb-20">Scan the QR code to add the contact</p>
    </main>
  );
};

export default App;
