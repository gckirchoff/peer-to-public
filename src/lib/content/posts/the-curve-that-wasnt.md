---
title: "The Curve that Wasn't"
description: "\"It's tough to make predictions, especially about the future\" - Yogi Berra"
categories: [ "covid-19", "statistics" ]
authors: [ "Gregory Kirchoff", "Arijit Chakravarty" ]
coverImage: "flatten-the-curve.png"
date: '2023-12-30'
published: true
updated: '2024-01-20'
---
<script> // usables
	import RecipeCard from '$lib/components/usables/RecipeCard/RecipeCard.svelte';

  import CovidCoins from '$lib/components/internal/projects/CovidCoins/CovidCoins.svelte';
</script>

## Assumptions

An initial hope, and now a delusion, was and is that the Covid-19 pandemic would largely recede by its own accords. It began as "flatten the curve." This pseudo-compassionate doctrine worked under the premise that roughly the same number of people would be infected by the second SARS coronavirus, but as long as it wasn't enough infections at once as to overwhelm the healthcare system, this was fine. And then the curve was planned to go back down to zero. This plan seems much more concerned with healthcare infastructure than personal health and well-being, because it doesn't address any concerns about the non-ICU-bed-taking effects of Covid-19 infections such as symptomatic Long Covid and Covid's long-term effects on nearly every organ system.

Herd immunity. Again, the assumption that this will go away through a "natural" course. Maybe this would be possible if we all lived in remote villages with a max of 50 to 200 people and minimal inter-community communication. Therefore the maximum amount of infections/mutation events the virus could go through before returning  back to you (should you have been previously infected) would likely be insufficient to garner enough immune escape to cause reinfection. With airplanes and frequent travel causing our big game of virus telephone to have a player count in the billions, there are enough hosts to provide ample room for immune escape to sporadically arise and little chance to encounter dead end hosts. Similar to the first point, this "theory" requires us to get infected to find out how valid it is.

There exists a hope that the virus will mutate to become more mild because it will become "endemic." Endemic HIV hasn't evolved into a common cold yet. I don't want to see for myself if the near 100% fatality rate of endemic rabies has improved yet. It wouldn't be advisable for affected nations to embrace geographically endemic Malaria. It is [far from guaranteed](https://www.biorxiv.org/content/10.1101/2023.01.16.523994v1) that bacteria and viruses evolve to become commensal with their hosts. If this was the case, we shouldn't need to worry about antibiotic-resistance. Once again, this theory requires deliberate exposure to the virus to validate.

## Where We Stand

Where we stand now is that all of these previous theories have not come to the rescue yet, and likely never will. This means we live in a world with constant risk of exposure to an airborne vascular disease. The simple reality is that we will continue to be infected with this disease for the foreseeable future if efforts are not taken to avoid it.

How bad is this? The chance of death is low for a 30 year old contracting Covid-19, for example. A chance of 2-15% might even sound low for getting symptomatic Long Covid after a covid infection. Here lies the difficulty of assessing probability over time. Time is what makes 1% dangerous. Say you partake in an activity that has a 1% chance of mortality once a day every day. You won't make it to the end of the year. The calculations come out to a 95% chance of dying in roughly 300 days ((Log10(0.05))/Log10(1-0.01) = 298 days). Understanding risk over time, you wouldn't want to get on an airplane if they had a 1% chance of crashing each time. You also wouldn't want to live in a world with unrestricted covid.

<CovidCoins mode="outlook" />

## Methodology

The infection fatality rate (IFR) for Covid-19 comes from [this study](https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(21)02867-1/fulltext#seccestitle140) published by The Lancet.The IFRs from this study were derived before vaccine availability. To account for this and the fact that [most Americans](https://www.usnews.com/news/health-news/articles/2023-07-05/more-than-three-quarters-of-americans-16-and-older-have-been-infected-with-covid-cdc#:~:text=Health%20News-,More%20Than%20Three%2DQuarters%20of%20Americans%2016%20and%20Older,Been%20Infected%20With%20COVID%3A%20CDC&text=July%205%2C%202023%2C%20at%207%3A13%20a.m.&text=WEDNESDAY%2C%20July%205%2C%202023%20(,once%2C%20new%20government%20data%20shows)) have already been infected with Covid-19, All IFRs were decreased five-fold in accordance with [this pre-print](https://www.medrxiv.org/content/10.1101/2023.02.26.23286471v2.full.pdf) to account for the fact that people experiencing a Covid-19 infection now most likely have some prior immunity against death due to prior vaccination, infection, or both. These are the underlying calculations behind "Office Worker During Pandemic." This, if anything, may be an undercount because it assumes the only cause of death that can be experienced is due to Covid-19 infections (from either one or two a year - described below), rather than also including other factors such as risk of mortality due to motor vehicle incidents, cancer, other transmissible diseases, etc.

The initial symptomatic Long Covid rate was derived from [this study](https://www150.statcan.gc.ca/n1/pub/75-006-x/2023001/article/00015-eng.htm) by Statistics Canada.

The average person who does not take precautions is expected to receive two Covid-19 events on average per year. These events are either vaccination or infection. Getting vaccinated once a year displaces one infection on average per year. The result is that the average vaccinated person gets infected once per year on average, while the average unvaccinated individual is expected to get an average of 2 infections per year. [Source](https://www.medrxiv.org/content/10.1101/2023.01.22.23284884v1.full.pdf).

For the purpose of visual at-a-glance interpretability, probabilities are represented as the chance of getting all heads for N number of coins flipped. The equation for deriving this is Log10(p)/Log10(0.5).

The probability of death for "Office Worker Pre Pandemic" was calculated by averaging the proportion of 2018 deaths from the [U.S Bureau of Labor Statistics](https://www.bls.gov/news.release/cfoi.t03.htm) for management occupations, business and financial operations occupations, computer and mathematical occupations, community and social services occupations, and educational instruction and library occupations.
