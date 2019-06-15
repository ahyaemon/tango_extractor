<script>
    import { createEventDispatcher } from 'svelte'

    export let consonant;

    const dispatch = createEventDispatcher();
    function change() {
        dispatch('change')
    }

    function switch_checked() {
        consonant.checked = !consonant.checked;
        change();
    }

    // 9 まで
    function count_up() {
        if (consonant.amount < 9) {
            consonant.amount += 1;
            change();
        }
    }

    // 0 から
    function count_down() {
        if (consonant.amount > 0) {
            consonant.amount -= 1;
            change();
        }
    }
</script>

<style>
    button.white {
        border: none;
        background-color: transparent;
        font-size: inherit;
    }

    button.checked {
        font-weight: bold;
    }

    div.condition {
        padding: 2px;
    }

    div.condition.disabled {
        display: inline-block;
        background-color: #e5e5e5;
    }

    button.disabled {
        color: grey;
    }

    .amount {
        width: 20px;
    }
</style>

<label>
    <div class="condition" class:disabled="{!consonant.checked}">
        <button class="white" class:checked="{consonant.checked}" on:click="{switch_checked}"><slot></slot></button>
        <button class="white" class:disabled="{!consonant.checked}" disabled="{!consonant.checked}" on:click={count_down}>◀</button>
        <span class="amount">{consonant.amount}</span>
        <button class="white" class:disabled="{!consonant.checked}" disabled="{!consonant.checked}" on:click="{count_up}">▶</button>
    </div>
</label>
