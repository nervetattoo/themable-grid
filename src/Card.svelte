<svelte:options tag="themable-grid-card" />

<script>
  import { createCard } from "card-tools/src/lovelace-element";
  import applyStyles from "./applyStyles";

	export let type = 'div'
  export let config = {};
  export let hass;
  export let breakpoint;
	
	function uplift(node) {
		// content will only be defined after the first render, so all logic can be done in update
		return {
			update({hass}) {
        const { grid, ...rest } = config

        applyStyles(node, grid, breakpoint)

        if (node?.firstChild?.tagName) {
          node.firstChild.hass = hass
          return
        }

        const el = createCard(rest)
        el.hass = hass
        if (node) {
          node.innerHTML = ''
          node.appendChild(el)
        }
			}
		}
	}
</script>

<div use:uplift={{ type, hass }}>
</div>

<style>
</style>
