(() => {
  //const canvasAukstis = 768;
  //const canvasPlotis = 1024;
  const canvasAukstis = window.innerHeight;
  const canvasPlotis = window.innerWidth;
  let stop = false;
  let debug = false;
  // pradinės reikšmės valdyti ūkinką
  let up = "w";
  let down = "s";
  let right = "d";
  let left = "a";
  let maseRaidziu = [up, down, right, left];
  let priskirkNauja = "";
  let dabarInsijunges = [];
  let inventorius = [];
  let rankije = 0;
  // žaidimo objektai
  let chunkX = 0;
  let chunkY = 0;
  // Išsaugoti map prototipas (problema yra limitas kiek galima saugoti (sprendimas saugoti kiekviena chunk atskirai (turbut(aš taip tikiosi(nebandžiau nežinau)))))

  // let chunkXVieta = JSON.parse(localStorage.getItem('chunkXVieta'));

  // if (chunkXVieta) {
  //   // Jei objektas jau yra, naudokite jį
  //   console.log("Naudodamas esamą objektą:", chunkXVieta);
  // } else {
  //   // Jei objekto nėra, sukurti naują
  //   let naujasObjektas = {};
  //   localStorage.setItem('chunkXVieta', JSON.stringify(naujasObjektas));
  //   chunkXVieta = naujasObjektas;
  //   console.log("Sukurtas naujas objektas:", chunkXVieta);
  // }
  let chunkXVieta = {};
  let krumaiMas = [];
  let lapesMas = [];
  let zoleMas = [];
  let vistuMas = [];
  let kiekLapiu = 5;
  let kiekChunkKrumu = 4;
  let kiekZoles = 50;
  let pagauta = 0;
  let tiekLapiu = 0;
  let kiekchunks = 0;
  // žemėlapis
  let mapX = 0;
  let mapY = 0;
  let pelesP = 50;
  let pelesA = 50;
  let lapeMato = 900;
  let kryptis = 1;
  let ukinikoX = 0;
  let ukinikoY = 0;
  let minimapMastelis = 6;
  // aukštis/plotis
  let uPlotis = 0;
  let uAukstis = 0;
  let lPlotis = 0;
  let lAukstis = 0;
  let gPlotis = 500;
  let gAuksis = 500;
  let vPlotis = 30;
  let vAukstis = 40;
  let lapemirtgarsas = new Audio("garsas/lapeMirt.mp3");

  const zolePng = [
    "img/zole/zole2.png",
    "img/zole/Žolė.png",
    "img/zole/zole3.png",
    "img/zole/zole4.png",
    "img/zole/zole5.png",
  ];

  const krumaiPng = [
    "img/krumas.png",
    "img/gerasKrumas.png",
    "img/krumasEh.png",
  ];

  //psidukes i ...
  let kaire = false;
  let desine = false;
  let ivirsun = false;
  let izemin = true;
  // pasiimam savo žaidimo aikštelę
  // let zaidimuAikstele: HTMLCanvasElement = document.getElementById('zaidimu-aikstele');
  let nustaimaiIn = false;
  let miniKrumai = true;
  let chunkRibos = false;
  let ignorePlayer = false;
  let aktivusDuomenisBolen = false;
  let zaidimuAikstele = document.getElementById("zaidimu-aikstele");
  let miniMap = document.getElementById("miniMap");
  let idekLapiu = document.getElementById("idekLapiu");
  let meniubtn = document.getElementById("meniubtn");
  let back = document.getElementById("back");
  let debugDiv = document.getElementById("debugDiv");
  let isNustatimu = document.getElementById("isNustatimu");
  let divCentrui = document.getElementById("divCentrui");
  let rodikKruma = document.getElementById("rodikKruma");
  let nustatyami = document.getElementById("nustatyami");
  let scoreboard = document.getElementById("scoreboard");
  let pasirinkimai = document.getElementById("pasirinkimai");
  let aktivusDuomenis = document.getElementById("aktivusDuomenis");
  let customMeniu = document.getElementById("customMeniu");
  let setings = document.getElementById("setings");
  let DebugXY = document.getElementById("DebugXY");
  let greitisKeisti = document.getElementById("greitis");
  let rodikChunks = document.getElementById("rodikChunks");
  let minictxmastelis = document.getElementById("mastelis");
  let lapeIgnoruoja = document.getElementById("lapeIgnoruoja");
  let gristNamo = document.getElementById("gristNamo");
  // miktuku klausimas
  meniubtn.addEventListener("click", stopon);
  gristNamo.addEventListener("click", namo);
  back.addEventListener("click", stopon);
  setings.addEventListener("click", setingsOn);
  isNustatimu.addEventListener("click", setingsOn);
  //ma dydžio kintamieji
  zaidimuAikstele.width = canvasPlotis;
  zaidimuAikstele.height = canvasAukstis;
  miniMap.width = canvasPlotis / minimapMastelis;
  miniMap.height = canvasAukstis / minimapMastelis;

  const ctx = zaidimuAikstele.getContext("2d");
  const minictx = miniMap.getContext("2d");
  const multiplier = 1103515245;
  const increment = 12345;
  const modulus = Math.pow(2, 32);
  let kiekSeeds = 0;
  let pradinisSkaicius = Math.round(Math.random() * kiekSeeds);
  function sugeneruotiSkaiciu() {
    pradinisSkaicius = (multiplier * pradinisSkaicius + increment) % modulus;
    const randomNum = pradinisSkaicius / modulus;
    // pradinisSkaicius++
    // console.log(randomNum);
    return randomNum;
    // return sugeneruotiSkaiciu()
  }
  function namo() {
    mapX = 0;
    mapY = 0;
  }
  // piešiame vištų gardą
  const gardas = new Veikejas({ saltinis: "img/gardasvistoms.png" });
  // let corsor = new Veikejas({ saltinis: "img/taipcursor.png" });
  let pelesX = 0;
  let pelesY = 0;
  // piešiame ūkininką
  let ukininkas = new Veikejas({ saltinis: "img/ukininkas.png" });
  let zoleBacgraund = new Veikejas({ saltinis: "img/zole/zolebackV2.png" });
  // let zoleBacgraund = new Veikejas({ saltinis: "img/chunkriba.png" });
  zaidimuAikstele.addEventListener("mousemove", function (event) {
    rect = zaidimuAikstele.getBoundingClientRect();
    pelesX = event.clientX - rect.left;
    pelesY = event.clientY - rect.top;

    // console.log("Pelės koordinatės: (" + pelesX + ", " + pelesY + ")");

    // čia galite atlikti kitas operacijas, pvz., piešti
  });
  ukininkas.kiekLaiko(3);
  document.body.addEventListener("uzsikroviau", (e) => {
    // console.log("............", e);
    ukinikoX = canvasPlotis / 2 - ukininkas.manoPlotis() / 6;
    ukinikoY = canvasAukstis / 2 - ukininkas.manoAuktis() / 8;
    uPlotis = ukininkas.manoPlotis() / 3;
    uAukstis = ukininkas.manoAuktis() / 4;
    for (const lape of lapesMas) {
      lPlotis = lape.lapes.manoPlotis();
      lAukstis = lape.lapes.manoAuktis();
      ukininkas.kiekLaiko(kiekLapiu);
    }
  });

  let greitis = 10;
  gardoX = (canvasPlotis - gardas.manoPlotis()) / 2;
  gardoY = (canvasAukstis - gardas.manoAuktis()) / 2;
  function atnaujinkMygtuka(mygtukoId, tekstas) {
    document.querySelector(`#${mygtukoId} span`).innerHTML = tekstas;
  }

  idekLapiu.onchange = function () {
    lapesMas = [];
    kiekLapiu = idekLapiu.value;
    for (let i = 0; i < kiekLapiu; i++) {
      sukurkLape(canvasPlotis, canvasAukstis);
    }
  };
  minictxmastelis.onchange = function () {
    minimapMastelis = minictxmastelis.value;
    miniMap.width = canvasPlotis / minimapMastelis;
    miniMap.height = canvasAukstis / minimapMastelis;
  };
  greitisKeisti.onchange = function () {
    greitis = Number(greitisKeisti.value);
  };
  rodikKruma.onchange = function () {
    console.log(rodikKruma.indeterminate);
    if (!rodikKruma.indeterminate) {
      miniKrumai = !miniKrumai;
    }
  };
  lapeIgnoruoja.onchange = function () {
    if (!lapeIgnoruoja.indeterminate) {
      ignorePlayer = !ignorePlayer;
    }
  };
  rodikChunks.onchange = function () {
    if (!rodikChunks.indeterminate) {
      chunkRibos = !chunkRibos;
    }
    if (chunkRibos) {
      zoleBacgraund = new Veikejas({ saltinis: "img/chunkriba.png" });
    } else {
      zoleBacgraund = new Veikejas({ saltinis: "img/zole/zolebackV2.png" });
    }
  };
  aktivusDuomenis.onchange = function () {
    aktivusDuomenisBolen = !aktivusDuomenisBolen;
    if (aktivusDuomenis.indeterminate) {
      scoreboard.classList.toggle("active");
    } else {
      scoreboard.classList.toggle("active");
    }
  };
  customMeniu.onchange = function () {
    scoreboard.style.left = customMeniu.value + "vw";
  };

  addEventListener("keydown", (e) => {
    // ar norim kažkurį pakeisti?
    if (e.key === "Escape") {
      stopon();
    }

    if (e.key === "Shift" && !aktivusDuomenisBolen) {
      scoreboard.classList.toggle("active");
    }
    if (e.key === "F2") {
      debug = !debug;
      if (debug) {
        debugDiv.style.display = "";
      } else {
        debugDiv.style.display = "none";
      }
    }
    if (priskirkNauja !== "") {
      switch (priskirkNauja) {
        case "up":
          up = e.key.toLocaleLowerCase();
          atnaujinkMygtuka("up", up);
          break;
        case "down":
          down = e.key.toLocaleLowerCase();
          atnaujinkMygtuka("down", down);
          break;
        case "left":
          left = e.key.toLocaleLowerCase();
          atnaujinkMygtuka("left", left);
          break;
        case "right":
          right = e.key.toLocaleLowerCase();
          atnaujinkMygtuka("right", right);
          break;
      }

      priskirkNauja = "";

      maseRaidziu = [up, down, right, left];
    }

    if (!maseRaidziu.includes(e.key.toLocaleLowerCase())) {
      return;
    }

    if (dabarInsijunges.includes(e.key.toLocaleLowerCase())) {
      return;
    }

    dabarInsijunges.push(e.key.toLocaleLowerCase());
  });

  addEventListener("keyup", (e) => {
    if (e.key === "Shift" && !aktivusDuomenisBolen) {
      scoreboard.classList.toggle("active");
    }
    if (!maseRaidziu.includes(e.key.toLocaleLowerCase())) {
      return;
    }

    if (!dabarInsijunges.includes(e.key.toLocaleLowerCase())) {
      return;
    }

    dabarInsijunges.splice(
      dabarInsijunges.indexOf(e.key.toLocaleLowerCase()),
      1
    );
  });
  function sukurkChunk(x, y) {
    kiekchunks++;
    // console.log(chunkXVieta);
    if (!chunkXVieta[x.toString()]) {
      chunkXVieta[x.toString()] = {};
    }

    chunkXVieta[x.toString()][y.toString()] = {};

    console.log("šio čiunk nera, sukuriu ji");

    // console.log(chunkXVieta);
    for (let i = 0; i < kiekChunkKrumu; i++) {
      var randomInedeksas = Math.floor(sugeneruotiSkaiciu() * krumaiPng.length);
      krumaiMas.push({
        x: atsitiktineKordinate(canvasPlotis * (x - 1), canvasPlotis * x),
        y: atsitiktineKordinate(canvasAukstis * (y - 1), canvasAukstis * y),
        krumas: new Veikejas({ saltinis: krumaiPng[randomInedeksas] }),
      });
    }
    for (let i = 0; i < kiekZoles; i++) {
      var randomInedeksas = Math.floor(sugeneruotiSkaiciu() * zolePng.length);
      zoleMas.push({
        x: atsitiktineKordinate(canvasPlotis * (x - 1), canvasPlotis * x),
        y: atsitiktineKordinate(canvasAukstis * (y - 1), canvasAukstis * y),
        zole: new Veikejas({ saltinis: zolePng[randomInedeksas] }),
      });
    }
    chunkXVieta[x.toString()][y.toString()]["krumas"] = krumaiMas;
    chunkXVieta[x.toString()][y.toString()]["zole"] = zoleMas;
    zoleMas = [];
    krumaiMas = [];
    console.log("chunk sukurtas");
  }
  function stopon() {
    stop = !stop;
    if (stop) {
      divCentrui.style.display = "";
      scoreboard.style.display = "none";
    } else {
      scoreboard.style.display = "";
      divCentrui.style.display = "none";
    }
    nustaimaiIn = true;
    setingsOn();
  }
  function setingsOn() {
    nustaimaiIn = !nustaimaiIn;
    if (nustaimaiIn) {
      nustatyami.style.display = "";
      pasirinkimai.style.display = "none";
    } else {
      nustatyami.style.display = "none";
      pasirinkimai.style.display = "";
    }
  }
  // @todo: reikia iskelti i ivykiu faila
  //////////////////////////
  function virsun() {
    priskirkNauja = "up";
  }

  function zemin() {
    priskirkNauja = "down";
  }

  function kairen() {
    priskirkNauja = "left";
  }

  function desinen() {
    priskirkNauja = "right";
  }

  function clickLisener(id, funkcija) {
    document.getElementById(id).addEventListener("click", funkcija);
  }
  clickLisener("up", virsun);
  clickLisener("down", zemin);
  clickLisener("left", kairen);
  clickLisener("right", desinen);

  function atsitiktineKordinate(min, max) {
    const atsitiktinisSkaicius = sugeneruotiSkaiciu() * (max - min) + min;
    return atsitiktinisSkaicius;
  }
  function generuotiAtsitiktiniSkaiciu(
    min,
    max,
    neleistinasMin,
    neleistinasMax
  ) {
    let atsitiktinisSkaicius;

    do {
      atsitiktinisSkaicius =
        Math.floor(sugeneruotiSkaiciu() * (max - min + 1)) + min;
    } while (
      atsitiktinisSkaicius >= neleistinasMin &&
      atsitiktinisSkaicius <= neleistinasMax
    );

    return atsitiktinisSkaicius;
  }
  const lapesPng = ["img/lapes.png", "img/lapeszalios.png"];
  function sukurkLape(kurX, kurY) {
    var randomInedeksas = Math.floor(sugeneruotiSkaiciu() * lapesPng.length);
    lapesMas.push({
      x: atsitiktineKordinate(-kurX * 5, kurX * 5),
      y: atsitiktineKordinate(-kurY * 5, kurY * 5),
      kiekBludiju: 0,
      puolu: false,
      suvista: false,
      lapes: new Veikejas({ saltinis: lapesPng[randomInedeksas] }),
    });
  }

  const vistosPng = ["img/vista.png"];
  function sukurkVsta(nuoX, ikiX, nuoY, ikiY, garde) {
    var randomInedeksas = Math.floor(sugeneruotiSkaiciu() * vistosPng.length);
    vistuMas.push({
      x: atsitiktineKordinate(nuoX, ikiX),
      y: atsitiktineKordinate(nuoY, ikiY),
      garde: garde,
      sulape: false,
      vista: new Veikejas({ saltinis: vistosPng[randomInedeksas] }),
    });
  }

  for (let i = 0; i < kiekLapiu; i++) {
    sukurkLape(canvasPlotis, canvasAukstis);
  }

  for (let i = 0; i < 10; i++) {
    sukurkVsta(
      gardoX + mapX + vPlotis,
      gardoX + mapX + gPlotis - vPlotis * 2,
      gardoY + mapY + vAukstis,
      gardoY + mapY + gAuksis - vAukstis * 2,
      true
    );
  }

  function nupiesemKruma(x, y) {
    for (const krumai of chunkXVieta[x][y]["krumas"]) {
      // console.log(krumai);
      krumai.krumas.nupiesk(ctx, -krumai.x + mapX, -krumai.y + mapY);

      if (miniKrumai) {
        minictx.fillStyle = "#17441b";
        minictx.fillRect(
          -krumai.x / 100 + canvasPlotis / (minimapMastelis * 2),
          -krumai.y / 100 + canvasAukstis / (minimapMastelis * 2),
          5,
          5
        );
      }
    }
  }
  function nupieskZole(x, y) {
    for (const zolyte of chunkXVieta[x.toString()][y.toString()]["zole"]) {
      zolyte.zole.nupiesk(ctx, -zolyte.x + mapX, -zolyte.y + mapY);
    }
  }
  function nupieškBackgraund(kurX, kurY) {
    piešimoX = kurX + canvasPlotis * -chunkX;
    piešimoY = kurY + canvasAukstis * -chunkY;
    zoleBacgraund.nupiesk(ctx, piešimoX, piešimoY, canvasPlotis, canvasAukstis);

    piešimoX -= canvasPlotis;
    zoleBacgraund.nupiesk(ctx, piešimoX, piešimoY, canvasPlotis, canvasAukstis);

    piešimoY -= canvasAukstis;
    zoleBacgraund.nupiesk(ctx, piešimoX, piešimoY, canvasPlotis, canvasAukstis);

    piešimoX += canvasPlotis;
    zoleBacgraund.nupiesk(ctx, piešimoX, piešimoY, canvasPlotis, canvasAukstis);
  }

  //pagrindinis ciklas
  function piesimoFunkcija() {
    if (stop) {
      requestAnimationFrame(piesimoFunkcija);

      return;
    }
    chunkX = Math.floor(mapX / canvasPlotis);
    chunkY = Math.floor(mapY / canvasAukstis);
    stringX = chunkX.toString();
    stringY = chunkY.toString();
    // console.clear()

    minictx.clearRect(0, 0, canvasPlotis, canvasAukstis);
    lapeMato = atsitiktineKordinate(200, 1500);
    ctx.clearRect(0, 0, canvasPlotis, canvasAukstis);
    nupieškBackgraund(mapX, mapY);
    if (chunkRibos) {
      console.clear();
      for (const chunk in chunkXVieta) {
        for (const chunky in chunkXVieta[chunk]) {
          // minictx.fillStyle = "#b43e20";
          // minictx.fillRect(
          //   -minimapMastelis * parseInt(chunk) +
          //   canvasPlotis / (minimapMastelis * 2),
          //   -minimapMastelis * parseInt(chunky) +
          //   canvasAukstis / (minimapMastelis * 2),
          //   canvasPlotis / minimapMastelis / 50,
          //   canvasAukstis / minimapMastelis / 50
          // );
          for (const krumas in chunkXVieta[chunk][chunky]) {
            for (const krums in chunkXVieta[chunk][chunky]["krumas"]) {
              console.log(krums[0]);
              minictx.fillStyle = "#17441b";
              minictx.fillRect(
                -krums.x / 100 + canvasPlotis / (minimapMastelis * 2),
                -krums.y / 100 + canvasAukstis / (minimapMastelis * 2),
                5,
                5
              );
            }
          }
          // console.log(chunk, chunky);
        }
      }
    }
    gardas.nupiesk(ctx, gardoX + mapX, gardoY + mapY, gPlotis, gAuksis);
    switch (true) {
      case izemin:
        ukininkas.animuok(
          ctx,
          0,
          0,
          66,
          103,
          ukinikoX,
          ukinikoY,
          86,
          100,
          -1,
          0
        );
        break;
      case kaire:
        ukininkas.animuok(
          ctx,
          0,
          0,
          66,
          103,
          ukinikoX,
          ukinikoY,
          86,
          100,
          -1,
          1
        );
        break;
      case desine:
        ukininkas.animuok(
          ctx,
          0,
          0,
          66,
          103,
          ukinikoX,
          ukinikoY,
          86,
          100,
          -1,
          3
        );
        break;
      case ivirsun:
        ukininkas.animuok(
          ctx,
          0,
          0,
          66,
          103,
          ukinikoX,
          ukinikoY,
          86,
          100,
          -1,
          2
        );
        break;
      default:
        // Veiksmai, jei niekas neatitiko sąlygos
        break;
    }

    for (const lape of lapesMas) {
      if (lape.kiekBludiju < 500 && !lape.puolu && !lape.suvista) {
        lape.kiekBludiju++;
        if (lape.kiekBludiju > 488) {
          lape.kiekBludiju = 0;
          lape.puolu = sugeneruotiSkaiciu() > 0.5;
          console.log("atakuoju:" + lape.puolu);
        }
      }
      if (
        BekNuo(lape.y, ukinikoY - mapY, lapeMato) &&
        BekNuo(lape.x, ukinikoX - mapX, lapeMato) &&
        !ignorePlayer
      ) {
        lape.x = BekNuo(lape.x, ukinikoX - mapX, lapeMato);
        lape.y = BekNuo(lape.y, ukinikoY - mapY, lapeMato);
      } else if (lape.suvista) {
        lape.puolu = false;
        if (!BekNuo(lape.y, gardoY, lapeMato * 40)) {
          lape.suvista = false;
        }
        lape.x = BekNuo(lape.x, gardoX, lapeMato * 100);
        lape.y = BekNuo(lape.y, gardoY, lapeMato * 100);
      } else if (lape.puolu) {
        lape.x = judaLink(lape.x, gardoX);
        lape.y = judaLink(lape.y, gardoY);
      } else {
        lape.x = bludiju(lape.x);
        lape.y = bludiju(lape.y);
      }

      minictx.fillStyle = "#b43e20";
      minictx.fillRect(
        lape.x / 100 + canvasPlotis / (minimapMastelis * 2) - 6,
        lape.y / 100 + canvasAukstis / (minimapMastelis * 2) - 6,
        lPlotis / 100,
        lAukstis / 100
      );
      // for (const krumai of krumaiMas) {
      //   lape.x = BekIJeimatai(lape.x, krumai.x, lapeMato);
      //   lape.y = BekIJeimatai(lape.y, krumai.y, lapeMato);
      // }
      if (
        Pagautas(lape.x + mapX, ukinikoX, lPlotis / 3, uPlotis) &&
        Pagautas(lape.y + mapY, ukinikoY, lAukstis / 4, uAukstis)
      ) {
        lape.y = atsitiktineKordinate(canvasAukstis * 3, canvasAukstis * 5);
        lape.x = atsitiktineKordinate(canvasAukstis * 3, canvasAukstis * 5);
        // console.log(lapemirtgarsas)
        lapemirtgarsas.play();
        pagauta++;
      }
      // if (
      //   !Pagautas(lape.x, pelesX - mapX, lPlotis / 3, pelesP) &&
      //   !Pagautas(lape.y, pelesY - mapY, lAukstis / 4, pelesA)
      // ) {
      //   corsor.veikejoVeidas.src = "img/taipcursor.png";
      // } else {
      //   corsor.veikejoVeidas.src = "img/taikytis.png";
      //   console.log('pele ant')

      // }

      if (
        Pagautas(lape.x, gardoX, lPlotis / 3, gPlotis) &&
        Pagautas(lape.y, gardoY, lAukstis / 4, gAuksis)
      ) {
        sukurkLape();
        // alert("Lapė garde")
        lape.suvista = true;

        tiekLapiu++;
      }

      lape.lapes.animuok(
        ctx,
        lPlotis,
        lAukstis,
        190,
        75,
        lape.x + mapX,
        lape.y + mapY,
        190,
        80,
        3
      );
    }

    minictx.fillStyle = "#ffffff";
    minictx.fillRect(
      canvasPlotis / (minimapMastelis * 2),
      canvasAukstis / (minimapMastelis * 2),
      7,
      7
    );

    minictx.fillStyle = "#171e29";
    minictx.fillRect(
      -mapX / 100 + canvasPlotis / (minimapMastelis * 2),
      -mapY / 100 + canvasAukstis / (minimapMastelis * 2),
      5,
      5
    );

    if (chunkXVieta[stringX] && chunkXVieta[stringX][stringY]) {
      nupiesemKruma(chunkX, chunkY);
      nupieskZole(chunkX, chunkY);

      if (
        chunkXVieta[(chunkX + 1).toString()] &&
        chunkXVieta[(chunkX + 1).toString()][chunkY.toString()]
      ) {
        nupieskZole(chunkX + 1, chunkY);
        nupiesemKruma(chunkX + 1, chunkY);
      } else {
        sukurkChunk(chunkX + 1, chunkY);

        if (sugeneruotiSkaiciu() < 0.01) {
          sukurkVsta(
            -canvasPlotis * (chunkX - 1),
            -canvasPlotis * chunkX,
            -canvasAukstis * (chunkY - 1),
            -canvasAukstis * chunkY,
            false
          );
        }
        // localStorage.setItem('chunkXVieta', JSON.stringify(chunkXVieta));
      }

      if (
        chunkXVieta[(chunkX + 1).toString()] &&
        chunkXVieta[(chunkX + 1).toString()][(chunkY + 1).toString()]
      ) {
        nupieskZole(chunkX + 1, chunkY + 1);
        nupiesemKruma(chunkX + 1, chunkY + 1);
      } else {
        sukurkChunk(chunkX + 1, chunkY + 1);

        if (sugeneruotiSkaiciu() < 0.01) {
          sukurkVsta(
            -canvasPlotis * (chunkX - 1),
            -canvasPlotis * chunkX,
            -canvasAukstis * (chunkY - 1),
            -canvasAukstis * chunkY,
            false
          );
        }
        // localStorage.setItem('chunkXVieta', JSON.stringify(chunkXVieta));
      }

      if (
        chunkXVieta[chunkX.toString()] &&
        chunkXVieta[chunkX.toString()][(chunkY + 1).toString()]
      ) {
        nupieskZole(chunkX, chunkY + 1);
        nupiesemKruma(chunkX, chunkY + 1);
      } else {
        sukurkChunk(chunkX, (chunkY + 1).toString());

        if (sugeneruotiSkaiciu() < 0.01) {
          sukurkVsta(
            -canvasPlotis * (chunkX - 1),
            -canvasPlotis * chunkX,
            -canvasAukstis * (chunkY - 1),
            -canvasAukstis * chunkY,
            false
          );
        }
        // localStorage.setItem('chunkXVieta', JSON.stringify(chunkXVieta));
      }

      // }
      // console.log("ši chunk prisimenu");
    } else {
      sukurkChunk(chunkX, chunkY);

      if (sugeneruotiSkaiciu() < 0.01) {
        sukurkVsta(
          -canvasPlotis * (chunkX - 1),
          -canvasPlotis * chunkX,
          -canvasAukstis * (chunkY - 1),
          -canvasAukstis * chunkY,
          false
        );
      }
      // localStorage.setItem('chunkXVieta', JSON.stringify(chunkXVieta));
    }

    if (dabarInsijunges.length === 0) {
      ukininkas.stop();
    } else {
      ukininkas.start();
    }

    if (dabarInsijunges.includes(right)) {
      mapX -= greitis;
      kaire = false;
      desine = true;
      ivirsun = false;
      izemin = false;
    }

    if (dabarInsijunges.includes(left)) {
      mapX += greitis;
      kaire = true;
      desine = false;
      ivirsun = false;

      izemin = false;
    }
    for (const vista of vistuMas) {
      vista.vista.nupiesk(
        ctx,
        vista.x + mapX,
        vista.y + mapY,
        vPlotis,
        vAukstis
      );
      minictx.fillStyle = "#41261f";
      minictx.fillRect(
        vista.x / 100 + canvasPlotis / (minimapMastelis * 2) - 6,
        vista.y / 100 + canvasAukstis / (minimapMastelis * 2) - 6,
        5,
        5
      );
    }
    if (dabarInsijunges.includes(up)) {
      mapY += greitis;
      kaire = false;
      desine = false;
      ivirsun = true;
      izemin = false;
    }

    if (dabarInsijunges.includes(down)) {
      mapY -= greitis;
      kaire = false;
      desine = false;
      ivirsun = false;
      izemin = true;
    }
    document.getElementById("pagauta").innerHTML = "pagauta : " + pagauta;
    document.getElementById("ibego").innerHTML = "praleista :" + tiekLapiu;
    // corsor.nupiesk(ctx, pelesX - pelesP / 2, pelesY - pelesA / 2, pelesP, pelesA)
    DebugXY.innerHTML =
      "X:" +
      mapX +
      " Y:" +
      mapY +
      " Chunks X:" +
      Math.floor(mapX / canvasPlotis) +
      " Chunks Y:" +
      Math.floor(mapY / canvasAukstis) +
      " Kiek krumu sukurta:" +
      kiekchunks * kiekChunkKrumu;
    requestAnimationFrame(piesimoFunkcija);
  }

  requestAnimationFrame(piesimoFunkcija);
})();
