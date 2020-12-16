<svelte:options tag="themable-grid-card" />

<script>
  import { createCard } from "card-tools/src/lovelace-element";

	export let type = 'div'
  export let config = {};
  export let hass;
	
	function uplift(node) {
		// content will only be defined after the first render, so all logic can be done in update
		return {
			update({type, hass}) {
        const { grid_column, grid_row, ...rest } = config

        if (node?.firstChild?.tagName === type.toUpperCase()) {
          node.firstChild.hass = hass
          if (grid_column) {
            node.style['grid-column'] = grid_column
          }
          if (grid_row) {
            node.style['grid-row'] = grid_column
          }
          return
        }

        const el = createCard(config)
        if (typeof grid_column !== "undefined") {
          node.style['grid-column'] = String(grid_column)
        }
        if (typeof grid_row !== "undefined") {
          node.style['grid-row'] = String(grid_column)
        }
        el.hass = hass
        node?.replaceChildren(el)
			}
		}
	}
</script>

<div use:uplift={{ type, hass }}>
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
