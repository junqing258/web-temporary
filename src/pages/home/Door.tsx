import { useEffect, useState } from 'react';

const Door: React.FC = () => {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    setNumber(number + 1);
    setNumber(number + 1);
    console.log('number', number);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>{number}</h1>
    </div>
  );
};

export default Door;
