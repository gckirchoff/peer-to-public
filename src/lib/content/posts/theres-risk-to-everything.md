---
title: "There's Risk to Everything"
description: "This post challenges the idea that individuals can fully understand and manage their own risk without proper information, highlighting the dangers of incomplete knowledge in pandemic decision-making."
categories: [ "covid-19" ]
authors: [ "Gregory Kirchoff", "Arijit Chakravarty" ]
coverImage: "coin-stack-ibrahim-rifath-unsplash.jpg"
date: 'Sat Dec 14 2024 14:02:15 GMT-0500 (Eastern Standard Time)'
published: true

---
<script> // usables
	import RecipeCard from '$lib/components/usables/RecipeCard/RecipeCard.svelte';

  import CovidCoins from '$lib/components/internal/projects/CovidCoins/CovidCoins.svelte';
  
</script>

We often hear the risk of death or disability associated with COVID described as being "low" or "high." Confusingly, different people can respond to the same number with very different qualifiers. Just how risky is COVID compared to other risks in our lives? We dig into that in this article.

To make it easier to relate to intuitively, we've set up the chart below to visualize risk by displaying it as the probability of consecutive coin tosses all landing heads up. Each individual coin toss has a 50% chance of landing heads, but with each additional consecutive heads, the probability of that set occurring decreases. For example, the probability of getting heads twice in a row is 25%, while three consecutive heads drops to just 12.5%. The more consecutive heads you're aiming for, the lower the likelihood.

Take skydiving as an example: there's a 0.023% chance of injury per jump. Translating this into coin tosses, it's like flipping 12 coins and having all of them land heads up—making skydiving the least risky activity in the chart. As activities become riskier, the equivalent number of consecutive heads decreases.

To make the concept more tangible, try it yourself: simulate the risk of an activity by flipping its stack of coins. How many times can you do this to get lucky—or unlucky?

<CovidCoins mode="instance" />

## The Illusion of "Pros and Cons"

"You need to weigh the pros and cons," "everything has risk associated with it," and  "you can't live your life in fear." These phrases represent common perceptions of risk, and they reflect the CDC's officially endorsed methods for pandemic management. The CDC has stated that "understanding your risk [of contracting COVID-19] helps you make decisions." [Source](https://archive.cdc.gov/www_cdc_gov/coronavirus/2019-ncov/your-health/understanding-risk_1709314735.html).  You'll notice that they don't specify that you'll make "good decisions." There are significant, glaring flaws with this individualistic, citizen-driven approach that explain why they don't make that promise.

The average citizen is neither a medical professional nor a statistician. Statisticians [often](https://scientistseessquirrel.wordpress.com/2015/10/06/why-do-we-make-statistics-so-hard-for-our-students/) [complain](https://iase-web.org/documents/papers/isi52/rams0070.pdf) that their students struggle with mastering probabilistic concepts intuitively. Expecting the public at large to fully grasp the risks associated with a novel pathogen - especially one with long-term effects that are not yet fully researched - and to make associated "good decisions" is unrealistic.

The problem is compounded when crucial information is not adequately communicated to the public. For example, President Joe Biden, during his four years in office, [never once](https://www.youtube.com/watch?v=RZUBLTph5uw&t=490s) discussed "Long COVID" with the public despite the fact that [4 million](https://www.brookings.edu/articles/new-data-shows-long-covid-is-keeping-as-many-as-4-million-people-out-of-work/) American workers are out of work due to Long COVID. The CDC reports that approximately [1 in 5](https://www.cdc.gov/mmwr/volumes/71/wr/mm7121e1.htm) adults over 18 have a health condition possibly linked to a previous COVID infection, which aligns with research showing that the SARS-CoV-2 virus can affect nearly [every organ system](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9839201/). If the current administration truly wanted us to make informed decisions, this information would be common knowledge.

## The Game of Chance: Understanding COVID-19 Risks

Getting symptomatic Long COVID has often been described as a "roll of the dice" - a game of chance. While this phrase might elicit nods of agreement, it becomes more complex the deeper you think about it. Are these dice rolls independent of each other? Does the chance of Long COVID increase, decrease, or stay roughly the same with each subsequent infection? How many times are we expecting to roll these dice? How many times can we anticipate being infected?

We can conceptualize risk through the above analogy of flipping coins. The chance of a single coin landing heads-up is 50%. The probability of flipping two coins and getting heads on both is 25%. To put this in perspective, imagine being in Pamplona, Spain waiting for the rocket to go off signaling that the bulls are being released, aware of the many who get injured during the event. Now, take five coins and toss them into the air. If they all land heads-up, you get injured during the race - around a 3% chance. Say you're lucky this time - the coins don't all land heads-up, and you finish the run safely. This doesn't guarantee that your next attempt will be as fortunate. You can throw those five coins again at your next event and not be so lucky.

Statistically, you can expect to run with the bulls 18 times before your cumulative risk of injury exceeds 50%. Beyond that point, the odds begin to stack against you. It takes 77 excursions before you can be 95% confident that you will get injured.

For such a seemingly dangerous sport, those numbers aren't that bad. The per-infection chance of developing symptomatic Long COVID is 14.6% according to [Statistics Canada](https://www150.statcan.gc.ca/n1/pub/75-006-x/2023001/article/00015-eng.htm). With these numbers, you can get infected with SARS-Cov-2 4 times before your risk of Long COVID approaches a 50/50 chance. After 19 infections, your cumulative risk approaches near certainty at 95%.

We would rather run with the bulls.

## Risk is the New Normal

You may assume that because you avoid high-risk activities like bull running, skydiving, or motorcycle riding, you can comfortably manage the risks of COVID-19. You might feel that your generally cautious lifestyle has increased your tolerance for risk, or perhaps you simply believe that the likelihood of contracting COVID-19 has significantly decreased. However, it's important to recognize that COVID-19 is still a recurring threat. Even with annual [vaccinations](https://pubmed.ncbi.nlm.nih.gov/34270597/), you are likely to face COVID-19 [each year](https://fortune.com/2022/05/25/how-often-can-you-get-covid-yearly-modeling-shows/). The effect of a yearly vaccination effectively displaces an infection event you would have gotten, but its effectiveness is largely dependent on how well your immunity aligns with the circulating variants, which is likely to change.

Consequently, your life now carries more risk than it did before the pandemic. Without taking necessary precautions, even the relatively safe life of an office worker has become riskier, potentially surpassing the personal injury risks associated with traditionally dangerous jobs such as logging and steelworking.

<CovidCoins mode="outlook" />

## Methodology

The initial symptomatic Long COVID rate was derived from [this study](https://www150.statcan.gc.ca/n1/pub/75-006-x/2023001/article/00015-eng.htm) by Statistics Canada.

For the purpose of visual at-a-glance interpretability, probabilities are represented as the chance of getting all heads for N number of coins flipped. The equation for deriving this is Log10(p)/Log10(0.5).

The chance of injury per year of being an office worker pre-pandemic is estimated by averaging the rate of injury sufficient to cause days away from work, job restriction, or transfer for professional, scientific, and technical services, finance, insurance, and real estate, and other information services from the [U.S. Bureau of Labor Statistics 2019 report](https://www.bls.gov/iif/nonfatal-injuries-and-illnesses-tables/soii-summary-historical/summary-table-1-2019-national.htm) table of incidence rates of nonfatal occupational injuries and illnesses by industry and case type.