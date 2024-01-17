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
			'The WHO declares COVID-19 to be a global pandemic. At this point, we know that SARS-CoV-2 is most closely related to the original SARS virus, that it infects ACE-2 receptors on the endothelial linings, and that transmission is airborne.',
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
		index: 1,
		description:
			'However, comparisons to the flu and common cold, rather than SARS-1, have already begun. Fox News describes COVID-19 as a flu-like illness that has killed "a small fraction of the number of people that the flu kills every year." Long term health problems following COVID-19\'s closest cousin, SARS-1, have been know for over a decade, but comparisons are not mentioned.',
		media: {
			img: 'fox-covid-vs-flu.png',
			href: 'https://www.fox5ny.com/news/flu-vs-common-cold-vs-covid-19-similar-symptoms-many-questions',
			alt: 'Fox News comparison of flu vs common cold vs COVID-19',
		},
		science: {
			img: 'sars-1-long-term.png',
			href: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7192220/',
			alt: 'Study describing long SARS',
		},
	},
	{
		index: 3,
		description:
			"As previously mentioned, SARS-CoV-2's predecessor, SARS-CoV-1, did spread in the air. Numerous case reports have already been published about SARS-CoV-2 exhibiting airborne spread. Despite this evidence, and abiding by the precautionary principle, the WHO releases a factcheck stating that COVID-19 is NOT airborne.",
		media: {
			img: 'who-fact-check.png',
			href: 'https://twitter.com/WHO/status/1243972193169616898?t=MYMdqe-2l7op2rPONbVj-g&s=19&fbclid=IwAR2jU0p9ioVivpk4Rl5RyPIbbuswZTqW2wpLVa59eNMDQdt8GGIOM8feobE',
			alt: 'World Health Organization airborne fact check',
		},
		science: {
			img: 'covid-aerosol.png',
			href: 'https://www.medrxiv.org/content/10.1101/2020.03.23.20039446v3',
			alt: 'Study describing potential airborne nature of SARS-CoV-2',
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

// who-fact-check
