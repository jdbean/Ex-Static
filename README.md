A tool to give any blog created with the Jekyll static site generator a CMS-style interface for user-friendly content generation. Ex-Static can be deployed directly on a production site but it is ideally deployed on a private development server in order to maintain the advantages of deploying a statically generated production site.

Non-technical authors and editors get a simple web-based graphical interface to create and modify posts on their site and watch as the site updates and refreshes itself automatically to reflect their changes.

## Demo

A live demo site is available [here](https://office.johannabearman.duckdns.org). To access the demo please provide credentials: `demo` and `exstatic password`.

## Technical Overview

Ex-Static is packaged as a Ruby gem that can be installed in any Jekyll project. The Ex-Static gem contains both a backend and a frontend component. Ex-Static's backend integrates two sinatra servers directly with a running instance of Jekyll: one to serve a JSON api and one to serve the React frontend.

The React is single page web application implemented using Redux and Thunk. It relies heavily on React Redux Toastr, React Router, SimpleMDE, React Transition Group, React Widgets, and Semantic UI.

This project would not have been possible were it not for the tremendous resource provided by projects such as WordPress.com's Calypso,
Jekyll Admin, Netlify CMS, and Pagoda.

## Building the Gem Locally

Clone this repository to a development environment and, from the root directory run:
refreshing

```console
$ sh ./script/bootstrap
$ sh ./script/build
$ gem build ex-static
```

To install the gem locally execute:

```console
$ gem install ex-static
```

## Installation

Install the `ex-static` jekyll plugin as you would any other plugin.

1. Add the following to your site's Gemfile:

    ```ruby
    gem 'ex-static', group: :jekyll_plugins
    ```

2. Run `bundle install`

## Usage

1. Start Jekyll (`bundle exec jekyll serve`). Optionally add the `-l` flag to enable support for automatic hot reloading of modified pages.
2. Navigate to `localhost:4000/admin` to view the Ex-Static interface.
