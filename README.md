# Lovelace themable grid WIP

> This is a work in progress experimental lovelace grid card replacement.

A responsive grid card that can be tweaked in your theme definition.

![Demo](/screenshots/themable-grid-demo.gif)

## Installation

[`Try HACS first`](https://hacs.xyz/)

1. Download the `themable-grid.js` from the [latest release](https://github.com/nervetattoo/themable-grid/releases/latest) and store it in your `configuration/www` folder.
2. Configure Lovelace to load the card:

## Configuration

It only supports the `cards` key to list cards. It has breakpoints defined for small/medium/large viewports and you can use the theme to specify the number of columns for each breakpoint.

```yaml
frontend:
  themes:
    themable_grid:
      columns-small: 2
      columns-medium: 3
      columns-large: 4
```

There are sane defaults for 1/2/3 columns if nothing is specified, which is probably close to what most would want.
You can also override the `grid-column` and `grid-row` with a valid CSS value for a specific card as you can see in the following example

```yaml
type: 'custom:themable-grid'
cards:
  - type: markdown
    content: First
  - type: markdown
    content: Second
    grid_column: 1 / -1
  - type: markdown
    content: Third
```

## Caveats

1. Part of what makes this experimental is that it is built using Svelte, because I wanted to test it out.
2. All the cards will be wrapped in a div because I've yet to find a working way to avoid that for dynamic tag names in Svelte.
3. Support for custom breakpoints is missing but on the todo
4. It probably breaks in a number of cases
5. It requires a modern browser