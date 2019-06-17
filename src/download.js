export const download = (txt) => {
    const blob = new Blob([ txt ], { "type" : "text/plain" });
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
