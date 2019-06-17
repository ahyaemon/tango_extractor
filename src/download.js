export const download = async (condition) => {
    const data_list = await fetch_data(condition);
    const tsv = create_tsv(data_list);
    const blob = new Blob([ tsv ], { "type" : "text/plain" });

    const filename = "data.tsv";

    if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(blob, filename);
        window.navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        var downLoadLink = document.createElement("a");
        downLoadLink.download = filename;
        downLoadLink.href = URL.createObjectURL(blob);
        downLoadLink.click();
    }
};

const fetch_data = async (condition) => {
    const params = {
        condition,
        page: 1,
        amount: 1000,
    };

    let res = null;
    try {
        res = await axios.get('index.json', { params });
    } catch (e) {
        console.log(e.toString());
        return []
    }
    return res.data.rows
};

const create_tsv = (data_list) => {
    let tsv = "";
    for (const data of data_list) {
        const row = `${data.id}\t${data.hiragana}\t${data.tango}`;
        tsv +=  row + "\n";
    }
    return tsv;
};
