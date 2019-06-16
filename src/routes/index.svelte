<svelte:head>
	<title>単語抽出</title>
</svelte:head>

<script>
	import Condition from '../components/Condition.svelte'
	import TangoTable from '../components/TangoTable.svelte'

	import { onMount } from 'svelte'
	import { fetch_data } from '../fetch'
	import { mojis } from '../domain/moji'
	import { default_condition } from '../domain/condition'
	import { default_pagination } from '../domain/pagination'

	const store = {
		condition: default_condition,
		data_list: [],
		pagination: default_pagination,
	};

	$: page_amount = Math.ceil(store.pagination.count / store.pagination.amount);
	$: left_data = store.data_list.slice(0, store.pagination.amount / 2);
	$: right_data = store.data_list.slice(store.pagination.amount / 2, store.pagination.amount);

	onMount(async () => {
		update();
	});

	async function update() {
		const res = await fetch_data(store.condition, store.pagination.page, store.pagination.amount);
		store.data_list = res.rows;
		store.pagination.count = res.count;
	}

	function condition_changed() {
	    store.pagination.page = 1;
	    update();
    }

	function left() {
		if (store.pagination.page >= 2) {
			store.pagination.page -= 1;
			update();
		}
	}

	function right() {
		if (store.pagination.page <= page_amount - 1) {
			store.pagination.page += 1;
			update();
		}
	}

	function all() {
		const keys = Object.keys(store.condition);
		for (let key of keys) {
			store.condition[key].checked = true;
		}
		update();
	}

	function none() {
		const keys = Object.keys(store.condition);
		for (let key of keys) {
			store.condition[key].checked = false;
		}
		update();
	}

	function zero() {
		const keys = Object.keys(store.condition);
		for (let key of keys) {
			store.condition[key].amount = 0;
		}
		update();
	}
</script>

<style>
	.condition {
		max-width: 440px;
	}

	.consonant {
		display: inline-block;
		border: 1px solid grey;
	}

	.tango-table {
		display: inline-block;
		margin: 20px;
	}

	.normal-button {
		padding: 4px;
		margin: 0 0 4px 0;
		border: 2px solid grey;
		border-radius: 2px;
		background-color: white;
	}
</style>

<div>
	<div>
		<button class="normal-button" on:click={all}>all</button>
		<button class="normal-button" on:click={none}>none</button>
		<button class="normal-button" on:click={zero}>0</button>

	</div>
	<div class="condition">
		{#each mojis as moji}
			<div class="consonant">
				<Condition bind:consonant={store.condition[moji[0]]} on:change={condition_changed}>{moji[1]}</Condition>
			</div>
		{/each}
	</div>

	<p>{store.pagination.count} 件 ({store.pagination.amount} 件表示)</p>
	<div>
		<button on:click={left}>◀</button>
		<span>{store.pagination.page} / {page_amount}</span>
		<button on:click={right}>▶</button>
	</div>

	<div>
		<div class="tango-table">
			<TangoTable data_list={left_data} first_number={(store.pagination.page - 1) * store.pagination.amount + 1}/>
		</div>
		<div class="tango-table">
			<TangoTable data_list={right_data} first_number="{(store.pagination.page - 1) * store.pagination.amount + store.pagination.amount /2 + 1}"/>
		</div>
	</div>

	<div>
		<button on:click={left}>◀</button>
		<span>{store.pagination.page} / {page_amount}</span>
		<button on:click={right}>▶</button>
	</div>
</div>
