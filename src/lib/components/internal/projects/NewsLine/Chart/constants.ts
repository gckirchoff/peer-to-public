export interface Article {
	img: string;
	href: string;
	description: string;
}

export interface StoppingPoint {
	index: number;
	media: Article;
	science: Article;
}

export const stoppingPoints: StoppingPoint[] = [
	{
		index: 39,
		media: {
			img: 'kids-in-schools.png',
			href: 'https://www.cjonline.com/story/news/education/2020/12/08/state-board-of-ed-elementary-schools-should-stay-open-regardless-of-covid-19-spread/43262919/',
			description:
				'Kansas State Board of Education states that children must be present for in-person instruction citing that the virus does not "take hold as easily among younger students" according to public health "experts," including the Kansas Department of Health and Environment.',
		},
		science: {
			img: 'chop-pediatric-biomarkers.png',
			href: 'https://www.chop.edu/news/chop-researchers-find-elevated-biomarker-related-blood-vessel-damage-all-children-sars-cov-2?fbclid=IwAR2WjS8OdLGNQ2B1Tvqlr1ypm6to9JOWYIqx9quV7GPlL2rEs1g6MjGzLnA',
			description:
				'Researchers find elevated levels of C5b9, a marker of blood vessel damage, in children with mild and even asymptomatic COVID-19 infections.',
		},
	},
	{
		index: 200,
		media: {
			img: '',
			href: '',
			description: '',
		},
		science: {
			img: '',
			href: '',
			description: '',
		},
	},
];
