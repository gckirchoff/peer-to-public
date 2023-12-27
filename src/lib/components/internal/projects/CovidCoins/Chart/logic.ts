export const sameOrder = <T extends { item: string }>(arrA: T[], arrB: T[]): boolean => {
	if (arrA.length !== arrB.length) {
		// Initialize as same order so chart initially renders faster
		return true;
	}

	for (let i = 0; i < arrA.length; i++) {
		if (arrA[i].item !== arrB[i].item) {
			return false;
		}
	}

	return true;
};
