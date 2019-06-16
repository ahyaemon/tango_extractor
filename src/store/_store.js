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
    const _pagination = get(pagination);
    const params = {
        condition: get(condition),
        page: _pagination.page,
        amount: _pagination.amount,
    };
    const res = await axios.get('index.json', { params });

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
    condition.update(c => {
        c.page = 1;
        return c;
    })
};

export const increment_page = () => {
    condition.update(c => {
        c.page += 1;
        return c;
    })
};

export const decrement_page = () => {
    condition.update(c => {
        c.page -= 1;
        return c;
    })
}
