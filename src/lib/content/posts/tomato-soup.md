---
title: 'Tomato Soup'
description: 'How to stew tomatoes'
categories:
  - 'canning'
  - 'cooking'
coverImage: "tomato-soup.png"
date: '2023-08-11'
published: true
---

Here's how to make tomatoes!

<script>
    import RecipeCard from '$lib/components/usables/RecipeCard/RecipeCard.svelte';

    const ingredients = [
        { quantity: 4, item: 'Tomatoes' },
        { item: 'A dash of salt' },
    ];

    const steps = [
        'Harvest tomatoes',
        'Mash them up',
        'Add the salt',
    ];
</script>

<RecipeCard
    title="Tomato Stew"
    ingredients="{ingredients}"
    steps="{steps}"
/>