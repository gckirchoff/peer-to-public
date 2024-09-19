---
title: "The Danger of Underestimating Delayed Onset Diseases"
description: "Evidence shows that the effects of SARS-CoV-2 can cause major problems well into the future. This is why we need to act now."
categories: [ "covid-19", "statistics" ]
authors: [ "Gregory Kirchoff", "Arijit Chakravarty" ]
coverImage: "wave-unsplash-matt-paul-catalano.jpg"
date: 'Wed Jun 12 2024 06:35:07 GMT-0400 (Eastern Daylight Time)'
published: true
updated: 'Wed Sep 18 2024 20:40:17 GMT-0400 (Eastern Daylight Time)'
---
<script> // usables
	import RecipeCard from '$lib/components/usables/RecipeCard/RecipeCard.svelte';

  import CancerForecast from '$lib/components/internal/projects/CancerForecast/CancerForecast.svelte';

</script>

### Chart Interpretation Guide:

This chart visualizes the impact of delayed prevention measures on the incidence of a hypothetical syndrome (such as cancer or heart disease) triggered by a recurring infectious agent (IA). The chart allows you to experiment with different variables, including the hazard ratio, delay period, baseline incidence, and a configurable panic threshold based on extra cases or mitigation date.

<CancerForecast />

### Key Elements:

**Hazard Ratio**: This slider adjusts the relative risk of developing the syndrome after being infected with the IA. A higher hazard ratio implies a greater risk of syndrome development for each yearly infection.

**Latency Period**: The model includes a configurable delay, defaulted here to 20 years, which represents the average time between infection and the onset of the syndrome. Longer delays reflect latent health issues that could take decades to become apparent, such as those seen with diseases like HIV or Chagas.

**Baseline Incidence**: This is the number of cases that would normally occur without the IA. In this model, the default incidence is 18 million, representing global rates of a syndrome like cancer. Any increase in cases due to the IA is added on top of this baseline.

**Mitigation Method**: The default mitigation method, set as a panic threshold, represents the point at which the population reacts to the rising number of extra cases by eradicating the IA. The graph visualizes this moment as the red line and allows for adjustment (defaulted here at 5%). Once the number of extra cases breaches this threshold, preventive actions are triggered to halt further transmissions. The alternative method, date of prevention, allows you to simply set a date at which theoretically perfect mitigation is instantaneously established.

### How to Use:

* Adjust the **hazard ratio** and **delay sliders** to observe how different risks and onset times affect the syndrome's prevalence over time.
* Use the **mitigation method** to simulate how early or late population-wide mitigation efforts may occur in response to rising case numbers, and observe the resulting syndome prevalence after the IA is eliminated.
* The shaded regions represent projected extra cases due to the IA, and how interventions—or the lack thereof—would impact the long-term burden of the syndrome.

By experimenting with these variables, the chart reveals the potentially catastrophic outcomes of delayed action and highlights the importance of early intervention in controlling the long-term impacts of infectious diseases.

### Understanding Latent Health Risks of Infectious Diseases

Viruses, parasites, and bacteria are all capable of causing acute illnesses. This is nothing new from a scientific or personal standpoint. We are all familiar with colds and food poisoning that feel awful for a few days then get better. However, how we feel during the acute phase of a disease doesn't necessarily reflect its potential long-term impact. Many diseases feel mild or are asymptomatic at first, but can take decades to progress into something much worse.

Rabies can take longer than a year to show symptoms. HIV is initially contracted as an asymptomatic or mild flu-like illness. An infected individual may continue to look and feel fine for up to 10 years until AIDS fully develops. Chagas disease, acquired from the parasite in the kissing bug, may present chronic phase symptoms such as an irregular heartbeat, stomach pain, and heart failure [10 to 20 years](https://www.mayoclinic.org/diseases-conditions/chagas-disease/symptoms-causes/syc-20356212) after initial infection. Similarly, syphilis can remain dormant for years before manifesting neurological symptoms that can result in death.

If someone said they had a mild case of HIV, rabies, or Chagas disease, most people would be alarmed. Hindsight shows us the danger of these diseases, but what about before we understood their long-term outcomes? The [beginning](https://www.hiv.gov/hiv-basics/overview/history/hiv-and-aids-timeline) of the HIV epidemic was [characterized](https://www.history.com/news/aids-epidemic-ronald-reagan) by doubt and stigma.

### A Hypothetical Disease with Guaranteed Delayed Onset

Now, imagine a new disease causing asymptomatic to mild initial infections but guaranteeing a heart attack in exactly 10 years. Initially, it would seem like just a common cold. We would probably not act to mitigate this disease until the 10 year mark comes around. However, it will be too late for those who were infected before mitigations were put in place. A hope is that we could detect subtle signs of internal damage or pathogen persistence through various studies, such as in vitro, pathology, or even in silico studies. Usually we would prefer data with more clinical significance, but waiting for that data to come out is too dangerous, as we would be the data.

### The Long-Term Threat of COVID-19

SARS-CoV-2 began spreading across the globe at the beginning of 2020. 4 years feels like a long time, but is well before the time it takes for many possible latent health issues to arise after an infection. We are already seeing that Covid-19 can cause significant long-term damage to nearly every organ system (symptomatically and asymptomatically), and may even be capable of [viral persistence](https://www.thelancet.com/journals/laninf/article/PIIS1473-3099(24)00171-3/fulltext?dgcid=raven_jbs_aip_email).

Heart disease, especially for [younger populations](https://www.cedars-sinai.org/newsroom/today-young-people-are-more-likely-to-die-of-heart-attacks-post-covid-study-finds-but-why/#:~:text=09%3A00%20AM-,TODAY%3A%20Young%20People%20Are%20More%20Likely%20to%20Die%20of%20Heart,of%20the%20Smidt%20Heart%20Institute.), has been on the rise since the beginning of the pandemic. The mechanisms behind this are [well established](https://www.nih.gov/news-events/nih-research-matters/how-sars-cov-2-contributes-heart-attacks-strokes#:~:text=COVID%2D19%20is%20known%20to,contributes%20to%20this%20increased%20risk.) and are known to occur after [mild](https://www.mdpi.com/2077-0383/12/6/2123?fbclid=IwAR2iJDGOH-QchYjM0j-qFIbyIt_ONASMl1Txu7I4w8Pgq5DX22VrrNnGqK0), and even [asymptomatic](https://publichealth.jhu.edu/2022/covid-and-the-heart-it-spares-no-one#:~:text=People%20who%20got%20COVID%2D19%20and%20were%20asymptomatic%2C%20or%20got,different%20things%20could%20be%20happening.), cases.

The brain is another organ showing [numerous](https://neurosciencenews.com/covid-neuron-fusion-23421/?fbclid=IwAR06AuIbFUR_E0lYQKH3vgRVOV5-5Te-DLk1uctS3Bqw06UzkZD4pTWTlyY) [mechanisms](https://www.nature.com/articles/s41380-024-02554-0) of adverse effects from [mild](https://www.nature.com/articles/s41598-024-52005-7) and [asymptomatic](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9863678/) SARS-CoV-2 infection. One such example is the development of Lewy bodies in [8 out of 8](https://www.biorxiv.org/content/10.1101/2021.02.23.432474v2.full) infected rhesus macaques. Lewy Body Dementia is a well established condition that takes years to develop. It can be difficult to find neurological sequelae because it is easy for patients and physicians to misinterpret symptoms as mental health issues. Consider the [case study](https://www.frontiersin.org/articles/10.3389/fped.2023.1165072/full?fbclid=IwAR37S-PDl4CGlEdHT8xfiBASUZ0mnfNjV2rWHDVTBbG4eTBKXR9QlpI8qKg) of two sisters who both reported severe neurocognitive problems after infection with SARS-CoV-2. Their symptoms were initially classified as "psychologic pandemic distress", but they were later found to have profound brain hypometabolism.

A third long-term concern is cancer. SARS-CoV-2 can affect [many mechanisms](https://www.sciencedirect.com/science/article/pii/S0300908423001360?fbclid=IwAR2SrX8vKYxZf0_-Ia83L3TEu_1EIbVjJLpTv4Sahn93U5PGmX6i6TCKlbc#sec4) crucial to cancer onset, including cell cycle regulation and inflammation/proliferation signaling pathways. These mechanistic studies do not claim that cancer *will* happen, but they highlight the potential risk. How do we intend to find out?

### The Urgency of Early Intervention

In conclusion, waiting for observational data to confirm the long-term impacts of COVID-19 is too dangerous. Once we have visible data proving that COVID-19 leads to delayed-onset diseases, it may be too late for many. We must act quickly to prevent transmission and mitigate the potential fallout.

The chart below demonstrates various strategies to prevent the transmission of SARS-CoV-2 and the potential consequences of delayed action.

## Methodology

This model forecasts how the incidence and prevalence of a hypothetical syndrome could increase over time due to yearly exposure to a hypothetical infectious agent (IA), which imposes varying levels of risk of developing the aforementioned syndrome, normally distributed around a configurable delayed onset time.

For the purpose of illustration, a default of 18M was chosen for the baseline incidence of the syndrome based on data from the [World Cancer Research Fund International](https://www.wcrf.org/cancer-trends/worldwide-cancer-data/). All individuals within the population - everyone on Earth in this case - are assumed to be infected with the IA exactly once per year, with all infections binned to the last day of the year. The extra cases of the syndrome due to the infections that occured within a given year are calculated based on the formula baseline_*incidence X (1 - hazard_ratio)*. This total sum is normally distributed around a date in the future determined by the configurable year delay input. Each of these latency distributions is summed with each other to produce the aggregate curve of increased incidence of the syndrome.

The model has two different methods for halting the creation of latency distributions that simulate different reasons of enacting complete eradication of the IA. The first method is based on a configurable panic threshold in which the population stops transmission of the IA based on a response to the heightened level of the syndrome. The second method is simpler and allows for a date to be selected for when instantaneous eradication of the IA occurs.
