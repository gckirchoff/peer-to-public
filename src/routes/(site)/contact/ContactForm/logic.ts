import { getRandomInt } from '$lib/utils/logic';
import { operations } from './constants';

const randOperation = () => operations[getRandomInt(0, operations.length - 1)];

export const getChallenge = () => {
	const num1 = getRandomInt(1, 10);
	const num2 = getRandomInt(1, 10);
	const num3 = getRandomInt(1, 10);

	const operation1 = randOperation();
	const operation2 = randOperation();
	const operations = [operation1, operation2];

	const answer = [num2, num3].reduce((acc, num, i) => {
		const operation = operations[i];
		switch (operation) {
			case '+':
				return acc + num;
			case '-':
				return acc - num;
		}
	}, num1);

	const question = `${num1} ${operation1} ${num2} ${operation2} ${num3} =`;

	return {
		question,
		answer,
	};
};
