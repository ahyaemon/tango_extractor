<svelte:head>
	<title>単語抽出</title>
</svelte:head>

<script>
	import Condition from '../components/Condition.svelte'
	import TangoTable from '../components/TangoTable.svelte'

	import { onMount } from 'svelte'
	import { fetch_data } from '../fetch'
	import { mojis, default_condition } from '../mojis'

	const store = {
		condition: default_condition(),
		data_list: [],
		count: 0,
		amount: 30,
		page: 1,
	};

	$: page_amount = Math.ceil(store.count / store.amount);
	$: left_data = store.data_list.slice(0, store.amount / 2);
	$: right_data = store.data_list.slice(store.amount / 2, store.amount)

	onMount(async () => {
		update();
	});

	async function update() {
		const res = await fetch_data(store.condition, store.page, store.amount);
		store.data_list = res.rows;
		store.count = res.count;
	}

	function condition_changed() {
	    store.page = 1;
	    update();
    }

	function left() {
		if (store.page >= 2) {
			store.page -= 1;
			update();
		}
	}

	function right() {
		if (store.page <= page_amount - 1) {
			store.page += 1;
			update();
		}
	}
</script>

<style>
	.condition {
		width: 530px;
	}

	.consonant {
		display: inline-block;
	}

	.tango-table {
		display: inline-block;
		margin: 20px;
	}
</style>

<div>
	<div class="condition">
		{#each mojis as moji}
			<div class="consonant">
				<Condition bind:consonant={store.condition[moji[0]]} on:change={condition_changed}>{moji[1]}</Condition>
			</div>
		{/each}
	</div>

	<p>{store.count} 件 ({store.amount} 件表示)</p>
	<div>
		<button on:click={left}>◀</button>
		<span>{store.page} / {page_amount}</span>
		<button on:click={right}>▶</button>
	</div>

	<div>
		<div class="tango-table">
			<TangoTable data_list={left_data} first_number={(store.page - 1) * store.amount + 1}/>
		</div>
		<div class="tango-table">
			<TangoTable data_list={right_data} first_number="{(store.page - 1) * store.amount + store.amount /2 + 1}"/>
		</div>
	</div>
</div>
