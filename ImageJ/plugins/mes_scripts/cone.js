function proj(canal, w, h, R, teta) {
    //initialise
    let R2 = R + R / Math.sin((teta / 2) * (Math.PI / 180));
    let mrows = 2.5 * R2;
    let ncols = 2.5 * R2;
    let L = (1 / 2) * Math.sqrt((w * w) + (h * h));
    let ip = canal.getProcessor();
    let titlec = canal.getTitle();
    let dist = IJ.createImage("distorted", "RGB white", mrows, ncols, 1);
    let ipdist = dist.getProcessor();

    for (let i = R + 1; i < R2; i++) {
        IJ.log(i);
        Rr = ((R2 - i + 1) / (R2 - R)) * L;
        //determine pixel manquant
        let alpha = 2 * Math.PI * i;

        for (let j = 1; j < alpha; j++) {
            //transformation des coordonnées
            let gamma = ((j - 1) * (2 * Math.PI)) / alpha;
            let ni = R2 - (i * Math.sin(gamma));
            let nj = R2 - (i * Math.cos(gamma));
            let pi = (w / 2) - (Rr * Math.sin(gamma));
            let pj = (h / 2) - (Rr * Math.cos(gamma));

            //affecte valeur au pixel de coordonnées déterminées avant
            let val = ip.getPixel(pi, h - pj + 1);
            ipdist.set(ni, nj, val);
            ipdist.set(ni + 1, nj + 1, val);
            ipdist.set(ni - 1, nj + 1, val);
            ipdist.set(ni, nj + 1, val);
            dist.updateAndDraw();
            dist.show();


        }
    }

    return dist;
}

let R = 360;
let teta = 20;

let imp = IJ.getImage();
let w = imp.getWidth();
let h = imp.getHeight();

let title = imp.getTitle();
let result1 = proj(imp, w, h, R, teta);
result1.show();

IJ.log("fini");