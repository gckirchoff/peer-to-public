# Welcome!

Forking this project will give you access to everything you need to host, deploy, and create a website with posts, photo galleries, and more!

## Installation

The first step is to create a Github account. If you are reading this, you are already on Github so go do that now!

The next step will be to download NPM [here](https://nodejs.org/en/download)

If you are on windows, you will need to download Git as well. Do that [here](https://git-scm.com/download/win)

The final and easiest thing to download is VS Code right [here](https://code.visualstudio.com/)

After all of this is complete, click on the fork button at the top of this page. This will have you create your own repository.

Now open the terminal on your computer and run these commands in order

```bash
cd Desktop # Mac
# either the above or below based on operating system
cd OneDrive # Windows
cd Desktop # Windows

git clone LINK_OF_YOUR_NEW_GITHUB_REPOSITORY

npm install
```

Now open up that folder using VS Code. Open up the terminal in VS Code and write

```bash
npm run dev
```

Click on the link and open up your site!

If this is working, make sure to connect to this repository so that you can get updates in the future.

```bash
git remote add upstream https://github.com/gckirchoff/blog-template
```

## Setup

The first place you want to go to is `config.ts` in `src/lib/config.ts`.

Here, you can update the properties in `siteConfig` to match your site.
Just change these for now (don't worry about "url" yet):

- title (name of your site)
- description
- link (copy your github URL)
- author

You can also change the title of the different `navItems`. Don't touch the "route" property, just the "title" if you want.

## Creating

### Posts

To create a post, all you have to do is create a new file that ends in `.md` in `src/lib/content/posts`. Be aware the name of the file will be the url for the post so creating `tomato-soup.md` will result in a recipe post under `www.your-site.com/posts/tomato-soup`.

If you would like to showcase some images from a vacation, art portfolio, etc. go to `src/lib/content/galleries.ts`. Here, you can easily mimic one of the examples.

### Color Palette

You have full control over the look and feel of the site by easily changing the color palette!

Go to `src/styles/themes.scss`. Here, go find the "Palette" sections. There should be two under the light and dark theme. Here, you can change the colors under `$clr-primary`, `$clr-secondary`, etc.

## Publishing

Whenever you make any changes you would like to reflect in your published website, run the following commands

```bash
git add .
git commit -m "A description of what you did"
git push origin master
```

You should see your personal github repository update with these. To have these appear online, you must go to [Vercel](https://vercel.com/dashboard) and sign up with your github account. The process is extremely easy.

## Updates

This template will receive updates. Check [the-blog-for-this-template](https://your-blog-template.vercel.app/) to see if any updates have come out and what they include. To take advantage of these, run the following command:

```bash
git pull upstream master --no-ff
```

If there are merge conflicts, please contact me for assistance. There won't be any most likely.

You should now see the new updates. To get these updates into your published website run:

```bash
git push origin master
```

## Custom Domain

The final touch to make your site official is to get a custom domain. This means changing your site domain from something like "www.your-site.vercel.app" to "www.your-site.com" or .org or whatever you'd like.

For information on this, I recommend [Buying A Domain Name From Porkbun And Using It For Your Vercel Project](https://igcaleb.hashnode.dev/buying-a-domain-name-from-porkbun-and-using-it-for-your-vercel-project)
