# Lovelace themable grid WIP

> This is a work in progress experimental lovelace grid card replacement.

A responsive grid card that can be defined once per lovelace dashboard

![Demo](/screenshots/themable-grid-demo.gif)

## Installation

[`Try HACS first`](https://hacs.xyz/)

1. Download the `themable-grid.js` from the [latest release](https://github.com/nervetattoo/themable-grid/releases/latest) and store it in your `configuration/www` folder.
2. Configure Lovelace to load the card:

## Configuration

The `cards` key to list cards is required and the only needed config.
You can configure the grid styling and breakpoints in your root lovelace config (recommended) or on the individual themable-grid card.
You can either rely on the built-in breakpoints to get a 1-2-3 column setup for mobile-tablet-desktop or you can override with your own breakpoints.
The default breakpoints will be named `mobile`, `tablet` and `desktop` to make the intention very clear. These names can be used to override styles for the individual cards on individual breakpoints.

```yaml
type: 'custom:themable-grid'
cards:
  - type: markdown
    content: First
  - type: markdown
    content: Second
  - type: markdown
    content: Third
```

Define the configuration for the card in your root lovelace config as in this example.
You can use an arbitrary number of breakpoints. This config shows the defaults if you don't supply a config.

```yaml
themable_grid:
  padding: 0
  gap: 8px
  breakpoints:
    - name: mobile
      mq: (max-width: 767px)
      columns: 1
    - name: tablet
      mq: (min-width: 768px) and (max-width: 1023px)
      columns: 2
    - name: desktop
      mq: (min-width: 1024px)
      columns: 3
```

### Tweaking specific cards

You can style specific cards in order to for example have it span all columns or to enforce it to start in a new row – or any other crazy thing you want to.
These styles are currently applied to the wrapper div for the card. In the future the wrapping div might go away and styling be applied to the actual card custom element.
Style overrides are set on the `grid` prop, which accepts any CSS property with either a value for all breakpoints or specific values for specific breakpoints.
Here are some examples

#### Card spans all columns
```yaml
type: 'custom:themable-grid'
cards:
  - type: markdown
    content: First
  - type: markdown
    content: Second
    grid:
      grid-column: 1 / -1
```

#### Force card to start a new row on desktop
```yaml
type: 'custom:themable-grid'
cards:
  - type: markdown
    content: First
  - type: markdown
    content: Second
    grid:
      grid-column:
        desktop: 1
```

## Caveats

1. Part of what makes this experimental is that it is built using Svelte, because I wanted to test it out.
2. All the cards will be wrapped in a div because I've yet to find a working way to avoid that for dynamic tag names in Svelte.
3. It probably breaks in a number of cases
4. It requires a modern browser

## Roadmap/ideas

- [x] Arbitrary number of breakpoints. Perhaps 2 breakpoints are enough for some yet 4 is better for other. 
- [ ] Get rid of the wrapping div
- [ ] UI editor. Can probably be based on the native grid one
