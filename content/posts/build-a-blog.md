---
title: "Build a blog with Hugo"
date: 2023-02-11
summary: "Creating a blog from scratch can be an exciting and rewarding experience. In this post, we'll explore how to create a blog using the Hugo static site generator. Hugo is a popular open-source tool that makes it easy to build fast, reliable, and flexible websites. Whether you're a beginner or an experienced web developer, you'll find that creating a blog with Hugo is a great way to get started with static site generation. So, let's get started!"
---

## Get started 🐣

Hugo is built on Go and uses Go for its templating language so before you get started make sure you have Go installed. You can install it [here](https://go.dev/doc/install).

You can install Hugo using chocolatey (check out the [installation page](https://gohugo.io/installation/)):

    choco install hugo-extended

To check that it was correctly installed you can run `hugo version`. Then to create the blog, run:

    hugo new site blog

## Directories

In a Hugo project, the file structure is organized into a series of directories that each have a specific purpose. Understanding these directories and their purpose is key to effectively using Hugo to create and maintain your website. In this section, we'll take a look at the typical directories you'll find in a Hugo project and what each of them is used for.

- 📜 **content**
  - Contains all of the content for your Hugo site, organized into subdirectories by content type. 
  - Here we will create a subdirectory *posts* for all your blog posts. This will add them to under the url */posts/[post-name]*
- 🧬 **layouts**
  - Contains the templates that define the layout of your Hugo site. The templates in this directory control how the content in your content directory is displayed on your site.
  - We will use layouts to define the layout of the page that lists the blog posts as well as the blog posts themselves
- 🌃 **assets**
  - Used to store source files for your site's assets, which are processed and output to the public directory when your Hugo site is built.
  - We will add our sass files here when we start styling the blog
- ⚡ **static** (Can be ignored for now)
  - Contains static files that are used by your Hugo site. Compared to the *resources* folder these files are not processed but directly copied to the public directory when your Hugo site is built and do not undergo any processing.
- 🎒 **resources** (Can be ignored for now)
  - Contains the source files for your site's assets, such as images, stylesheets, and JavaScript files. The assets in this directory are processed and output to the public directory when your Hugo site is built.
- 🧑‍🤝‍🧑 **public** (Can be ignored for now)
  - Contains the generated HTML files for your Hugo site. This is the directory that you'll serve to your visitors when your site is live.
- 🔱 **archetypes** (Can be ignored for now)
  - Contains default templates that are used to create new content. The templates in this directory define the structure and format of new content that is created in your Hugo site.
- 💽 **data** (Can be ignored for now)
  - Used to store data files that are used by your Hugo site. The data files can be written in JSON, YAML, or TOML format, and can be used to store information such as site metadata, configuration settings, and custom variables.

## Create the base layout - *baseof.html*

The first thing you have to do is create a baseof.html file in a directory called _default inside the layouts folder, that is `layouts/_default/baseof.html`. This file is used as the main layout for all your pages, hence you can put content inside the head and footer here. 

    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>{{ .Site.Title }} | {{ .Page.Title }}</title>
    </head>
    <body>
      <main>
        {{ block "main" . }}{{ end }}
      </main>
    </body>
    </html>

.Site contains information about global settings of the site. The global settings are contained in a file called *config.toml*. Toml is a configuration language like yaml, and if you're more comfortable with yaml you can even swap it to be a yaml file. The file contains an attribute called *title* that we use here.

.Page contains information about the page you are currently viewing. .Page grabs info from the markdown files that define your pages. They could hold any number of information but a couple of standard ones are Title and Date.

`{{ block "main" . }}` will output any content on the page layouts that is defined with `{{ define "main" }}`. You could add other blocks, as for example a *head* block in the head section and then define special meta data inside each page.

## Create page layouts

There are any number of different layouts you could create for different types of pages. For this blog example we will create two standard page types, *list.html* and *single.html*. List.html is the layout for the page that lists all of your blog posts. Single.html is the layout for the page of each individual blog post. Lets start by looking at list.html.

    {{ define "main" }}
      <h1>{{ .Page.Title }}</h1>
      <ul>
        {{ range where .Site.RegularPages "Type" "posts" }}
          <li>
            <a href="{{ .Permalink }}">{{ .Title }}</a>
            <span>{{ .Date.Format "January 2, 2006" }}</span>
            {{ if .Params.summary }}
              <p>{{ .Params.summary }}</p>
            {{ end }}
          </li>
        {{ end }}
      </ul>
    {{ end  }}

Here we start by wrapping everything in *"define main"* which will put the content inside the body of the baseof layout. As discussed earlier Page.Title is the title of the page defined in the list page's corresponding markdown file. After the heading we create a list of all the posts. `{{ range where .Site.RegularPages "Type" "posts" }}` will loop over all files in a folder that we have named *posts*. All of the parameters that we get inside this range will point to information in the post that we are currently looping through, if we dont explicitly say otherwise. 

Permalink is an automatically generated attribute that will give you the relative path to the page based on the folder structure, so in this case it could be something like */posts/first-blog-post*. Permalink, Title and Date are standard parameters of a page. Params.summary however is a custom property that we have defined inside our blog posts. All custom properties that we define can be retrieved from Params.

The next layout we're going to create is the single.html file.

    {{ define "main" }}
      <article>
        <h1>{{ .Title }}</h1>
        <span>{{ .Date.Format "January 2, 2006" }}</span>
        <a href="/">Back</a>
        <p class="preamble">{{ .Params.summary }}</p>
        {{ .Content }}
      </article>
    {{ end }}

Here we basically display the same information as in the list but with one difference, *Content*. Content will display the markdown text from the posts that we create.

## Add content

At this stage you can start adding the content. In the content folder add the file *_index.md*. This will serve as the base page that lists all the blog posts. By naming conventions this file will be linked to the *list.html* file we created earlier so all you have to do in this file is add the title for the page.

    ---
    title: The life of an avocado lover
    ---

The content inside the tripple dashes is the *front matter*. This is where we put content like title, date and other parameters that we define.

Next we will start adding posts so that we can see some content. Add a new folder called *posts* inside the content folder. Then add a post with a name of your choosing. Add the following:

    ---
    title: "Avocados are the best 🥑"
    date: 2023-02-11
    summary: "Avocados are the best. They are tasty, cute and fun!"
    ---

    ## Majestic avocados of history

    Avocados have been bringing their tastiness to the world for a long time.

Here we have the front matter that we have talked about before with title, date and summary. After the front matter you can start adding any amount of markdown to create your blog post.

And there you go, now you can launch your blog with:

    hugo server

## Add styling

We have a blog with content, but it looks awfully boring without some styling. You can add this as normal CSS but I think [SASS](https://sass-lang.com/) makes life much more enjoyable. To add sass simply create your entry sass file in *assets/sass* and add the following to your *baseof.html* file:

    <head>
      <meta charset="UTF-8">
      <title>{{ .Site.Title }} - {{ .Page.Title }}</title>

      {{ $style := resources.Get "sass/main.scss" }}
      {{ $style = $style | toCSS }}

      <link rel="stylesheet" href="{{ $style.RelPermalink }}">
    </head>

If you want to for example enable source map and make other adjustments to how the css is generated, you can add options like so:

    <head>
      <meta charset="UTF-8">
      <title>{{ .Site.Title }} - {{ .Page.Title }}</title>
      
      {{ $opts := (dict "transpiler" "libsass" "outputStyle" "compressed") }}
      {{ if eq hugo.Environment "development" }}
        {{ $opts = (dict "transpiler" "libsass" "enableSourceMap" true) }}
      {{ end }}

      {{ $style := resources.Get "sass/main.scss" }}
      {{ $style = $style | toCSS $opts }}

      <link rel="stylesheet" href="{{ $style.RelPermalink }}">
    </head>

Feel free to add whatever styling you want! And remember to update the layout html to get working the way you want it.

## Adding JavaScript

If you want any JavaScript functionality, you can add a js file to *static/js* (choose whatever folder name you want). Add it to the page by linking it at the bottom of the body in you *baseof.html* file.

    <body>
      <main>
        {{ block "main" . }}{{ end }}
      </main>
      <script src='{{ "js/main.js" | relURL }}'></script>
    </body>

If you want to make it more adjustable you can a new block, like so:

    <body>
      <main>
        {{ block "main" . }}{{ end }}
      </main>
      {{ block "includes" . }}{{ end }}
    </body>

And then define it in the pages you want to add it, for example *single.html*. Just add:

    {{ define "includes" }}
      <script src='{{ "js/single.js" | relURL }}'></script>
    {{ end }}

