---
title: "Covid as a Top Cause of Death"
description: "Mortality chart"
categories: [ "covid-19" ]
authors: [ "Emma Schaale", "Gregory Kirchoff" ]
coverImage: "causeOfDeathChart.png"
date: '2023-12-30'
published: false
updated: '2024-01-08'
---
<script> // usables
	import RecipeCard from '$lib/components/usables/RecipeCard/RecipeCard.svelte';
import CauseOfDeathChart from '$lib/components/internal/projects/CauseOfDeath/CauseOfDeathChart.svelte';
</script>

In 2020, the WHO listed COVID-19 as the third leading cause of death, preceded by heart disease and cancer. However, these are categories that encompass many different illnesses such as lung cancer, stroke, and kidney cancer. COVID-19 is the disease caused by the single virus: SARS-CoV-2. It therefore makes sense to compare all causes of death as individual entities, rather than comparing singular causes to entire categories.

<CauseOfDeathChart />

Something else to keep in mind is that COVID-19 is [increasing](https://newsroom.heart.org/news/covid-toll-realized-cvd-deaths-take-big-jump-especially-among-certain-populations#:~:text=25%2C%202023%20%E2%80%94%20The%20number%20of,2019%20to%20928%2C741%20in%202020.) the death toll of cardiovascular complications. This is because SARS-CoV-2 can infect and replicate within the [arterial walls](https://www.nih.gov/news-events/nih-research-matters/how-sars-cov-2-contributes-heart-attacks-strokes).

It is important to be aware of this when reading [the CDC](https://www.cdc.gov/mmwr/volumes/72/wr/mm7218a3.htm#:~:text=During%202022%2C%20the%20three%20leading,218%2C064) announcement that COVID-19 was the fourth leading cause of death in 2022. The relative and absolute toll of this disease still remains higher than it appears due to the illusion created by comparing categories to singular causes of death, and the fact that COVID-19 is increasing the death rate from heart disease and maybe even [cancer](https://www.sciencedirect.com/science/article/pii/S0300908423001360?fbclid=IwAR2SrX8vKYxZf0_-Ia83L3TEu_1EIbVjJLpTv4Sahn93U5PGmX6i6TCKlbc). Even without these factors, the fourth leading cause of death is nothing to scoff at, especially when it is airborne and highly infectious. Thankfully, the ability to avoid infection is a choice that can be made by individuals and societies.


## Methodology

Base mortality numbers came from[ 2020 CDC mortality report](https://www.cdc.gov/nchs/data/databriefs/db427-tables.pdf#1). The stratified view of heart disease comes from[ this report](https://www.ahajournals.org/doi/10.1161/CIR.0000000000001123#F14-1) from the AHA. The stratified view of cancer comes from [this report](https://gis.cdc.gov/Cancer/USCS/#/AtAGlance/) from the CDC.
