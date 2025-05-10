import { useState, useEffect } from 'react';
import ProfileCard from '../components/dashboard/ProfileCard';

const InvestorDashboard = () => {
  const [entrepreneurs, setEntrepreneurs] = useState([]);

  useEffect(() => {
    // Mock API call
    const mockEntrepreneurs = [
      {
        id: 'ent1',
        name: 'Sarah Entrepreneur',
        startup: 'Tech Innovations Inc.',
        pitch: 'Revolutionary AI platform for small businesses',
        fundingNeed: '$500,000',
        industry: 'Artificial Intelligence'
      },
      {
        id: 'ent2',
        name: 'Mike Founder',
        startup: 'Green Energy Solutions',
        pitch: 'Sustainable energy solutions for urban areas',
        fundingNeed: '$1,200,000',
        industry: 'Clean Energy'
      }
    ];
    setEntrepreneurs(mockEntrepreneurs);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Discover Entrepreneurs</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {entrepreneurs.map(entrepreneur => (
          <ProfileCard 
            key={entrepreneur.id}
            user={entrepreneur}
            userType="entrepreneur"
            showMessageButton
          />
        ))}
      </div>
    </div>
  );
};

export default InvestorDashboard;