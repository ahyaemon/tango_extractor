import { sequelize} from "../db.configj";
const Sequelize = require('sequelize');

const Model = Sequelize.Model
export class Data extends Model {}
Data.init({
    id: { type: Sequelize.INTEGER, primaryKey: true },
    tango: { type: Sequelize.TEXT },
    hiragana: { type: Sequelize.TEXT },
    a: { type: Sequelize.INTEGER },
    k: { type: Sequelize.INTEGER },
    s: { type: Sequelize.INTEGER },
    t: { type: Sequelize.INTEGER },
    n: { type: Sequelize.INTEGER },
    h: { type: Sequelize.INTEGER },
    m: { type: Sequelize.INTEGER },
    y: { type: Sequelize.INTEGER },
    r: { type: Sequelize.INTEGER },
    w: { type: Sequelize.INTEGER },
    g: { type: Sequelize.INTEGER },
    z: { type: Sequelize.INTEGER },
    d: { type: Sequelize.INTEGER },
    b: { type: Sequelize.INTEGER },
    p: { type: Sequelize.INTEGER },
    nn: { type: Sequelize.INTEGER },
    bar: { type: Sequelize.INTEGER },
}, {
    sequelize,
    modelName: "data",
    timestamps: false,
})
