import dynamic from 'next/dynamic';

const WeatherMapClient = dynamic(() => import('./WeatherMapClient'), { ssr: false });

const WeatherMap = (props) => {
  return <WeatherMapClient {...props} />;
};

export default WeatherMap;
