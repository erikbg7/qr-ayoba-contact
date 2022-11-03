import React, { useEffect, useState } from 'react';
import { QrCodeVCard } from './components/QrCodeVCard';
import { QrCodeVCardSkeleton } from './components/QrCodeVCardSkeleton';
import { useAyobaProfile } from 'ayoba-microapps-react/lib/hooks/useAyobaProfile';

const App = () => {
  const profile = useAyobaProfile();
  const [showSkeleton, setShowSkeleton] = useState(true);
  const { nickname = 'Unknown', msisdn = '' } = profile;
  const isLoading = (!nickname && !msisdn) || showSkeleton;

  useEffect(() => {
    const id = setTimeout(() => setShowSkeleton(false), 600);
    return () => clearTimeout(id);
  }, []);

  return (
    <main className="flex flex-col justify-center items-center h-[100vh]">
      {!isLoading && <QrCodeVCard nickname={nickname} phone={msisdn} />}
      {isLoading && <QrCodeVCardSkeleton />}
      <p className="text-lg text-gray-400 mt-8 mb-20">Scan the QR code to add the contact</p>
    </main>
  );
};

export default App;
