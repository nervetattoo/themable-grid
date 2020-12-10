<svelte:options tag="themable-grid-card" />

<script>
	export let type = 'div'
  export let config;
  export let hass;
	
	function uplift(node) {
		// content will only be defined after the first render, so all logic can be done in update
		return {
			update({type}) {
        console.log(type)
				const el = document.createElement(`${type}`)
        el?.setConfig?.(config)
        el.hass = hass
				node.appendChild(el)
			}
		}
	}
</script>

<div use:uplift={{ type}}>
</div>

<style>
	div {
		/* This removes the divs from the flow, so they do not have any effect on the layout */
    display: block;
    border: 1px solid green;
    min-width: -webkit-fill-available;
    padding: 16px 16px 0 16px;
	}
</style>
