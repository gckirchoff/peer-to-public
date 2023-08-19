export interface Ingredient {
	quantity?: number;
	unit?: string;
	item: string;
	note?: string;
}

export interface Ingredients {
	title?: string;
	list: Ingredient[];
}

interface EmphasizedStep {
	emphasis: string;
	description: string;
}

export type Step = string | EmphasizedStep;
