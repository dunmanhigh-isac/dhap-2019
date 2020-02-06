# dhap-2019

The site is built with Jekyll, and hosted on Github Pages. You'll need to install Ruby + Bundler, then to setup on your machine:

```bash
$ bundle install
$ bundle exec jekyll serve
# navigate to localhost:4000
``` 

Each page on the site is rendered with one of three [layout](#layouts). The more repetitive content, i.e. the 
pages featuring all the groups and people, is organised into [collections](#collections) and automatically 
generated when the page is built. The rest of the one-off pages on the site, mainly information pages, are 
placed on the top-level directory as [pages](#pages).

## Layouts

* Default

	Provides a baseline for every page on the site. It provides:
		
	* A `<head>` linking SEO tags (generated by the [`jekyll-seo-tag` gem](https://github.com/jekyll/jekyll-seo-tag)), 
		as well as all common stylesheets and any included stylesheets (iterates through `stylesheets` declared in the 
		front-matter)

	* The navigation header (`_includes/header.html`)

	* A `<main>` that wraps the content

	* The footer

	* All common scripts, and any included scripts (iterates through `scripts`)

* Content

	Wraps content in a card that formats article content, and 'floats' on top of the background behind on desktop.

	Most content pages either use this layout or the Group layout, which inherits from this. The only exceptions 
	are the 'index' pages: `/index.html`, `/councils.html` and `/org_comm.html`. They have more custom 
	layouts and thus don't use the card.

* Group

	Provides the layout for each group collection. It renders each group's writeup, and iterates through the
	`people` collection to find the people belonging to that group, rendering their writeups and portraits after 
	the writeup. 

	The abbreviation (`name_short`) is used to find the people to include in each group. If a person is in more than one group, they'll have two files in the `people` collection.


## Collections

Most of the content on the site is organised as [collections](https://jekyllrb.com/docs/collections/),
contained in the `writeups` directory. The writeups consist of info about the Executive Board ('councils')
and organising committees ("org\_committees"), and the people in each group.

* Councils, org\_committees: "Groups"
	* layout file: \_layouts/group.html
	* contains a writeup about the council itself
* people: councillors, committee members
	* no layout file, rendered by Group template
	* contains a writeup about the person
	* the group can be iterated through using `site.people`

When the site is built, the pages for councils and organising committees will be output at `/councils/*` 
and `org_committees/*` respectively. The pages under the `people` collection aren't rendered by themselves, but
rendered as part of the councils/org_committee pages.

## Pages

Simpler content pages, like `registration.md`, `about.md` and so on, are written up in Markdown. They each include a titlebar (`_includes/titlebar.html`), requiring a background image and a title.

The more dynamic pages (`schedule.html` and `delegate_resources.html`) have custom layouts and scripting. This is provided by stylesheets and scripts included in each page's front matter, along with a custom HTML template.

The index pages `councils.html` and `org_comm.html` are both very similar to each other, iterating through their respective collections and rendering them on a 'list'. All the animations on these two pages are built with CSS `@keyframes`. There _is_ a `councils.js` file in the site assets, but it's unused.

### Scripting

Apart from the header, only 3 pages include scripting: the landing page, delegate\_resources, and schedule.

They take advantage that any file with an empty front matter will still be processed by Jekyll:
```
---
---
```

This allows site variables, defined in `_config.yml`, to be injected into the scripts at build time.

* Landing page: countdown

    Before DHAP 2019 started, there was a countdown to the start of the event. The circular countdown animation around each number is based on [this guide on animating SVG paths using stroke offsets](https://css-tricks.com/svg-line-animation-works/); instead of using a random path, an SVG circle is used instead.

    Site variables used: `dates.launch_time`, `dates.start_time`, `dates.end_time`

* Delegate resources: password

    The delegate resources are 'locked' behind a password. However, since this is a static site without any server-side behaviour, the password check is done on the client:

    - The page generates a SHA-256 hash from the user's input
    - ...which is then compared against a reference hash included by the site variable `resources_password`.

    Apart from the password check, most of the scripting here revolves around adding/removing CSS classes on the password box.

    Site variables used: `resources_password`

* Schedule

    The 'progress bar' is implemented as a really tall div before each item (in css, the pseudo-element `::before` is used). A date is tied to each `data-date` attribute by injecting it with Jekyll. From there, the script simply compares that date attribute with the current date/time, and adds a 'filled' class if that time has passed.

    The items are generated from `_data/schedule.yml`.

