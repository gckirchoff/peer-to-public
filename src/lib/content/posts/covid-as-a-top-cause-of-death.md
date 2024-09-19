---
title: "Leading  Causes of Death - An Apples to Apples Comparison"
description: "COVID-19 was the third leading cause of death in 2020 and the fourth in 2022. Here, we analyze how the leading causes of death compare to each other when looked at with a more fine grain perspective."
categories: [ "covid-19" ]
authors: [ "Gregory Kirchoff", "Arijit Chakravarty", "Emma Schaale" ]
coverImage: "unsplash_an_vision_apple.jpg"
date: '2023-12-30'
published: false
updated: 'Thu Sep 19 2024 08:47:43 GMT-0400 (Eastern Daylight Time)'
---
<script> // usables
	import RecipeCard from '$lib/components/usables/RecipeCard/RecipeCard.svelte';
import CauseOfDeathChart from '$lib/components/internal/projects/CauseOfDeath/CauseOfDeathChart.svelte';
</script>

The way we appraise anything in our lives - the taste of food, the value of a car, or the risk we face from a disease - is done by comparing and contrasting the matter of interest with alternatives options, rather than through objective means. We have what is called "reference dependence." When appraising something like ice cream flavor, our judgments are often relative rather than purely objective. This means that the way we perceive and evaluate the flavor is influenced by comparisons to other flavors, past experiences, expectations, and the context in which we're tasting the ice cream. This is why, for example, a person might perceive a vanilla flavor as less exciting if they recently had a rich chocolate flavor. This is relevant because it highlights the importance of what we use as reference points when formulating thoughts or making decisions. Marketers often exploit reference dependence by setting high initial prices for products (creating a reference point) and then offering discounts. The discount is perceived as a gain relative to the high reference price, making the offer more attractive. How then should we frame our opinions and personal risk assessments of contracting SARS-CoV-2?

Given the importance of first impressions in shaping our opinions on a topic, let's examine the leading causes of death in 2020 to see how COVID-19 compares.

<CauseOfDeathChart />

As we can see from the first view, COVID-19 was the third leading cause of death in 2020. That is high, very high, but it doesn't feel as high when you see how many people died from Heart Disease. It was about half as much as Heart Disease. Seeing this doesn't make anyone feel good of course, but puts things into perspective. There appear to be much worse things out there than Covid that our time, attention, and resources should be going to instead. Perhaps we should be investing more into combating the obesity epidemic than focusing on improving indoor air quality, contact tracing, and masking.

But let's think about this a little more. Heart Disease isn't one disease. There are many different types of Heart Disease. The same goes for Cancer. There are many different types of Cancer, across many different organ systems, that respond to different drugs, have different prognoses, and prevelances. The category for "Influenza and Pneumonia" as a cause of death is obviously composed of two different causes of death. COVID-19 is one disease. It's looking like we're comparing a singular disease to umbrella categories that are composed of many different individual diseases.

We need an apples-to-apples comparison between causes of death to properly frame how dangerous we perceive COVID-19 to be.

As we can see from the fully laid out view, COVID-19 is relatively far higher in terms of the proportion of deaths it caused. It's important to note that we're still looking at the exact same absolute number of deaths from COVID-19. This just feels worse due to the different, and more accurate, framing of its impact.

Something more to keep in mind is that prior COVID-19 infection is a major risk factor for [developing heart problems](https://my.clevelandclinic.org/health/articles/heart-problems-after-covid). This means that there is potentially a substantial proportion of those who have died from Heart Disease that wouldn't have had they not been infected with SARS-CoV-2. These deaths are listed as Coronary Heart Disease, but in some sense may be better suited as Covid deaths due to the causal relationship. In addition, unlike Heart Disease or Cancer, COVID-19 is contagious. This means that efforts to protect individuals also help safeguard entire communities.

Just as marketers exploit our tendency for reference dependence to make us believe we're getting a good deal while they profit, the deliberate framing of causes of death can mislead us into thinking that COVID-19 is less deadly than it truly is.

While death is a sobering and significant metric, it is far from the only one that should shape how we perceive the pandemic's danger. By focusing solely on mortality rates, we risk overlooking the vast, long-term health impacts that COVID-19 has inflicted on millions of people. This includes chronic disabilities, lingering symptoms, and the increased risk of other serious diseases like heart problems. A focus on death creates an incomplete picture of the pandemic's true toll.

## Methodology

Base mortality numbers come from this [2020 CDC mortality report](https://www.cdc.gov/nchs/data/databriefs/db427-tables.pdf#4). The stratified view of Heart Disease and Stroke comes from [this report](https://www.ahajournals.org/doi/10.1161/CIR.0000000000001123#F14-1) from the AHA. The proportion of sub-causes from the stroke category is derived from the global ratio of stroke rates for each cause ([Source - Table 15-1](https://www.ahajournals.org/doi/10.1161/CIR.0000000000001123#R3-24)). The stratified view of Cancer comes from [this report](https://gis.cdc.gov/Cancer/USCS/#/AtAGlance/) from the CDC.
