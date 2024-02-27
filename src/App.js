import { useEffect, useState } from 'react';
import { Wordle } from './components/Wordle';
import { supabase } from './components/supabaseClient'

function App() {
	const [solution, setSolution] = useState(null);

	useEffect(() => {
    const fetchSolution = async () => {
      let { data: solutions, error } = await supabase
        .from('solutions')
        .select('*');

      if (error) {
        console.error('Error fetching solutions:', error);
      } else {
        const randomSolution = solutions[Math.floor(Math.random() * solutions.length)];
        setSolution(randomSolution.word);
      }
    };

    fetchSolution();
  }, []);



	return (
		<div className='App'>
			<h1>Wortel </h1>
			{solution && <Wordle solution={solution} />}
		</div>
	);
}

export default App;
