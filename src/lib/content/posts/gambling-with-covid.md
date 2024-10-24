---
title: "Gambling with Covid"
description: "Why gambling with a pandemic is a losing bet"
categories: [ "covid-19" ]
authors: [ "Gregory Kirchoff", "Arijit Chakravarty" ]
coverImage: "default-background-6.jpg"
date: 'Wed Oct 23 2024 17:04:49 GMT-0400 (Eastern Daylight Time)'
published: false
updated: 'Wed Oct 23 2024 22:26:18 GMT-0400 (Eastern Daylight Time)'
---
<script> // usables
	import RecipeCard from '$lib/components/usables/RecipeCard/RecipeCard.svelte';

import CrisisPredictions from '$lib/components/internal/projects/CrisisPredictions/CrisisPredictions.svelte';

</script>

In line with our current approach to the ongoing pandemic, let's go to a casino and start gambling. We know the game is rigged and that the house always wins at the end of the day, so if we win big, we should take our earnings and go home.However, suppose we're persistent and want to see things through to the end - we either win big or go broke trying. Our statistically misinformed goals have just introduced us to non-ergodic risk.

## Understanding Ergodic vs. Non-Ergodic Systems

### Ergodic Systems

To grasp the implications of ergodic risk in the context of pandemics, it's essential to understand what the term means. An ergodic system is one where, given enough time, the average outcome for an individual, community, or society is the same as the average outcome for the group. In other words, long-term averages converve and stabilize over time.

Imagine we have thousands of people flipping a coin a thousand times each. You may find that your first four coins land heads up - not the 50:50 ratio we'd expect - but if you stay in the game and keep flipping that coin 1,000 times, you and everyone else will experience a 50:50 ratio at the end of the day. THis is an ergodic system.

### Non-Ergodic Systems

Non-ergodic systems, by contrast, do not guarantee this outcome. Individual trajectories can deviate significantly, leading to outcomes that are not representative of the average.

The stock market is an example of a non-ergodic system. While it has an average return, you as an investor may be unlucky and lose your investments, becoming bankrupt. If financial ruin occurs and wipes out your wealth, you can't recover to achieve the long-term average return of the market.

The irreversible long-term health consequences of COVID-19 - including symptomatic Long Covid, latent health effects, and death - make this current pandemic a non-ergodic system. There are also chances of good things happening, such as stable attenuation or extinction of the virus. As we will discuss elsewhere, these outcomes are much less likely, but should they happen, they offer one way to "exit" this pandemic.

## Outcomes

Consider the following chart. The numbers are agnostic so you can interpret them how you wish. Imagine that stable attenuation is the small chance of winning big at the casino and walking out the door, money in-hand. Collapse is, of course, financial ruin; it can be interpreted as Long Covid disrupting society through labor shortages. Grey and black swan events - such as serotype formation and highly virulent strains - exist on the table due to the increasingly rapidly evolving strains our unmitigated spread is allowing for, so the simulation can be taken literally as well.

The Monte Carlo Simulation on the right tracks the results of 1000 simulations of society co-existing with a pandemic disease. Society will experience non-stop waves of the disease. Most waves will be standard baseline mortality waves, but there is a chance that any given wave can be temporarily highly deadly or become permanently attenuated, resulting in an immediate, happy ending to the simulation. There are two ways that the game can end: we just need to get lucky once and experience a stable attenuation, or the deadly waves chip away at society until we reach the collapse threshold. The chance of stable attenuation and high mortality per wave can be chosen from the heat map on the left. The values of the heat map represent the overall chance of attenuation occuring before collapse.

<CrisisPredictions />

## The Fallacy of "Things Getting Better Over Time"

A concept that can be seen from this is that the chance of a happy outcome becomes worse as time goes on. This contradicts the popular belief that coexisting with a pandemic gets better over time. However, this is to be expected when gambling. The only way to "win" at gambling is to get lucky quickly and then never gamble again. A previous manager of mine had a friend who won $40,000 at a casino. He asked the friend if he's finally positive, to which the friend said, "almost."

## The Solution is to Stop Gambling

What we shouldn't do is to advise people to assess their risk factors and how much money they have to decide whether or not they should gamble until they get a terminal outcome. The game is rigged, so no matter how much money and good health you have, you are still vulnerable to bankrupcy and long-term consequences from COVID-19 at the end of the day - it may just take you a little longer to get there. This is why the CDC [says](https://archive.cdc.gov/www_cdc_gov/coronavirus/2019-ncov/your-health/understanding-risk_1709314735.html) that "understanding your risk [of contracting COVID-19] helps you make decisions" without opening themselves up to the liability of suggesting that ever taking the gamble of getting COVID-19 is a *good* decision.

The solution is to leave. Walk out the door. Stop gambling. Even if you think to yourself that you've already lost money and that people have already died, and you want to keep gambling to break even and "move past the pandemic", you have to realize that casinos and red queens' races with viruses are rigged against us. It's not too late to wallk out the door and control this virus.

Gambling is ill-advised when it comes to both casinos and pandemics.

## Methodology

Heatmap data generation is done by calculating the probability of attenuation occuring before population collase based on several epidemiological and demographic parameters. The expected mortality is calculated as *fractionInfectedPerWave X [(1 - pExaggeratedMortality) X baselineMortality + pExaggeratedMortality X exaggeratedMortality]*. Calculating *log(populationLossCollapseThreshold)/log(1 - mortalityExpected)* results in an estimate of the total waves until collapse. The probability of attenuation occuring before collapse is *1 - (1 - pStableAttenuation)^totalWavesUntilCollapse*.

The Monte Carlo simulation tracks the amount of times that stable attenuation and collapse occurs across 1000 separate runs. For each simulation, the population is initializaed to 100%. The simulation progresses wave by wave in which each wave either reduces the population by a small or larger amount, or the virus attenuates and the sim is broken out of. If attenuation does not occur in time, the population experiences collapse.
