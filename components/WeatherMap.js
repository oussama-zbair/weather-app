import dynamic from 'next/dynamic';

// Dynamically import the client-side map component
const WeatherMapClient = dynamic(() => import('./WeatherMapClient'), { ssr: false });

const WeatherMap = (props) => {
  return <WeatherMapClient {...props} />;
};

export default WeatherMap;
