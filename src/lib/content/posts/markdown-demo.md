---
title: Markdown Tutorial
description: A quick showcase of what you can do with markdown.
categories:
  - tutorial
  - demo
  - featured
coverImage: 'markdown-tutorial/cover.jpg'
date: '2023-07-31'
published: true
---

The following is a quick showcase of what you can do with markdown.

This text is on the next line because there is an empty line above it ^
The reason for the extra line is because it would be hard to write/read all
of this in code if it was all in one line. This is written on multiple lines in the file,
but doesn't create any new lines in the post.

If you want more space between lines, write `<br>` (short for linebreak), and leave blank lines above and below it

<br>

To separate text with a line, you can use `----` in the same way as `<br>`

---

You can make text **bold** and _italic_ and even **_bold and italic_**

<br>

The following are the different levels of heading sizes you can use:

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

<br>

# Links:

Clicking on [this](https://www.google.com) link will bring you to google.com

If you want to go to a page on this site, just write the last part of the url.
For example, [this link](/about) will bring you to the about page.

<br>

# Usables:

<script>
    import RecipeCard from '$lib/components/usables/RecipeCard/RecipeCard.svelte';

    const irishSodaBreadIngredients = {
       list: [
           { quantity: 2.5, item: 'cups of flour' },
           { quantity: 1, item: 'egg' },
           { quantity: 1, item: 'teaspoon of baking powder' },
           { quantity: 2, item: 'cups of water' },
           { item: 'A dash of salt' },
       ]
    };

    const irishSodaBreadSteps = [
        'Preheat oven to 375 degrees fahrenheit',
        'Mix all dry ingredients together in a bowl',
        'Mix all wet ingredients together in a separate bowl',
        'Combine together and stir',
        'Put in oven on middle rack for 30 minutes',
    ];
</script>

To use components from the "usables" folder, you need to import it (at the top of the markdown content and beneath the front-matter) into the file.

If the usable requires some data, it's easiest to create that in that script tag. Most usables should
have a demonstration in the [usables](/dev/usables) page.

Be aware that in markdown files, the variables need to be inside of "double quotes" when referenced
like **`ingredients="{irishSodaBreadIngredients}"`**

(The purpose of the \`backticks\` in the markdown file is to make the compiler read this as text, not code here)

<br>

### Then you can use it below like this:

<br>

<RecipeCard
    img="/postImages/markdown-tutorial/irish-soda-bread.jpg"
    title="Irish Soda Bread"
    ingredients="{irishSodaBreadIngredients}"
    steps="{irishSodaBreadSteps}"
/>

<br>

# More Info

This should cover most of the basics and if you ever need more information,
please consult these guides [here](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)
or [here](https://about.gitlab.com/handbook/markdown-guide/#headings)
