class Veikejas {
    constructor({ saltinis }) {
        this.veikejoVeidas = new Image();
        this.veikejoVeidas.src = saltinis;
        this.kadruSkaicius = 0;
        this.rodomasKadras = 0;
        this.animacijaIsjungta = false;
        this.rodomasKadrasAukstis = 0;
        this.veikejoPlotis = 0;
        this.veikejoAukstis = 0;
        this.laikas = 0;
        this.laikasTarpKadru = 0;
        this.pagautas = false;
        this.veikejoVeidas.onload = () => {
            this.veikejoPlotis = this.veikejoVeidas.width;
            this.veikejoAukstis = this.veikejoVeidas.height;
            // console.log('veikejas', this.veikejoVeidas, this.veikejoAukstis);

            const bodyObject = document.querySelector("body");
            // bodyObject.dispatchEvent(new CustomEvent("uzsikroviau", { detail: { aukstis: this.veikejoAukstis, plotis: this.veikejoPlotis } }));
            bodyObject.dispatchEvent(new CustomEvent("uzsikroviau"));
        };
    }

    manoAuktis() {
        return this.veikejoAukstis;
    }

    manoPlotis() {
        return this.veikejoPlotis;
    }

    nupiesk(ctx, x, y, plotis, aukstis) {
        if (this.pagautas) {
            return;
        }
        if (this.veikejoPlotis > 0) {
            if (plotis === undefined) {
                ctx.drawImage(this.veikejoVeidas, x, y);
            } else {
                ctx.drawImage(this.veikejoVeidas, x, y, plotis, aukstis);
            }
        }
    }

    kiekLaiko(pieseKartus) {
        this.laikasTarpKadru = pieseKartus * 3;
    }

    animuok(
        ctx,
        sx,
        sy,
        sWidth,
        sHeight,
        dx,
        dy,
        dWidth,
        dHeighdx,
        kadruykiekis,
        kadruAukstis
    ) {
        if (this.pagautas) {
            return;
        }

        //console.log("labs kaimyns");
        if (this.veikejoPlotis <= 0) {
            return;
        }

        const visiKadrai = this.suskaiciuokKadrus(sWidth);
        // debugger;

        const kadroX = this.rodomasKadras * sWidth;
        const kadroY = this.rodomasKadrasAukstis * sHeight;

        ctx.drawImage(
            this.veikejoVeidas,
            kadroX,
            kadroY,
            sWidth,
            sHeight,
            dx,
            dy,
            dWidth,
            dHeighdx
        );

        if (this.laikas <= this.laikasTarpKadru) {
            this.laikas++;

            return;
        }

        // console.log(this.laikas)

        if (!this.animacijaIsjungta && kadruykiekis > 0) {
            this.rodomasKadras++;

            if (this.rodomasKadras >= visiKadrai) {
                this.rodomasKadras = 0;
                this.rodomasKadrasAukstis++;
            }

            if (this.rodomasKadrasAukstis >= kadruykiekis) {
                this.rodomasKadrasAukstis = 0;
            }

            // console.log(this.kadruSkaicius, this.rodomasKadras)
        } else if (!this.animacijaIsjungta) {
            this.rodomasKadrasAukstis = kadruAukstis;
            this.rodomasKadras++;
            if (this.rodomasKadras >= visiKadrai + 1) {
                this.rodomasKadras = 0;
            }
        }

        this.laikas = 0;
    }

    suskaiciuokKadrus(sWidth) {
        return (this.kadruSkaicius = parseInt(this.manoPlotis() / sWidth));
    }

    stop() {
        this.animacijaIsjungta = true;
    }

    start() {
        this.animacijaIsjungta = false;
    }

    pagavo() {
        this.pagautas = true;
    }
}
