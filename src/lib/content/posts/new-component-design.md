---
title: "New Component Design"
description: "This was made with our fancy new component"
categories:
  - "demo"
coverImage: "ascidian.png"
date: '2023-09-20'
published: true
---
<script> // usables
    import RecipeCard from '$lib/components/usables/RecipeCard/RecipeCard.svelte'

</script>

# This was made with a new component!

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


![ascidian](/images/postImages/ascidian.png)



## So much to do
