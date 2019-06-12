<script>
    export let data_list;
    export let first_number;

</script>

<style>
    table {
        border-collapse: collapse;
    }

    thead {
        background-color: #f0f0f0;
    }

    th, td {
        border: 1px solid grey;
        padding: 4px;
    }
</style>

<table>
    <thead>
    <tr>
        <th>#</th>
        <th>id</th>
        <th>ひらがな</th>
        <th>単語</th>
    </tr>
    </thead>
    <tbody>
    {#each data_list as data, i (i)}
        <tr>
            <td>{first_number + i}</td>
            <td>{data.id}</td>
            <td><b>{data.tango}</b></td>
            <td>{data.hiragana}</td>
        </tr>
    {/each}
    </tbody>
</table>
