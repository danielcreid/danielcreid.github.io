---
layout: post
title: Naming things are hard
---

This is something I struggle with almost every time I sit down and code. I used to agonize over it, sometimes spending far, far too much time trying to figure out what to call a “thing.” “This name has to be perfect. Anyone should be able to look at it and instantly know what this thing is for.” I’d tell myself. Oh, the time I’d waste trying to get the name to be _just right_. Eventually, I got to a point where I just had to stop, take a step back, and consider what I was really trying to achieve.

I realized that I was trying to come up with the perfect name the first time, every time. Even further, I was trying to create some perfect code that would never need to be changed. I now know this to be a fool’s errand. Things change constantly and nothing will ever be 100% done and definitely never perfect.

So, I say that I’ve grown beyond trying to craft perfect code, but what does that really mean? Does quality matter? Do I care less about what I call things? Yes and no.

I mainly architect CSS (<a href="http://sass-lang.com/" target="_blank">Sass</a>) for enterprise-level software. To say that I don’t care about how everything fits together would be completely false. I _deeply_ care about the quality of the codebase 100% of the time. Naming does matter. In fact, it’s one of the more important things in my opinion&mdash;especially when dealing with something so deceivingly simple as CSS. So then, what am I trying to say?

##I’ve learned to let go
Things change. They always will and because of this I don’t agonize over initial naming choices any more. I just pick something that’s vaguely what I want. It could be verbose, short and simple, or just plain confusing. It could be the most terrible name ever. It doesn’t really matter for the short term. First I’ll get something working. Then I’ll go back and put some real effort into naming choices.

At this point, it’s easier to think about what things should be called because:

1. I’ve solved the UI problem already
2. I know _exactly_ how everything fits together

By shifting when I put effort into naming things, I actually end up spending less time trying to get it _just right_. And getting it _just right_ is imperative for long-term maintainability. If I burst into flames right now, my fellow co workers better be able to go into my stylesheet and pick up where I left off with minimal effort. They shouldn’t have to guess what things are and what they’re supposed to do. If I come back to a stylesheet six months from now, I need to be able to understand what past me was thinking.

##What was past me thinking, anyhow?
I’ve spent a lot of time thinking about how I go about naming things. How do I refine those initial names and make them great? What’s my process like? It occurred to me that there are a few things I regularly do that allow me to come up with some high-quality names.

####Be straight-forward, specific, and super literal.
If you were going to describe a piece of UI to someone, what would you say? What purpose does it serve? Now take that short phrase and make it a class. Easy.

####Come up with a standard naming convention and stick to it.
At work, we use a mix of BEM and SMACSS along with some namespacing. I don’t have to think as much about _how_ I name things in relation to other things because it’s already figured out. It’s a predictably simple way of doing things.

####When in doubt, leave a comment.
Or two. Or five. If you’re code isn’t straight-forward and you can’t spend the time making it as such, at least explain it as clearly as you can in the form of a comment. That way, someone else can look at your code and still know what’s up.

##Naming things are still hard
This is the unfortunate truth. Even with a few tricks&mdash;which have served me well over the years&mdash;this is still the case. It’s just something we all have to deal with. I will say that I tend to stress out less and less about naming because I rely on the techniques above. Maybe they can help you, too.
