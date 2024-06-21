const krumaiPng = [
    "img/krumas.png",
    "img/gerasKrumas.png",
    "img/krumasEh.png",
];
function naujasKrumas(chunkX, chunkY) {
    var randomInedeksas = Math.floor(Math.random() * krumaiPng.length);
    krumaiMas.push({
        x: atsitiktineKordinate(
            canvasPlotis * chunkX,
            canvasPlotis * (chunkX + 1)
        ),
        y: atsitiktineKordinate(
            canvasAukstis * chunkY,
            canvasAukstis * (chunkY + 1)
        ),
        krumas: new Veikejas({ saltinis: krumaiPng[randomInedeksas] }),
    });
}