const SearchHistory = ({ history, onSelect }) => {
    return (
      <div className="mt-4">
        <h3 className="text-lg font-bold text-gray-700 mb-2">Recent Searches</h3>
        <ul className="list-disc pl-4 text-gray-600">
          {history.map((city, index) => (
            <li
              key={index}
              className="cursor-pointer hover:text-blue-600 transition-all"
              onClick={() => onSelect(city)}
            >
              {city}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default SearchHistory;
  