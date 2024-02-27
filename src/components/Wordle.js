import React, { useEffect } from 'react';
import useWordle from '../hooks/useWordle';

// components
import Grid from './Grid';
import Keypad from './Keypad';

export function Wordle({ solution }) {
	const { currentGuess, guesses, turn, isCorrect, usedKeys, handleKeyup } = useWordle(solution);

	useEffect(() => {
		window.addEventListener('keyup', handleKeyup);

		if (isCorrect) {
			console.log('nice');
			window.removeEventListener('keyup', handleKeyup);
		}

		if (turn > 5) {
			console.log('ggs');
			window.removeEventListener('keyup', handleKeyup);
		}

		return () => window.removeEventListener('keyup', handleKeyup);
	}, [handleKeyup, isCorrect, turn]);

	return (
		<div>
			<Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
			<Keypad usedKeys={usedKeys} />
		</div>
	);
}
