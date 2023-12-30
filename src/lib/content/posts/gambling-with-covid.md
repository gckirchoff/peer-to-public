---
title: "Gambling with Covid"
description: "It's been said the chances of getting Long Covid is a 'roll of the dice' each time you are infected. How many times can we expect to be able to play this game?"
categories: [ "covid-19", "statistics" ]
authors: [ "Gregory Kirchoff", "Arijit Chakravarty" ]
coverImage: "coin-stack-ibrahim-rifath-unsplash.jpg"
date: '2023-12-21'
published: true

---
<script> // usables
	import RecipeCard from '$lib/components/usables/RecipeCard/RecipeCard.svelte';

  import CovidCoinsInstanceOnly from '$lib/components/internal/projects/CovidCoins/CovidCoinsInstanceOnly.svelte';
  
</script>

"You need to weigh the pros and cons," "everything has risk associated with it," and  "you can't live your life in fear." These sentiments are different forms of individual perception of risk, and are, more importantly, the officially condoned methods of pandemic control by the CDC. The CDC has stated that "understanding your risk [of contracting COVID-19] helps you make decisions." [Source](https://www.cdc.gov/coronavirus/2019-ncov/your-health/understanding-risk.html).  There are numerous, glaringly obvious flaws with this individualist, citizen-driven approach. The average citizen is not a medically trained professional or statistician. There are self-explanatory reasons why physicians, the ones most commonly responsible for our personal health, require extensive higher education and training. Nonetheless, their training and understanding revolves around established practices, many of which have existed for decades. The expectation that untrained individuals could have a comprehensive understanding of a novel pathogen, whose long-term effects lack years of extensive research, is delusional. Notice how the CDC doesn’t say that understanding your risk helps you make “good decisions.”

People can only make decisions based on what they know. This is further exacerbated by the fact that certain crucial pieces of information have not been disclosed to the public as much as they should have. President Joe Biden has not publicly said the words “Long Covid” more than 3 times since taking office [[source](https://youtu.be/RZUBLTph5uw?si=yXc8fPMvRrUjR3aR&t=490)] even though 4 million [[source](https://www.brookings.edu/articles/new-data-shows-long-covid-is-keeping-as-many-as-4-million-people-out-of-work/)] American workers are out of work due to Long Covid and the CDC said that approximately 1 in 5 adults over the age of 18 have a health condition that may have been related to a previous covid infection [[source](https://www.cdc.gov/mmwr/volumes/71/wr/mm7121e1.htm)], which makes sense thanks to the ample research showing that Covid has profound effects on almost [every organ-system](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9839201/). If the current administration wanted us to make informed decisions for ourselves, this information would be common knowledge.

Getting symptomatic Long Covid has been referred to as a “roll of the dice” - a game of chance. It’s a phrase that rolls off the tongue and elicits easy head nods, but becomes harder to understand the more you think about it. Are these rolls related to each other? Does the chance of Long Covid go up after each infection? How many times are we rolling these dice? How many times can we expect to be infected?

One way to look at the riskiness of a situation is to flip some coins. The chance of flipping a coin and having it land heads-up is 50%. The chance of flipping two and having both land heads-up is 25%. To put this into perspective, imagine being at the foot of Mount Everest. You know many have died attempting to summit its peak, so you wonder what your chances are of meeting the same end. Take out five coins and throw them all into the air. If they all land heads-up, you die. There is a 3% chance of this happening. Say your chances are good– they don’t all land heads-up– and you go up and down the mountain scott-free. That doesn’t mean your next journey up Everst will go as smoothly. You can throw those five coins in the air the second time and not be so lucky. You can expect to go up the mountain 18 times until your total risk of dying on Mount Everest goes above 50%. Attempting the summit more than that starts to stack the odds against your favor. It takes an entire 77 excursions until we can be 95% confident that you will die on Mount Everest. The numbers are roughly the same for a 68 year old dying after getting infected with Covid-19.

Explore the below visualization to gain a better understanding of the relative risks of various outcomes.

<CovidCoinsInstanceOnly />
