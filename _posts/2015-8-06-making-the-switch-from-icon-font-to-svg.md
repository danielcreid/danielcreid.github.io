---
layout: post
title: Making the switch from icon font to SVG
---

For the first time in a very long time, I had some free time **at work**. Crazy, I know.

It’s almost never a dull moment while working for a software company. My day is usually choked full of meetings, administrative work, peer mentoring, designing interfaces, firefighting, creating prototypes, coding things, etc., but this one fateful day I actually had some time to kill. Finally, a rare opportunity to do some self-imposed, innovative work _while at work!_

##What was I going to do?
I’ve been wanting to improve our icon situation for a while now and convert our icon font to SVG. We chose to use an icon font because we had to support IE8—<a href="http://caniuse.com/#search=svg">SVG just wasn’t an option</a>. My fellow designer, <a href="https://twitter.com/elena_scherer">Elena Scherer</a>, lovingly crafted our current icon set and it sadly fell prey to some implementation limitations (namely anti-aliasing). Implementing her awesome work via icon font definitely didn’t do it justice.

Switching to SVG has some fantastic benefits:

1. Icon fonts suffer from <a href="https://en.wikipedia.org/wiki/Spatial_anti-aliasing">anti-aliasing</a>. Our beautiful icons—especially the more detailed ones—ended up looking a little blurry because of this. Anti-aliasing doesn’t happen to SVG because it is not a font.
2. SVG is just markup. It exists right there on the page and doesn’t trigger an HTTP request. It’s really fast and awesome.
3. SVG also allows for greater styling possibilities. It’s just markup and that allows us to style individual parts of an icon. You cannot do this with icon fonts.*

Well, we finally dropped support for IE8 and I had some time to spare. This was the perfect opportunity to ditch our icon font and move to SVG.

<small>* There are some hacky ways around this that can allow for <a href="http://codepen.io/dan_reid/pen/celth">dual-colored icons using an icon font</a>.</small>

##Getting started
The first thing I wanted to do was make a working prototype to nail down exactly what I needed to build and how to build it. Initially, I assumed that I would need to:

1. Create an SVG sprite of our icon set.
2. Set up some default icon styling.
3. Figure out a way to implement the prototype in our applications.

I decided to build and test the prototype inside of our central styling toolkit project since it is already set up and, ultimately, this is where everything will reside. More on that later.

##The SVG sprite
There are tons of custom icon set management tools out there. Fortunately, we had been using <a href="https://icomoon.io/">IcoMoon</a> for this purpose. IcoMoon made it super simple to get started because I was able to load up our existing icon font and export it as an SVG sprite. I then took the exported sprite and cleaned it up the code a bit, mainly removing unnecessary attributes and adding some default styles to the outer SVG element.

I popped the finished sprite into the test page and then set up references to each icon in the sprite, like so:

<pre><code class="language-markup">&lt;svg class=&quot;svg-icon&quot;&gt;
    &lt;use xlink:href=&quot;#svg-settings&quot;&gt;&lt;/use&gt;
&lt;/svg&gt;
&lt;!-- Repeat the above code 115 times, but change the icon names --&gt;</code></pre>

This allowed me to test each icon and make sure they all worked. Now, you are probably wondering what’s up with that `svg-icon` class. Let me give you some context first.

##Default icon styles
I felt like it was important that the new SVG icons could be used in a similar fashion as our icon font. To give you an idea of what it was like to use the font version, all you’d have to do is write something like this in your document:

<pre><code class="language-markup">&lt;i class=&quot;i-settings&quot;&gt;&lt;/i&gt;</code></pre>

Now you have an icon. If necessary, you could also change an icon’s size and color like this:

<pre><code class="language-scss">.i-settings {
    font-size: 32px;
    color: #bada55;
}</code></pre>

This is the workflow that my team is used to following. It’s quick, easy to use, and easy to remember. Drastically changing it on them isn’t ideal because that would just increase their <a href="https://en.wikipedia.org/wiki/Cognitive_load">cognitive load</a> and likely lead to errors. This is especially true for people who don’t build out UIs very often. They say if you don’t use it, you lose it, right?

Anyway, when it comes to the SVG version, things pretty much stay the same because of some crafty default styles applied to that all important `svg-icon` class:

<pre><code class="language-scss">.svg-icon {
    display: inline-block;
    width: 1em;
    height: 1em;
    font-size: 16px;
    fill: currentColor;
}</code></pre>

Setting `width` and `height` to 1em effectively allows us to use `font-size` to set the dimensions of the icon. In this case, 1em is equal to the current element’s font size, which is defaulted to 16px.

Going further, setting `fill` (an <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Fills_and_Strokes">SVG-specific CSS property</a>) to `currentColor` lets us continue using the `color` property to change an icon’s color. Here’s an example of how you would change an SVG icon’s size and color:

<pre><code class="language-scss">// This class would exist on the outer &lt;svg&gt; element
.my-awesome-svg-icon {
    font-size: 32px;
    color: #bada55;
}</code></pre>

Check that out. It’s exactly the same as we were doing with the icon font. The biggest and only  difference comes with the markup you have to write:

<pre><code class="language-markup">&lt;svg class=&quot;svg-icon&quot;&gt;
    &lt;use xlink:href=&quot;#svg-settings&quot;&gt;&lt;/use&gt;
&lt;/svg&gt;</code></pre>


There are two important things to note about the above snippet:

1. The icon name follows a predictable pattern that’s exactly the same as the icon font version, except now the namespace is `svg-` instead of `i-`.
2. The outer `<svg>` element must have the `svg-icon` class otherwise your icon won’t get any default styles.

Fortunately, the above snippet is really easy to just copy-paste and modify when needed. Now that I had a working prototype, I needed to figure out the best way to implement it in our applications.

##Implementing the solution
I mentioned before that I was working out of our central styling toolkit project. This project gets packaged up with <a href="https://www.nuget.org">NuGet</a> and distributed to our applications. Our application styles are essentially set up like this (simplified folder structure for clarity):

<pre><code class="language-markup">Application
    - // Application-specific styling partials
    - application.scss
Toolkit
    - // Toolkit style partials
    - _svg-icons.scss
    - _svg-icons.cshtml
    - _import.scss</code></pre>

Every application’s `import.scss` file imports the toolkit’s `_import.scss` file. This allows us to make changes to the toolkit at any time because updating the toolkit NuGet package doesn’t require you to make any changes to the application `import.scss` file. All I had to do for the SVG icon styling is put it in `_svg-icons.scss` and include it in the toolkit’s `_import.scss`. As for the SVG sprite, things ended up not being as hands off as I would have liked.

The `_svg-icons.cshtml` file in the previous example is where I put the SVG sprite. This file gets packaged up along with the rest of the toolkit. I was able to treat it like an HTML partial that would then be included inside of an application’s outer index file. Unfortunately, this index file isn’t centrally maintained like the toolkit is. So, for existing applications, this meant that there was one manual thing you needed to do if you wanted to actually use SVG icons—include `_svg-icons.cshtml`. For new applications, we have a Visual Studio application template set up. Including the SVG sprite there was the final step to getting SVG icons to be a thing.

##There’s a slight problem
Implementation went well, the new SVG icons work great, and they are easy to use, but some of the more detailed icons still look fuzzy. After a bit of investigation, it turns out that they are effectively being anti-aliased due to <a href="https://en.wikipedia.org/wiki/Subpixel_rendering">subpixel rendering</a>. _That’s one of the things we were trying to fix by switching to SVG!_

My best guess as to why this is happening is that some of the vector paths shifted off of the pixel grid slightly. This could have been caused by Illustrator. Sometimes paths shift around unexpectedly—especially when you are working at small sizes. This also _might_ have had something to do with the IcoMoon export settings that I used to generate the original SVG sprite.

This is still an ongoing issue and the approach I’m taking to resolve it seems to work well:

1. Pull every icon into Illustrator, one at a time, and adjust the paths so that they are right on the pixel grid.
2. Export the icons as SVG and put the paths in the main sprite.
3. Check the icons in browser to make sure it’s nice and crisp.
4. If any icons don’t look fantastic, go back to step 1.

It’s also very tedious, but I think it’s well worth the effort.

##Looking to the future
Aside from the subpixel rendering issue, all of that work wasn’t terribly difficult or time consuming to complete. It ended up only taking a couple hours to pull off and it was a very satisfying way to spend my free time.

For my team, moving over to SVG was a huge win. We’re already using the new SVG icons in several applications and have begun phasing out our icon font. This is going to allow us to be more efficient and do some really cool things down the road. I highly recommend making the move if if you can.
