export interface Article {
	img: string;
	href: string;
	alt: string;
}

export interface StoppingPoint {
	index: number;
	description: string;
	media: Article;
	science: Article;
}

export const stoppingPoints: StoppingPoint[] = [
	{
		index: 0,
		description:
			'The WHO declares COVID-19 to be a pandemic. At this point, we know that SARS-CoV-2 is most closely related to the original SARS virus, that it infects ACE-2 receptors on the endothelial linings and that transmission is airborne.',
		media: {
			img: 'pandemic-declaration.png',
			href: 'https://time.com/5791661/who-coronavirus-pandemic-declaration/',
			alt: 'WHO declares global pandemic',
		},
		science: {
			img: 'what-is-covid.png',
			href: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7081812/',
			alt: 'Description of COVID-19 from the beginning of the pandemic',
		},
	},
	{
		index: 39,
		description:
			'Researchers find elevated levels of C5b9, a marker of blood vessel damage, in all children infected with COVID-19. This includes mild and even asymptomatic COVID-19 infections. On the same day, the Kansas State Board of Education states that children must be present for in-person instruction citing that the virus does not "take hold as easily among younger students." The decision was based on the opinions of public health experts, including those in the Kansas Department of Health and Environment',
		media: {
			img: 'kids-in-schools.png',
			href: 'https://www.cjonline.com/story/news/education/2020/12/08/state-board-of-ed-elementary-schools-should-stay-open-regardless-of-covid-19-spread/43262919/',
			alt: 'Board of health states children must be in-person during pandemic',
		},
		science: {
			img: 'chop-pediatric-biomarkers.png',
			href: 'https://www.chop.edu/news/chop-researchers-find-elevated-biomarker-related-blood-vessel-damage-all-children-sars-cov-2?fbclid=IwAR2WjS8OdLGNQ2B1Tvqlr1ypm6to9JOWYIqx9quV7GPlL2rEs1g6MjGzLnA',
			alt: 'Researchers find blood vessel damage in all kids infected by SARS-CoV-2',
		},
	},
	{
		index: 198,
		description: '',
		media: {
			img: '',
			href: '',
			alt: '',
		},
		science: {
			img: '',
			href: '',
			alt: '',
		},
	},
];
