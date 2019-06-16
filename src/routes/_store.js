import { writable, get } from 'svelte/store';

// const default_condition = (() => {
//     const condition = {};
//     for (let moji of moji) {
//         condition[moji[0]] = { checked: false, amount: 0}
//     }
//     condition.a.checked = true;
//     condition.a.amount = 2;
//     condition.k.checked = true;
//     return condition;
// })();
//
// const default_pagination = {
//     count: 0,
//     amount: 30,
//     page: 1,
// };
//
// export const data_list = writable([]);
// export const condition = writable(default_condition);
// export const pagination = writable(default_pagination);
//
// const fetch = async () => {
//     const params = { condition, page, amount };
//     const res = await axios.get('index.json', { params });
//     return res.data
// };
