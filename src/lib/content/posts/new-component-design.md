---
title: "New Component Design UPDATED"
description: "This was made with our fancy new component"
categories:
  - "demo"
coverImage: "ascidian.png"
date: '2023-09-24'
published: true
updated: '2023-09-24'
---
<script> // usables
    import RecipeCard from '$lib/components/usables/RecipeCard/RecipeCard.svelte'

</script>
# This was made with a new component! UPDATED

<RecipeCard
img="markdown-tutorial/irish-soda-bread.jpg"
title="Chicken"
description="yum"
prepTime="{2}"
cookTime="{2}"
result="{2}"
ingredients="{[{"title":"chicken","list":[{"item":"thigh","quantity":1,"unit":"pound","note":""}]}]}"
steps="{["cook\n","eat"]}"
/>

## Qail!

<RecipeCard
    img="markdown-tutorial/irish-soda-bread.jpg"
    title="quail"
    description="good quail"
    prepTime="{2}"
    cookTime="{2}"
    result="{3}"
    ingredients="{[{"title":"quail","list":[{"item":"quail","quantity":3,"unit":"quails","note":""}]}]}"
    steps="{["cook","eat"]}"
/>


![ascidian](/images/postImages/ascidian.png)

## So much to do

<RecipeCard
img="markdown-tutorial/irish-soda-bread.jpg"
title="Hey"
description="yum"
prepTime="{4}"
cookTime="{4}"
result="{3}"
ingredients="{[{"title":"chicken","list":[{"item":"cool","quantity":0,"unit":"wow","note":""}]}]}"
steps="{["eat"]}"
/>

<RecipeCard
img="markdown-tutorial/irish-soda-bread.jpg"
title="Final"
description="final card"
prepTime="{2}"
cookTime="{3}"
result="{2}"
ingredients="{[{"title":"it works","list":[{"item":"wow","quantity":3,"unit":"units","note":"of wow"}]}]}"
steps="{["cook","eat"]}"
/>

<RecipeCard
img="markdown-tutorial/irish-soda-bread.jpg"
title="Last recipe"
description="the final recipe"
prepTime="{3}"
cookTime="{4}"
result="{4}"
ingredients="{[{"title":"turkey","list":[{"item":"legs","quantity":3,"unit":"","note":""}]}]}"
steps="{["cook","eat"]}"
/>
