<svelte:options tag="themable-grid" />

<script>
  import { onMount, tick, afterUpdate } from 'svelte';
  import Card from './Card.svelte'

  export let hass;

  const defaultConfig = {
    padding: 0,
    gap: '8px',
    breakpoints: [
      {
        name: 'small',
        mq: '(max-width: 767px)',
        columns: 1,
      }, {
        name: 'medium',
        mq: '(min-width: 768px) and (max-width: 1023px)',
        columns: 2,
      }, {
        name: 'large',
        mq: '(min-width: 1024px)',
        columns: 3,
      }
    ]
  }

  $: selectedTheme = hass?.selectedTheme?.theme
  $: themes = hass?.themes
  $: theme = {
    ...(themes?.themes?.[selectedTheme]?.themable_grid ?? {}),
  }

  let config = {}
  let columns = 1

  $: data = { ...config, ...theme }

  export function setConfig (conf = {}) {
    config = { ...defaultConfig, ...conf }
  }

  function handleBreakpoint (cols, name) {
    return e => {
      if (e.matches) {
        columns = cols
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
      style="
        --columns: {columns};
        --gap: {data.gap};
        --padding: {data.padding};
    ">
    {#if data.cards}
    {#each data.cards as card, index}
      <Card hass={hass} config={card}></Card>
    {/each}
    {/if}
    </section>
  {/if}
</main>
