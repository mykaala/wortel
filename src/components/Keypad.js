import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient'
export default function Keypad({ usedKeys }) {
	const [letters, setLetters] = useState([]);

	useEffect(() => {
    const fetchLetters = async () => {
      const { data, error } = await supabase
        .from('letters')
        .select('*');

      if (error) {
        console.error('Error fetching letters:', error);
      } else {
        setLetters(data.map(letter => letter.key));
      }
    };

    fetchLetters();
  }, []);

	return (
  <div className='keypad'>
    {letters.map((letter) => {
      const color = usedKeys[letter.toLowerCase()] || '';
      return (
        <div key={letter} className={`key ${color}`}>
          {letter}
        </div>
      );
    })}
  </div>
);

}
