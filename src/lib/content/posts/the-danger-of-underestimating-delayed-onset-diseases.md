---
title: "The Danger of Underestimating Delayed Onset Diseases"
description: "Evidence shows that the effects of SARS-CoV-2 can cause major problems well into the future. This is why we need to act now."
categories: [ "covid-19", "statistics" ]
authors: [ "Gregory Kirchoff", "Arijit Chakravarty" ]
coverImage: "wave-unsplash-matt-paul-catalano.jpg"
date: 'Tue Feb 06 2024 14:30:13 GMT-0500 (Eastern Standard Time)'
published: false
updated: 'Tue May 28 2024 16:04:10 GMT-0400 (Eastern Daylight Time)'
---
<script> // usables
	import RecipeCard from '$lib/components/usables/RecipeCard/RecipeCard.svelte';

  import CancerForecast from '$lib/components/internal/projects/CancerForecast/CancerForecast.svelte';

</script>

Viruses, parasites, and bacteria are all capable of causing acute illnesses. This is nothing new from a scientific or personal standpoint. We are all familiar with colds and stomach poisoning that feel awful for a few days then get better. However, the subjective sense of disease severity falls short when it comes to invisible disease, especially ones that lie in wait. Many diseases feel mild or are completely asymptomatic at first, and can take decades to progress into something much worse.

Rabies can take longer than a year to first show symptoms. HIV is initially contracted as an asymptomatic or mild flu-like illness. The infected individual may continue to look and feel fine for up to 10 years until AIDS is fully developed. Chagas disease is acquired from the parasite found in the kissing bug after being bitten. Signs and symptoms of the chronic phase, such as an irregular heartbeat, stomach pain, and heart failure, may occur [10 to 20 years](https://www.mayoclinic.org/diseases-conditions/chagas-disease/symptoms-causes/syc-20356212) after initial infection. Syphilis can remain unknowingly dormant for years before it manifests in neurological symptoms that later result in death.

There are two things to be aware of with this. If someone says they got a mild case of HIV, Rabies, or Chagas, very few won't be alarmed. The second thing is more complicated and involves hindsight. We are well aware now how dangerous these diseases are, but what about before we were aware of their long term outcomes? Consider that a new disease has just come out. It causes asymptomatic to mild initial infections, but has a guarantee of causing a heart attack in exactly 10 years. From an observational or experiential perspective, we won't know that this is anything more than a common cold until 10 years have passed. For many it will be too late. A hope is that we could find subtle signs of invisible internal damage or persistance of pathogens through various studies, such as in vitro, pathology, or even in silica studies. Usually we would prefer data with more clinical significance, but waiting for that data to come out is too dangerous, as we would be the data. This is important because a new disease has just come out.

SARS-CoV-2 spread across the globe at the beginning of 2020. 4 years feels like a long time, but is a relatively short period for certain issues to arise. In addition, we are seeing signs that Covid-19 can cause considerable long-term damage and is even capable of viral persistence. One long-term problem with delayed onset of particular concern is cancer.

SARS-CoV-2 is capable of affecting [many mechanisms](https://www.sciencedirect.com/science/article/pii/S0300908423001360?fbclid=IwAR2SrX8vKYxZf0_-Ia83L3TEu_1EIbVjJLpTv4Sahn93U5PGmX6i6TCKlbc#sec4) that play crucial roles in the onset of cancer. It can affect cell cycle regulation. An example of this is the affect of SARS-CoV-2's nsp1 protein inteteracting with our Alpha-DNA polymerase complexes, which are necesary for initiating DNA replication. It can affect our inflamation/proliferation signaling pathways. The N protein interacts with several host factors such as LARP1, which is particularly dysregulated in cancers related to viral infections. These studies are mechanistic and do not state that cancer *will* happen. However, we may need to rely on this type of data more than usual because if we don't, *we* will be the data.

A final point to express how poor a decision it is to wait for observational data to tell how much of a problem this is is that once we have visible data to prove that Covid-19 leads to cancer more often than we would like, it is far too late for far too many. We may only be just starting at that point.

<CancerForecast />

## Methodology

This model forecasts how the incidence and prevalence of a hypothetical syndrome could increase over time due to yearly exposure to a hypothetical infectious agent (IA), which imposes varying levels of risk of developing the aforementioned syndrome, normally distributed around a configurable delayed onset time.

For the purpose of illustration, a default of 18M was chosen for the baseline incidence of the syndrome based on data from the [World Cancer Research Fund International](https://www.wcrf.org/cancer-trends/worldwide-cancer-data/). All individuals within the population - everyone on Earth in this case - are assumed to be infected with the IA exactly once per year, with all infections binned to the last day of the year. The extra cases of the syndrome due to the infections that occured within a given year are calculated based on the formula baseline_*incidence X (1 - hazard_ratio)*. This total sum is normally distributed around a date in the future determined by the configurable year delay input. Each of these latency distributions is summed with each other to produce the aggregate curve of increased incidence of the syndrome.

The model has two different methods for halting the creation of latency distributions that simulate different reasons of enacting complete eradication of the IA. The first method is based on a configurable panic threshold in which the population stops transmission of the IA based on a response to the heightened level of the syndrome. The second method is simpler and allows for a date to be selected for when instantaneous eradication of the IA occurs.