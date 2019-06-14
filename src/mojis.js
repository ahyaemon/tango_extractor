export const mojis = [
    ['a', 'あ'],
    ['k', 'か'],
    ['s', 'さ'],
    ['t', 'た'],
    ['n', 'な'],
    ['h', 'は'],
    ['m', 'ま'],
    ['y', 'や'],
    ['r', 'ら'],
    ['w', 'わ'],
    ['g', 'が'],
    ['z', 'ざ'],
    ['d', 'だ'],
    ['b', 'ば'],
    ['p', 'ぱ'],
    ['xa', 'ぁ'],
    ['xy', 'ゃ'],
    ['nn', 'ん'],
    ['bar', 'ー']
];

export const default_condition = () => {
    const condition = {};
    for (let moji of mojis) {
        condition[moji[0]] = { checked: false, amount: 0}
    }
    condition.a.checked = true;
    condition.a.amount = 2;
    condition.k.checked = true;
    return condition;
};
