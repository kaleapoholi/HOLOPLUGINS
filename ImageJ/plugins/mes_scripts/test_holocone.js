function proj(canal, w, h, R, teta) {
    //initialise
    let R2 = R + R / Math.sin((teta / 2) * (Math.PI / 180));
    let mrows = 2.5 * R2;
    let ncols = 2.5 * R2;
    let ip = canal.getProcessor();
    let titlec = canal.getTitle();
    let dist = IJ.createImage("distorted", "RGB black", mrows, ncols, 1);
    let ipdist = dist.getProcessor();

    for (let i = 1; i < w; i++) {
        IJ.log(i);

        //determine pixel manquant
        let alpha = teta * Math.PI * (R + w - i) / (180 * h);
        if (alpha < 1) {
            alpha = 1;
        }

        for (let j = 1; j < h; j++) {
            for (let k = (alpha * j) - (alpha / 2); k < ((alpha * j) + (alpha / 2)); k++) {

                //transformation des coordonnées
                let gamma = (k - 1) * (teta / (h * alpha) * (Math.PI / 180));
                let ni = R + w - (R + (w - i)) * Math.sin(gamma);
                let nj = R + w - (R + (w - i)) * Math.cos(gamma);

                //affecte valeur au pixel de coordonnées déterminées avant
                let val = ip.getPixel(i, h - j + 1);
                ipdist.set(ni, nj, val);
                ipdist.set(ni + 1, nj + 1, val);
                ipdist.set(ni - 1, nj + 1, val);
                ipdist.set(ni, nj + 1, val);

            }
        }
    }

    return dist;
}

let R = 230;
let teta = 230;

let imp = IJ.getImage();
let w = imp.getWidth();
let h = imp.getHeight();

let title = imp.getTitle();
let result1 = proj(imp, w, h, R, teta);
result1.show();

IJ.log("fini");