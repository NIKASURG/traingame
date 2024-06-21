function judaLink(kas, kur) {
    if (kas === kur) {
        return kas;
    }

    if (kur < kas) {
        kas -= Math.random() * 15 - 3;

        return kas;
    }

    kas += Math.random() * 15 - 3;

    return kas;
}

function BekNuo(kas, nuo, matoTiek) {
    if (kas < nuo + matoTiek && kas + matoTiek > nuo) {
    } else {
        return false;
    }
    if (nuo > kas) {
        kas -= Math.random() * 13;

        return kas;
    }

    kas += Math.random() * 13;

    return kas;
}

////////////// Šita reike taisyti priminimas ateities kartoms!!!!!!
function BekIJeimatai(kas, ka, matoTiek) {
    // if (kas < ka + matoTiek && kas + matoTiek > ka) {
    //   console.log("tiesa");
    // } else {
    //   return kas;
    // }
    if (kas < ka + matoTiek && kas + matoTiek > ka) {
        return kas;
    } else if (kas < ka - matoTiek && kas - matoTiek > ka) {
        kas += 3;

        return kas;
    }

    return kas;
}

function Pagautas(kas, ka, antrasDidis, pirmasDidis) {
    if (kas < ka + pirmasDidis && kas + antrasDidis > ka) {
        return true;
        // console.log("tiesa");
    }

    return false;
}
function bludiju(kur) {
    return (kur += Math.random() * 20 - 10);
}
