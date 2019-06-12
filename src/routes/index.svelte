<svelte:head>
	<title>単語抽出</title>
</svelte:head>

<script>
	import Condition from '../components/Condition.svelte'
	import TangoTable from '../components/TangoTable.svelte'

	import { onMount } from 'svelte'
	import { fetch_data } from '../fetch'
	import { mojis } from '../mojis'

	const condition = {};
	for (let moji of mojis) {
		condition[moji[0]] = { checked: false, amount: 0}
	}
	condition.a.checked = true;
	condition.a.amount = 2;
	condition.k.checked = true;

	let data_list = [];
	let count = 0;
	let amount = 30;
	let page = 1;
	$: page_amount = Math.ceil(count / amount);

	async function update() {
		const res = await fetch_data(condition, page, amount);
		data_list = res.rows;
		count = res.count;
	}

	$: left_data = data_list.slice(0, amount / 2);
	$: right_data = data_list.slice(amount / 2, amount)

	function condition_changed() {
	    page = 1;
	    update();
    }

	onMount(async () => {
		update();
	});

	function left() {
		if (page >= 2) {
			page -= 1;
			update();
		}
	}

	function right() {
		if (page <= page_amount - 1) {
			page += 1;
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
	<h1>単語抽出</h1>
	<hr>
	<div class="condition">
		{#each mojis as moji}
			<div class="consonant">
				<Condition bind:consonant={condition[moji[0]]} on:change={condition_changed}>{moji[1]}</Condition>
			</div>
		{/each}
	</div>

	<p>{count} 件 ({amount} 件表示)</p>
	<div>
		<button on:click={left}>◀</button>
		<span>{page} / {page_amount}</span>
		<button on:click={right}>▶</button>
	</div>

	<div>
		<div class="tango-table">
			<TangoTable data_list={left_data} first_number={(page - 1) * amount + 1}/>
		</div>
		<div class="tango-table">
			<TangoTable data_list={right_data} first_number="{(page - 1) * amount + amount /2 + 1}"/>
		</div>
	</div>
</div>
