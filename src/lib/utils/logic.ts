export const ensureTargetIsArray = <T>(target: T | T[]): T[] => {
	if (!target) return [];

	return Array.isArray(target) ? target : [target];
};
