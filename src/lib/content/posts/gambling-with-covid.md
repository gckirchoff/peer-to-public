---
title: "Gambling with a Pandemic"
description: "Why gambling with a pandemic is a losing bet"
categories: [ "covid-19" ]
authors: [ "Gregory Kirchoff", "Arijit Chakravarty" ]
coverImage: "default-background-6.jpg"
date: 'Wed Oct 23 2024 17:04:49 GMT-0400 (Eastern Daylight Time)'
published: true
updated: 'Wed Oct 23 2024 22:26:18 GMT-0400 (Eastern Daylight Time)'
---
<script> // usables
	import RecipeCard from '$lib/components/usables/RecipeCard/RecipeCard.svelte';

import CrisisPredictions from '$lib/components/internal/projects/CrisisPredictions/CrisisPredictions.svelte';

</script>

In line with our current approach to the ongoing pandemic, let's go to a casino and start gambling. We know the game is rigged and that the house always wins at the end of the day, so if we win big, we should take our earnings and go home.However, suppose we're persistent and want to see things through to the end - we either win big or go broke trying. Our statistically misinformed goals have just introduced us to non-ergodic risk.

## Understanding Ergodic vs. Non-Ergodic Systems

To grasp the implications of ergodic risk in the context of pandemics, it's essential to understand what the term means.

### Ergodic Systems

In an ergodic system, given enough time, everyone's average outcome will match the group's average outcome. In other words, long-term averages converge and stabilize over time.

Imagine we have thousands of people flipping a coin a thousand times each. You may find that your first four coins land heads up - not the 50:50 ratio we'd expect - but if you stay in the game and keep flipping that coin 1,000 times, you and everyone else will experience a 50:50 ratio at the end of the day. THis is an ergodic system.

### Non-Ergodic Systems

Non-ergodic systems, by contrast, do not guarantee this outcome. Individual trajectories can deviate significantly, leading to outcomes that are not representative of the average.

The stock market is an example of a non-ergodic system. While it has an average return, you as an investor may be unlucky and lose your investments, becoming bankrupt. If financial ruin occurs and wipes out your wealth, you can't recover to achieve the long-term average return of the market.

The irreversible long-term health consequences of COVID-19 - including symptomatic Long Covid, latent health effects, and death - make this current pandemic a non-ergodic system. There are also chances of good things happening, such as stable attenuation or extinction of the virus. As we will discuss elsewhere, these outcomes are much less likely, but should they happen, they offer one way to "exit" this pandemic.

## Outcomes

These concepts are somewhat abstract, so let's try to visualize them. We'll use an epidemic and its associated fatality for demonstration purposes, but the concept is agnostic so you can interpret this as Long COVID with disability causing labor shortages in specific sectors, gambling with going bankrupt/winning big, etc.

Let's imagine that we have a population that goes through successive waves of a disease. Most waves will result in minimal mortality. However, each wave has a chance to instead be one of two special variants: it could be a highly deadly wave with an exaggerated mortality or it could go extinct/attenuate stably. The deadly waves can be interpreted as being driven by temporary, more lethal variants. Stable attenuation can be interpreted as extinction or stably/permanently evolving into an extremely mild strain that poses practically no harm.

The heat map allows you to click on squares with different combinations of these chances along with what the overall chance is that the system in question will reach a stable, happy place instead of systemic collapse. Notice how the chances of exaggerated mortality are often higher. The [reasoning](https://www.biorxiv.org/content/10.1101/2023.01.16.523994v1) for this assumption will be discussed elsewhere, but the result of this is that each type of special wave has a unique edge - exaggerated mortality waves are more likely, but you only need one attenuation wave to permanently "win" the simulation.

The second chart is a [Monte Carlo Simulation](https://en.wikipedia.org/wiki/Monte_Carlo_method) that tracks the results of 1,000 societies being put through successive waves of infections with your selected parameters. The results - whether they experience attenuation or collapse - are tracked by when they occur.

<CrisisPredictions />

## The Fallacy of "Things Getting Better Over Time"

A key takeaway is that the likelihood of a positive outcome diminishes over time. This contradicts the popular belief that coexisting with a pandemic gets better over time. This is because the population of  "productive" invididuals keeps getting chipped away at until it reaches a critical point or a miracle happens. However, this is to be expected when gambling. The only way to "win" at gambling is to get lucky quickly and then never gamble again. A previous manager of mine had a friend who won $40,000 at a casino. He asked the friend if he's finally positive, to which the friend said, "almost."

## Interpretations

There are "advanced tools" you can use to see how population growth could ammeliorate these issues at a population level. However, our population/society is composed of many subsystems like economies and corporations. A corporation for example may have negligible onboarding growth and a high sensitivity to collapse if a small number of key individuals, such as those in dev-ops at a software company, are affected by symptomatic Long COVID. Play around with the advanced tools and keep in mind what they could represent as you do.

## The Solution is to Stop Gambling

What we shouldn't do is to advise people to assess their risk factors and how much money they have to decide whether or not they should gamble until they get a terminal outcome. The game is rigged, so no matter how much money and good health you have, you are still vulnerable to bankruptcy and long-term consequences from COVID-19 at the end of the day - it may just take you a little longer to get there. This is why the CDC [says](https://archive.cdc.gov/www_cdc_gov/coronavirus/2019-ncov/your-health/understanding-risk_1709314735.html) that "understanding your risk [of contracting COVID-19] helps you make decisions" without opening themselves up to the liability of suggesting that ever taking the gamble of getting COVID-19 is a *good* decision.

The solution is to leave. Walk out the door. Stop gambling. Even if you think to yourself that you've already lost money and that people have already died, and you want to keep gambling to break even and "move past the pandemic", you have to realize that casinos and red queens' races with viruses are rigged against us. It's not too late to walk out the door and control this virus.

Gambling is ill-advised when it comes to both casinos and pandemics.

## Methodology

Heatmap data generation is done by calculating the probability of attenuation occuring before population collaspe based on several epidemiological and demographic parameters. The expected mortality is calculated as *fractionInfectedPerWave X [(1 - pExaggeratedMortality) X baselineMortality + pExaggeratedMortality X exaggeratedMortality]*. Calculating *log(populationLossCollapseThreshold)/log(1 - mortalityExpected)* results in an estimate of the total waves until collapse. The probability of attenuation occuring before collapse is *1 - (1 - pStableAttenuation)^totalWavesUntilCollapse*.

The Monte Carlo simulation tracks the amount of times that stable attenuation and collapse occurs across 1000 separate runs. For each simulation, the population is initialized to 100%. The simulation progresses wave by wave in which each wave either reduces the population by a small or larger amount, or the virus attenuates and the sim is broken out of. If attenuation does not occur in time, the population experiences collapse.
