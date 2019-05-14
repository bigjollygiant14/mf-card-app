# mf-card-app

### Author - bigjollygiant14

View a demo on [GitHub](https://bigjollygiant14.github.io/mf-card-app/)

# Methodology

## Embedding

1. Update the publicPath in vue.config.js to match the output of where the files will be hosted
2. Run `yarn build`
3. Copy contents of docs to destination directory

## Architecture

This project was bootstrapped with Vue-CLI for the purpose of saving time. The first thing I did was add a proxy so I could start pulling data so I could start playing around with features and how I was going to structure the components.

This resulted in these main features to aid the user in finding their card and info:

1. Filter by card_type to help users find what they\'re looking for faster. Allow the user to filter by any amount of card_types. Initially I was using checkboxes, but I thought that was boring, and using Icons seemed to make it look a little more engaging and less stale.
2. Sort by credit rating so bad wouldn\'t be first. I thought putting positive wording first would give a better reaction on landing.
3. Tabbed view of content I deemed secondary. People come to The Moley Fool becuase they trust the advice given. This is why the default tab is "Why We Picked It". I had initially played around with a Show More button but the content seemed to drag on and some of the lists got really long and placement of Show Less became awkward

### Refactoring Opportunities

1. Event Bus / CardFilters iterator. After using the Event Bus, the CardFilters component seemed a little less important, but I kept it in for two reasons. 1) It allowed me to experiment with the Event Bus which I hadn't done before. 2) It allowed me to keep styles and concerns a little more separate.
2. Vue-Nav-Tabs. We can recreate this functionality and make it reusable with less dependencies.
3. Move API methods to a helper. For a project of this scale, it seemed ok to fetch the one piece of data in the component, especially since that was the only component that needed to make the call.

### Next Steps

1. Add filters for credit level, and explore possibility of marketing credit tools.

### Supporting Libraries

1. Lodash (filter, orderby) - Data Operations
2. Vue-Nav-Tabs - Tabbed View of content
3. Axios - Fetching Data
4. Reset CSS
5. Font-Awesome - Icons

# How to use this Repository

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn run serve
```

### Compiles and minifies for production

```
yarn run build
```

### Compiles and minifies for staging

```
yarn run build:stage
```

### Run your tests

```
yarn run test
```

### Lints and fixes files

```
yarn run lint
```

### Run your unit tests

```
yarn run test:unit
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
