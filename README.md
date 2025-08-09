# 14 Sesja Linuksowa

This is a complete rewrite of the website that was originally built with Sinatra. I did this rewrite because Sinatra is not a static site generator (SSG), so you can't get reproducible builds on GitHub Pages and it's hard to install and build old projects. The website keeps the original design but with some fixes - I recreated missing pages (like the agenda), removed old and unstable jQuery scripts, and removed Google trackers. Almost no original code is left - everything was rebuilt using Jekyll templates and a modular system. The main goal is to build one big website that contains all conference sites from the beginning to now. It was hard work to change all absolute URLs to relative URLs (but I did it anyway) so we can use directories instead of tons of subsubsubsubsubsubdomains for each conference year. The website's code and structure is messy but it works properly and there's no point in rewriting everything. The most important thing is that this now works with modern tools and you don't need to install weird old systems just to use old Ruby.

## Technical overview

- **Jekyll** - Static site generator with Liquid templating
- **No themes** - There is no need when recreating the old site
- **i18n** - Polish and English with YAML data files and fallback system
- **Fixed pages** - The mighty agenda came back and Google said arrivederci

### Requirements

- Ruby
- RVM
- Bundler

## Setup

Use version specified in [Gemfile](./Gemfile) in place of `<version>` e.g. `3.4.5`.

### Ruby setup

```sh
rvm install <version>
```

then

```sh
rvm use <version>
```

### Project setup

```sh
git clone git@github.com:asi-wroclaw/14.sesja.linuksowa.git
```

```sh
cd 14.sesja.linuksowa
```

```sh
bundle install --jobs=$(nproc)
```

### Update setup

```sh
gem install bundle_update_interactive
```

## Development

```sh
bundle exec jekyll serve
```

Use snippet below or open it manually in your browser:

```sh
xdg-open http://localhost:4000
```

### Building

```sh
bundle exec jekyll build
```

### Updating

```sh
bundle ui
```
