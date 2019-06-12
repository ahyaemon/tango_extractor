import { Data} from "../dao/model/data";
import { Op } from "sequelize";
import { mojis } from "../mojis"

export async function get(req, res) {
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });

    const condition = JSON.parse(req.query.condition);
    let where = {};
    for (let moji of mojis) {
        const c = condition[moji[0]];
        where[moji[0]] = c.checked ? { [Op.gt]: c.amount - 1} : 0;
    }

    const page = req.query.page
    const amount = req.query.amount
    const contentsAndCount = await Data.findAndCountAll({
        where,
        offset: (page - 1) * amount,
        limit: amount,
    });
    res.end(JSON.stringify(contentsAndCount));
}
