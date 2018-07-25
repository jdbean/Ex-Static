A tool to give any blog created with the Jekyll static site generator a CMS-style interface for user-friendly content generation. Ex-Static can be deployed directly on a production site but it is ideally deployed on a development server in order to maintain the advantages of deploying a statically generated production site.

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

## Demo

A live demo site is available [here](https://office.johannabearman.duckdns.org). To access the demo please provide credentials: `demo` and `exstatic password`.
