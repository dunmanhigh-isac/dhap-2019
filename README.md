# dhap-2019

The site is built with Jekyll, and hosted on Github Pages. You'll need to install Ruby + Bundler, then to setup on your machine:

```bash
$ bundle install
$ bundle exec jekyll serve
# navigate to localhost:4000
``` 

Collections (in writeups):
* Councils, org\_committees: "Groups"
	* layout file: \_layouts/group.html
	* contains a writeup about the council itself
* people: councillors, committee members
	* no layout file, rendered by Group template
	* contains a writeup about the person
	* the group can be iterated through using `site.people`
