<svelte:options tag="themable-grid" />

<script>
  import { beforeUpdate } from 'svelte';
  import Card from './Card.svelte'

  export let hass;

  let config
  export function setConfig (conf) {
  console.log(conf)
    config = conf
  }

  $: selectedTheme = hass?.selectedTheme?.theme
  $: themes = hass?.themes
  $: theme = themes?.themes?.[selectedTheme]
</script>

<style>
  section {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 8px;
    padding: 0;
    border: 1px solid red;
  }
</style>

<main>
  <h1>Theme {selectedTheme} !</h1>

  {#if config}
    <section>
    {#each config.cards as card, index}
      <Card type={card.type.replace('custom:', '')} hass={hass} config={card}></Card>
    {/each}
    </section>
  {/if}
</main>
