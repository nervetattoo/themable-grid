<svelte:options tag="themable-grid" />

<script>
  import { beforeUpdate, afterUpdate } from 'svelte';
  import Card from './Card.svelte'

  export let hass;

  let config
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

</script>

<style>
  section {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: var(--gap, 8px);
    padding: var(--padding, 8px);
  }

  @media (min-width: 768px) {
    section {
      grid-template-columns: repeat(var(--s-cols, 1), 1fr);
    }
  }
  @media (min-width: 1024px) {
    section {
      grid-template-columns: repeat(var(--m-cols, 2), 1fr);
    }
  }
  @media (min-width: 1200px) {
    section {
      grid-template-columns: repeat(var(--l-cols, 3), 1fr);
    }
  }
</style>

<main>
  {#if config}
    <section style="
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
