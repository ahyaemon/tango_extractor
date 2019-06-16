import { mojis } from './moji'

export const default_condition = (() => {
    const condition = {};
    for (let moji of mojis) {
        condition[moji[0]] = { checked: false, amount: 0}
    }
    condition.a.checked = true;
    condition.a.amount = 2;
    condition.k.checked = true;
    return condition;
})();
