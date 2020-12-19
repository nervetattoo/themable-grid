<svelte:options tag="themable-grid" />

<script>
  import { onMount, tick, afterUpdate } from 'svelte';
  import { lovelace as getLovelace } from "card-tools/src/hass";
  import Card from './Card.svelte'
  import defaultConfig from './defaultConfig.js'

  export let hass;

  let wrapper
  let config = {}
  let columns = 1
  let breakpoint

  const lovelace = getLovelace()
  $: data = {
    ...config,
    ...(lovelace?.config?.themable_grid ?? {}),
  }

  export function setConfig (conf = {}) {
    config = { ...defaultConfig, ...conf }
  }

  function handleBreakpoint (cols, name) {
    return e => {
      if (e.matches) {
        columns = cols
        breakpoint = name
      }
    }
  }

  onMount(async () => {
    await tick()

    Object.values(data.breakpoints).forEach(({name, mq, columns}) => {
      const e = window.matchMedia(mq)
      const fn = handleBreakpoint(columns, name)
      e.addListener(fn)
      fn(e)
    })
  })

</script>

<style>
  section {
    display: grid;
    grid-template-columns: repeat(var(--columns, 1), 1fr);
    grid-gap: var(--gap, 8px);
    padding: var(--padding, 8px);
  }
</style>

<main>
  {#if data}
    <section 
      bind:this={wrapper}
      style="
        --columns: {columns};
        --gap: {data.gap};
        --padding: {data.padding};
    ">
    {#if data.cards}
    {#each data.cards as card, index}
      <Card
        hass={hass}
        config={card}
        breakpoint={breakpoint}
      >
      </Card>
    {/each}
    {/if}
    </section>
  {/if}
</main>
