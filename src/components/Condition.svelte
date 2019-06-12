<script>
    import { createEventDispatcher } from 'svelte'

    export let consonant

    const dispatch = createEventDispatcher();
    function change() {
        dispatch('change')
    }
</script>

<label>
    <input type="checkbox" bind:checked={consonant.checked} on:change="{change}"><slot></slot>
    <input class="amount" type="number" bind:value={consonant.amount} min="0" max="10" disabled={!consonant.checked} on:change={change}>
</label>
