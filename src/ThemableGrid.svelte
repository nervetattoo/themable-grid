<svelte:options tag="themable-grid" />

<script>
  import { onMount, beforeUpdate, afterUpdate } from 'svelte';
  import Card from './Card.svelte'

  export let hass;

  let config
  let bpClass = 'small'

  export function setConfig (conf) {
    config = conf
    config = {
      ...conf,
        cards: conf.cards.map(card => {
        let el
        if (card.type.startsWith('custom:')) {
          el = card.type.replace('custom:', '')
        } else {
          el = `hui-${card.type}-card`
        }
        return { ...card, _el: el }
      })
    }
  }

  $: selectedTheme = hass?.selectedTheme?.theme
  $: themes = hass?.themes
  $: theme = themes?.themes?.[selectedTheme] ?? {
    grid_col_s: 1,
    grid_col_m: 2,
    grid_col_l: 2,
    grid_gap: '8px',
    grid_padding: '8px',
  }

  function handleBreakpoint (size) {
    return e => {
      if (e.matches) {
        bpClass = size
      }
    }
  }

  onMount(() => {
    const breakpoints = {
      small: theme?.['breakpoint-small'] ?? '(max-width: 768px)',
      medium: theme?.['breakpoint-medium'] ?? '(min-width: 769px) and (max-width: 1024px)',
      large: theme?.['breakpoint-large'] ?? '(min-width: 1025px)',
    }

    Object.entries(breakpoints).forEach(([name, mq]) => {
      const e = window.matchMedia(mq)
      const fn = handleBreakpoint(name)
      e.addListener(fn)
      fn(e)
    })
  })

</script>

<style>
  section {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: var(--gap, 8px);
    padding: var(--padding, 8px);
  }

  section.small {
    grid-template-columns: repeat(var(--s-cols, 1), 1fr);
  }
  section.medium {
    grid-template-columns: repeat(var(--m-cols, 1), 1fr);
  }
  section.large {
    grid-template-columns: repeat(var(--l-cols, 1), 1fr);
  }
</style>

<main>
  {#if config}
    <section 
      class={bpClass}
      style="
        --s-cols: {theme?.['grid_col_s'] ?? 1};
        --m-cols: {theme?.['grid_col_m'] ?? 2};
        --l-cols: {theme?.['grid_col_l'] ?? 3};
        --gap: {theme?.['grid_gap'] ?? '8px'};
        --padding: {theme?.['grid_padding'] ?? '8px'};
    ">
    {#each config.cards as card, index}
      <Card
        type={card._el}
        hass={hass}
        config={card}>
      </Card>
    {/each}
    </section>
  {/if}
</main>
