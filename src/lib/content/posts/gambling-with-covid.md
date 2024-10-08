---
title: "Gambling with Covid"
description: "This post challenges the idea that individuals can fully understand and manage their own risk without proper information, highlighting the dangers of incomplete knowledge in pandemic decision-making."
categories: [ "covid-19" ]
authors: [ "Gregory Kirchoff", "Arijit Chakravarty" ]
coverImage: "coin-stack-ibrahim-rifath-unsplash.jpg"
date: 'Wed Aug 14 2024 19:57:10 GMT-0400 (Eastern Daylight Time)'
published: false
updated: 'Wed Sep 18 2024 20:40:31 GMT-0400 (Eastern Daylight Time)'
---
<script> // usables
	import RecipeCard from '$lib/components/usables/RecipeCard/RecipeCard.svelte';

  import CovidCoins from '$lib/components/internal/projects/CovidCoins/CovidCoins.svelte';
  
</script>



The chart below visualizes risk by illustrating the probability of consecutive coin tosses landing heads up. Each individual coin toss has a 50% chance of landing heads, but with each additional consecutive heads, the probability decreases sharply. For example, the probability of getting heads twice in a row is 25%, while three consecutive heads drops to just 12.5%. The more consecutive heads you're aiming for, the lower the likelihood.

Take skydiving as an example: there's a 0.023% chance of injury. Translating this into coin tosses, it's like flipping 12 coins and having all of them land heads up—making skydiving the least risky activity in the chart. As activities become riskier, the equivalent number of consecutive heads decreases.

To make the concept more tangible, try it yourself: simulate the risk of an activity by flipping its stack of coins. How many times can you do this to get lucky—or unlucky?

<CovidCoins mode="instance" />

## The Illusion of "Pros and Cons"

"You need to weigh the pros and cons," "everything has risk associated with it," and  "you can't live your life in fear." These phrases represent common perceptions of risk, and and they reflect the CDC's officially endorsed methods for pandemic management. The CDC has stated that "understanding your risk [of contracting COVID-19] helps you make decisions." [Source](https://archive.cdc.gov/www_cdc_gov/coronavirus/2019-ncov/your-health/understanding-risk_1709314735.html).  You'll notice that they don't specify that you'll make "good decisions." There are significant, glaring flaws with this individualistic, citizen-driven approach that explain why they don't expose themselves to that liability.

The average citizen is neither a medical professional nor a statistician. Physicians, who are most commonly responsible for our health, undergo extensive higher education and training for good reason. Their expertise is grounded in well-established practices, many of which have been developed over decades. Expecting untrained individuals to fully understand the risks associated with a novel pathogen - especially one with long-term effects that are not yet fully researched - and to make associated "good decisions" is unrealistic.

People can only make decisions based on what they know, and that knowledge is often incomplete. The problem is compounded when crucial information is not adequately communicated to the public. For example, president Joe Biden [has not](https://www.youtube.com/watch?v=RZUBLTph5uw&t=490s) openly discussed "Long Covid" to the public since taking office despite the fact that [4 million](https://www.brookings.edu/articles/new-data-shows-long-covid-is-keeping-as-many-as-4-million-people-out-of-work/) American workers are out of work due to Long Covid. The CDC reports that approximately [1 in 5](https://www.cdc.gov/mmwr/volumes/71/wr/mm7121e1.htm) adults over 18 have a health condition possibly linked to a previous covid infection, which aligns with research showing that COVID-19 can affect nearly [every organ-system](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9839201/). If the current administration truly wanted us to make informed decisions, this information would be common knowledge.

## The Game of Chance: Understanding COVID-19 Risks

Getting symptomatic Long Covid has often been described as a "roll of the dice" - a game of chance. While this phrase might elicit nods of agreement, it becomes more complex the deeper you think about it. Are these dice rolls independent of each other? Does the chance of Long Covid increase with each subsequent infection? How many times are we expecting to roll these dice? How many times can we anticipate being infected?

One way to conceptualize risk is through the analogy of flipping coins. The chance of a single coin landing heads-up is 50%. The probability of flipping two coins and getting heads on both is 25%. To put this in perspective, imagine being in Pamplona waiting for the rocket to go off signaling that the bulls are being released, aware of the many who get injured during the event. Now, take five coins and toss them into the air. If they all land heads-up, you get injured during the race - around a 3% chance. Say you're lucky this time - the coins don't all land heads-up, and you finish the run safely. This doesn't guarantee that your next attempt will be as fortunate. You can throw those five coins again at your next event and not be so lucky.

Statistically, you can expect to run with the bulls 18 times before your cumulative risk of injury exceeds 50%. Beyond that point, the odds begin to stack against you. It takes 77 excursions before you can be 95% confident that you will get injured.

For such a seemingly dangerous sport, those numbers aren't that bad. The per-infection chance of developing symptomatic Long Covid is 14.6% according to [Statistics Canada](https://www150.statcan.gc.ca/n1/pub/75-006-x/2023001/article/00015-eng.htm). With these numbers, you can get infected with SARS-Cov-2 4 times before your risk of Long Covid approaches a 50/50 chance. After 19 infections, your cumulative risk approaches near certainty at 95%.

I would rather run with the bulls.

## Methodology

The infection fatality rate (IFR) for Covid-19 was sourced from [this study](https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(21)02867-1/fulltext#seccestitle140) published by The Lancet. Since these IFRs were derived before vaccines became widely available, and considering that most Americans have already been infected with COVID-19, we adjusted the IFRs by reducing them five-fold. This adjustment is based on [this pre-print](https://www.medrxiv.org/content/10.1101/2023.02.26.23286471v2.full.pdf) that accounts for the likely prior immunity most people now have due to vaccination, previous infection, or both.

The initial symptomatic Long Covid rate was derived from [this study](https://www150.statcan.gc.ca/n1/pub/75-006-x/2023001/article/00015-eng.htm) by Statistics Canada.

For the purpose of visual at-a-glance interpretability, probabilities are represented as the chance of getting all heads for N number of coins flipped. The equation for deriving this is Log10(p)/Log10(0.5).

The probability of death for "Surviving the Day" is calculated using micromorts where the ages between 20 to 80 are Floor(age / 10)-1 micromorts per day. At the age of 80, the risk becomes 100 micromorts, and each subsequent year of life adds 50 additional micromorts to the risk experienced each day. [Source](https://nc233.com/2020/03/micromorts-how-much-risk-of-death-would-you-accept/).