<svelte:head>
	<title>単語抽出</title>
</svelte:head>

<script>
	import Condition from '../components/Condition.svelte'
	import TangoTable from '../components/TangoTable.svelte'
	import Spinner from '../components/Spinner.svelte'

	import { mojis } from '../domain/moji'
	import { default_condition } from '../domain/condition'
	import { default_pagination } from '../domain/pagination'

	import { get } from 'svelte/store';
	import { data_list, condition, pagination, fetch, page_amount, data_to_tsv } from '../store/_store'
	import { activate_all_condition, deactivate_all_condition, set_zero_condition } from '../store/_store'
	import { increment_page, decrement_page, init_page } from '../store/_store'
	import { download } from '../download'

	import { fade } from 'svelte/transition'

	async function create_table_data() {
		data_exists = false;
		await fetch();
		data_exists = true;

		const _data_list = get(data_list);
		const _page = get(pagination).page;
		const _amount = get(pagination).amount;
		return {
			left_data: _data_list.slice(0, _amount / 2),
			left_data_first_number: (_page - 1) * _amount + 1,
			right_data: _data_list.slice(_amount / 2, _amount),
			right_data_first_number: (_page - 1) * _amount + _amount /2 + 1,
		}
	}

	let data_exists = false;
	let promise = create_table_data();

	function condition_changed() {
	    init_page();
	    promise = create_table_data();
    }

	function left() {
		if (get(pagination).page >= 2) {
			decrement_page();
			promise = create_table_data();
		}
	}

	function right() {
		if (get(pagination).page <= get(page_amount) - 1) {
			increment_page();
			promise = create_table_data();
		}
	}

	function all() {
		activate_all_condition();
		init_page();
		promise = create_table_data();
	}

	function none() {
		deactivate_all_condition();
		init_page();
		promise = create_table_data();
	}

	function zero() {
		set_zero_condition();
		init_page();
		promise = create_table_data();
	}

	function download_tsv() {
		// const tsv = data_to_tsv();
		download(get(condition));
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

	.tsv-button {
		border-color: #ff9928;
		color: #ff9928;
		margin-left: 20px;
		font-weight: bold;
	}

	.spinner {
		padding: 100px;
		height: 100px;
	}
</style>

<div>
	<div>
		<button class="normal-button" on:click={all}>all</button>
		<button class="normal-button" on:click={none}>none</button>
		<button class="normal-button" on:click={zero}>0</button>
		<button class="normal-button tsv-button" on:click={download_tsv}>TSV</button>
	</div>
	<div class="condition">
		{#each mojis as moji}
			<div class="consonant">
				<Condition bind:consonant={$condition[moji[0]]} on:change={condition_changed}>{moji[1]}</Condition>
			</div>
		{/each}
	</div>

	<p>{$pagination.count} 件 ({$pagination.amount} 件表示)</p>
	<div>
		<button on:click={left}>◀</button>
		<span>{$pagination.page} / {$page_amount}</span>
		<button on:click={right}>▶</button>
	</div>
	{#await promise}
		<div class="spinner">
<!--			<Spinner/>-->
		</div>
	{:then res}
		<div transition:fade="{{duration:50}}">
			<div class="tango-table">
				<TangoTable data_list={res.left_data} first_number="{res.left_data_first_number}"/>
			</div>
			<div class="tango-table">
				<TangoTable data_list={res.right_data} first_number="{res.right_data_first_number}"/>
			</div>
		</div>
	{/await}

	<div>
		<button on:click={left}>◀</button>
		<span>{$pagination.page} / {$page_amount}</span>
		<button on:click={right}>▶</button>
	</div>
</div>
