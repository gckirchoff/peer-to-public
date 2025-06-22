---
title: "Uncertainty"
description: "Gregory Kirchoff"
categories: [ "covid-19" ]
authors: [ "Gregory Kirchoff", "Arijit Chakravarty" ]
coverImage: "default-background-7.jpg"
date: 'Sat Jun 14 2025 12:56:31 GMT-0400 (Eastern Daylight Time)'
published: false
updated: 'Sat Jun 21 2025 23:13:28 GMT-0400 (Eastern Daylight Time)'
---
<script> // usables
	import RecipeCard from '$lib/components/usables/RecipeCard/RecipeCard.svelte';
  import IfrDistributions from '$lib/components/internal/projects/PuncEq/IfrDistributions/IfrDistributions.svelte';
  import PopulationForecast from '$lib/components/internal/projects/PuncEq/PopulationForecast/PopulationForecast.svelte';
  import IfrComparisons from '$lib/components/internal/projects/PuncEq/IfrComparisons/IfrComparisons.svelte';
  import { Body1 } from '$lib/components/internal/typography';

  let medianIfr = $state(0.002);
  let sigma = $state(0.5);
   let testSigma = $state(0.5);
   let showAltSigmaForecast = $state(false);

  const handleCheckboxChange = () => {
    const scrollTarget = document.getElementById('hidden-scroll-to-target');
    scrollTarget.scrollIntoView({ behavior: 'smooth' });
  }
</script>

Uncertainty is not a desired state or result, whether it be within ourselves, in our view of politicians, or in the publication of research. Studies that have statistically insignificant results often [don't get published](https://pmc.ncbi.nlm.nih.gov/articles/PMC6573059/), politicians who say "I don't know" don't get voted for, and uncertainty within our own lives is often addressed with various psychological defense mechanisms meant to make the world around us feel simpler and safer.

Uncertainty is not necessarily a failure to understand something, but can be a genuine finding that leads to concrete plans. When we drive, we don't know whether or not we'll crash, so we plan for that uncertainty by wearing a seatbelt.

## Pathological Uncertainty

Let's consider the emergence of a novel disease. As the disease evolves, new variants emerge that have different IFRs (infection fatality rates - but for this hypothetical situation, IFR can be seen as disability chance such as paralytic polio, Chronic Lyme Disease, or Long COVID). Let's say the IFR of any new variant that comes out is pulled from the following distribution:

<span id="hidden-scroll-to-target" style="visibility: hidden;"></span>

<IfrDistributions bind:medianIfr bind:sigma bind:testSigma bind:showAltSigmaForecast showShowAltSigmaForecastCheckbox={false} />

The evolution of viruses does not guarantee any trend towards avirulence or "friendliness." Mistaking endemicity for domestication is not a mistake you would want to make with Rabies, HIV, or Malaria. The evolution of virulence is often highly random and can even trend upwards due to the fact that higher efficiency of replication within and between hosts correlates with virulence.

Regardless, a disease that pulls from this IFR/disability distribution can be expected to result in this outlook for society should it be allowed to spread freely.

<PopulationForecast {medianIfr} {showAltSigmaForecast} {sigma} {testSigma} />

The problem we currently face is, how do we know what this distribution looks like? How well can we use statistics, the closest thing we have to a crystal ball, to assess and plan for what coexisting with this pathogen could look like? Try adjusting the skew of the second distribution to have a higher mu/skew. Notice how the medians of the two distributions are the same, but the outlooks are completely different. These are the consequences of fat-tailed risks. Also notice that increasing sigma decreases the quantity of variants you see around the median, which is balanced out by having more to the left and some far out to the right of the median. When you come back down here, we will investigate how well we can differentiate between your two distributions from seeing a few variants early in the disease's emergence.

<div style="grid-column: content-start; margin-bottom: var(--spacing-16);">
  <label>
    <input type="checkbox" bind:checked={showAltSigmaForecast} on:change={handleCheckboxChange} /> <Body1 style="display: inline;">Show alternative distribution</Body1>
  </label>
</div>

Levene's test shows how confidently we can say that the variances of your two distributions are different. The Welch 2 tailed t test shows how confidently we can say that the medians of your two distributions are different. As you can see, no matter what we will never be confident that the medians are different because they aren't.

{#if showAltSigmaForecast}
<IfrComparisons {medianIfr} {sigma} {testSigma} />
{/if}

## Fat Tail Risk

In risk analysis, a "fat tail" refers to a statistical distribution where reare, extreme events are significantly more likely than we might expect under a normal (bell curve) distribution. These tail events, though highly infrequent, carry outsized consequences. In domains like pandemics and climate systems, focusing only on the average or the most likely outcomes can leave us dangerously unprepared for the worst-case scenarios.

Pandemics are classic examples of fat tail risks. Unlike many natural or engineered systems that behave in predictable, linear ways, infectious disease outbreaks involve highly nonlinear dynamics: exponential growth, mutation, and complex interactions with global human behavior. A single, unlikely mutation or a brief lapse in containment can trigger cascading consequences that dwarf anything observed previously.

Based on the number of SARS-CoV-2 variants we've seen so far, our ability to predict the future course of the pandemic remains deeply uncertain. Concerningly, trends and expectations that appear stable can be dangerously misleading when we are dealing with systems characterized by fat tail risk, where low-probability, high-impact events dominate outcomes.

> Consider a turkey that is fed every day. Every single feeding will firm up the bird’s belief that is the general rule of life to be fed every day by friendly members of the human race “looking out for its best interests,” as a politician would say. On the afternoon of the Wednesday before Thanksgiving, something *unexpected* will happen to the turkey. It will incur a revision of belief.
>
> -Nicholas Nassim Taleb

Just as the turkey cannot predict Thanksgiving by extrapolating from its daily experiences, we cannot safely assume the pandemic's trajectory by averaging what we've seen so far. In fait-tailed domains like pandemics, it's not the typical events but the rare, extreme ones, such as the emergence of a highly transmissable, immune-evasive, or more lethal variant, that shape the overall risk and long-term impact. Ignoring these risks because they are rare is preceisely what makes them so dangerous.

![image](/images/postImages/uncertainty/image.png)

Discussing unprecendented, catostrophic levels of risk can sometimes feel melodramatic, but it's not. The *Homeland Security Affairs* journal, published by the Naval Postgraduate School's Center for Homeand Defense and Security, rightly classifies global pandemic as *extinction-level events*. They argue that such threats must be treated with the seriousness they deserve, not later, but now.

A final note to summarize the situation we face:

> The general (non-naive) precautionary principle [3] delineates conditions where actions must be taken to reduce risk of ruin, and traditional cost-benefit analyses must not be used. These are ruin problems where, over time, exposure to tail events leads to a certain eventual extinction. While there is a very high probability for humanity surviving a single such event, over time, there is eventually zero probability of surviving repeated exposures to such events. While repeated risks can be taken by individuals with a limited life expectancy, ruin exposures must never be taken at the systemic and collective level. In technical terms, the precautionary principle applies when traditional statistical averages are invalid because risks are not ergodic.
>
> - Joseph Norman, Yaneer Bar-Yam, and Nassim Nicholas Taleb, Systemic risk of pandemic via novel pathogens – Coronavirus: A note, *New England Complex Systems Institute* (January 26, 2020).

## How to Plan for the Unknown

If this exercise results in you feeling unsure of the future, that's okay. There is much more safety and security to be found in planning for known unknowns than feigning confidence in the face of uncertainty.

As mentioned before with seatbelts, these types of uncertainties are common and are primarily addressed in two ways

### Risk Mitigation

Risk mitigation, or prevention, is the primary method for addressing these situations. Aircraft design standards dictate the need for multiple redundant systems to prevent crashes even if one system fails, with all of this backed by rigorous quality assurance. Rules of the road are to be well understood and respected to prevent crashes whether in a car or on a bike. When it comes to a disease, mitigation and prevention are done through various structural or behavioral implementations such as rigorous water treatment protocols, HVAC installations in shared spaces such as classrooms, offices, and medical centers, and wearing masks to prevent airborne transmission. SARS-CoV-2 will not be the last pandemic-level threat we face. Permanent architectural and behavioral changes can stop present day and future exposure to these fat tail, extinction-level risks.

### Risk Response

Risk response, or contingency planning, is about preparing for what to do if the negative event does occur. This is where helmets, safety rafts, seatbelts, Paxlovid, and COVID vaccines come in. These interventions do not prevent the events from happening, but are important to mitigate whatever the outcome may be. This category of risk management alone is highly undesirable. It does not become okay to start crashing planes and cars or contracting novel pathogens just because we have outcome severity mitigators. Another point to note about this category is that although risk response is reactive, it is pre-planned. You don't put on a bike helmet as you're flying through the air. You act like negative outcomes are very real and possible and put on your helmet before you start moving. If there is an actively evolving pandemic disease, we should act as if the associated risks exist while they remain possible.
