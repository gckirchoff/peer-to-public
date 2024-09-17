import type { Modify } from '$lib/types/util';

export interface WastewaterReport {
	date: string;
	value: number;
}

export type UnprocessedWastewaterReport = Modify<
	WastewaterReport,
	{
		value: string;
	}
>;

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

// index corresponds to row index + 2 in google drive Biobot Wastewater Levels sheet
export const stoppingPoints: StoppingPoint[] = [
	{
		index: 2,
		description:
			'The WHO declares COVID-19 to be a global pandemic. At this point, we know that SARS-CoV-2 is most closely related to SARS-CoV-1, that it infects ACE-2 receptors on the endothelial linings, and that transmission is airborne.',
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
		index: 2,
		description:
			'It is established that SARS-CoV-1 frequently causes long term health problems. However, SARS-CoV-2 is compared to the flu and common cold, not SARS-1. Fox News describes COVID-19 as a flu-like illness that has killed "a small fraction of the number of people that the flu kills every year." This statement is particularly egregious given that COVID-19 has just begun.',
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
		index: 2,
		description:
			'',
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
			"As previously mentioned, SARS-CoV-2's predecessor, SARS-CoV-1, did spread in the air. Numerous case reports have already been published about SARS-CoV-2 exhibiting airborne spread. Despite this evidence and disregarding the precautionary principle, the WHO releases a fact-check stating that COVID-19 is NOT airborne.",
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
		index: 8,
		description:
			'Many governments are embracing the doctrine of "flatten the curve." This approach prioritizes public health infastructure over individual health. The goal is not necessarily to decrease the amount of people infected, but the rate at which they are infected as to not overwhelm the health system. COVID-19 at this point is known to infect macrophages (a component of the innate immune system), blood vessels, and heart cells. Damage to these sites can lead to immune dysfunction, myocardial dysfunction and damage, blood vessel dysfunction, plaque instability, and myocardial infarctions. It is apparently okay for individuals to experience this as long as not too many of them become burdensome once.',
		media: {
			img: 'flatten-curve.png',
			href: 'https://www.theatlantic.com/politics/archive/2020/04/coronavirus-san-francisco-london-breed/609808/',
			alt: 'Article describing city success',
		},
		science: {
			img: 'april-2020-cardiac.png',
			href: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7197627/',
			alt: 'Study describing COVID-19 cardiac complications',
		},
	},
	{
		index: 12,
		description:
			'Herd immunity becomes a goal that supports the supposedly positive aspects of being infected. This idea is promoted by political leaders and corporations who support the use of Laissez-faire socioeconomic principles and social darwinism as a means of public health disease control. It also makes the grand assumption that the disease that is rampantly spreading across the planet will go away all by itself through "natural processes" and gives no consideration to mutation derived immune escape. This is the reason antibiotic-resistant bacteria is such a large and ongoing public health issue. It also disregards the serious threat of long-term injury from contracting COVID-19.',
		media: {
			img: 'may-2020-herd-immunity.png',
			href: 'https://www.cnbc.com/2020/05/20/coronavirus-investor-ricky-sandler-pushes-herd-immunity-after-fund-loses-billions.html',
			alt: 'Hedge Fund Manager Supports Herd Immunity',
		},
		science: {
			img: 'june-2020-neuro.png',
			href: 'https://alzres.biomedcentral.com/articles/10.1186/s13195-020-00640-3',
			alt: 'Study describing potential long-term neurological consequences of COVID-19',
		},
	},
	{
		index: 22,
		description:
			'The UK launches "eat out to help out" to exchange the safety of its citizens for the financial stability of the restaurant industry.',
		media: {
			img: 'august-2020-eat-out.png',
			href: 'https://amp.theguardian.com/business/2020/aug/11/covid-19-eat-out-to-help-out-used-10m-times-in-schemes-first-week?fbclid=IwAR2N7K0IuEPE0X_P1ZTKuFwhMgmjvb27Ja27GvTYcRrarU79zv1MG1s1-ss',
			alt: 'Rishi Sunak launches eat out to help out',
		},
		science: {
			img: 'nov-2020-korean-restaurant.png',
			href: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7707926/?fbclid=IwAR194OAsoSPpmBV_9GGVsnOmHvkgW-NVH5N-hMEbG-pW6a5qzFx5tVRF4eE',
			alt: 'Study describing spread of COVID-19 in restaurant setting',
		},
	},
	{
		index: 25,
		description:
			'The UK government "prepares to launch a publicity drive to persuade the public to return to the office". Many governments are acting similarly due to financial pressures, despite research showing that working in offices is not safe.',
		media: {
			img: 'august-2020-return-to-office.png',
			href: 'https://www.theguardian.com/politics/2020/aug/28/grant-shapps-safe-to-return-to-work-in-offices-in-england-coronavirus?fbclid=IwAR1TYNqzEMGEUCNJJ92TstpisdAt8glLKO2xRUR35rjCizn29v1NG0ifJ9U',
			alt: 'Grant Shapps says it is safe to return to work in offices',
		},
		science: {
			img: 'august-2020-call-center.png',
			href: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7392450/?fbclid=IwAR1D9op3Q9HoE-_NRV3Glksapa6zwOV9vfBmPGRIwDHl9xXszTOjGZI7nEs',
			alt: 'Study describing outbreak in call center',
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
