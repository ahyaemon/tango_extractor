import { writable, get, derived } from 'svelte/store';
import { default_condition } from '../domain/condition'
import { default_pagination } from '../domain/pagination'

export const data_list = writable([]);
export const condition = writable(default_condition);
export const pagination = writable(default_pagination);
export const page_amount = derived(pagination, $p => Math.ceil($p.count / $p.amount))
/**
 * - axios でデータとその数(count)を取得する
 * @returns {Promise<*>}
 */
export const fetch = async () => {
    // await new Promise(resolve => setTimeout(resolve, 1000 * 10));

    const _pagination = get(pagination);
    const params = {
        condition: get(condition),
        page: _pagination.page,
        amount: _pagination.amount,
    };

    let res = null;
    try {
        res = await axios.get('index.json', { params });
    } catch (e) {
        // server 側でも axios が実行されてしまい、エラーが発生する
        // client 側のみで使用できればいいため、エラーが起こったら return する
        // ※ 暫定対応
        console.log(e.toString());
        return
    }

    data_list.set(res.data.rows);
    pagination.update(p => {
        p.count = res.data.count;
        return p
    });
};

export const activate_all_condition = () => {
    update_moji_condition((moji) => { moji.checked = true });
};

export const deactivate_all_condition = () => {
    update_moji_condition((moji) => { moji.checked = false });
};

export const set_zero_condition = () => {
    update_moji_condition((moji) => { moji.amount = 0 });
};

const update_moji_condition = (callback) => {
    condition.update(c => {
        const keys = Object.keys(c);
        for (let key of keys) {
            callback(c[key]);
            // c[key].amount = 0;
        }
        return c
    });
};

export const init_page = () => {
    pagination.update(p => {
        p.page = 1;
        return p;
    })
};

export const increment_page = () => {
    pagination.update(p => {
        p.page += 1;
        return p;
    })
};

export const decrement_page = () => {
    pagination.update(p => {
        p.page -= 1;
        return p;
    })
};
