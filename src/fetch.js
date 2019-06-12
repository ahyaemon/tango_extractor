export async function fetch_data(condition, page, amount) {
    const res = await axios.get('index.json', {
        params: {
            condition,
            page,
            amount,
        }
    });
    return res.data
}
