function proj(canal, w, h, R, teta) {
    //initialise
    let g = 1 / 2;
    let x = 2 / 3;
    let mrows = 2 * (R + w * g);
    let ncols = 2 * (R + w * g);
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
                // mettre l'image virtuelle à 2/3 de la focale 
                //let ni = (R/3) + w - ((R/3) + (w - i)) * Math.sin(gamma);
                //let nj = (R/3) + w - ((R/3) + (w - i)) * Math.cos(gamma);

                //strange distorted
                //let ni = (R / 3) + w * g - ((R / 3) + (w * g - i)) * Math.sin(gamma);
                //let nj = (R / 3) + w * g - ((R / 3) + (w * g - i)) * Math.cos(gamma);

                //avec le r/2 holocyl3
                //let ni = (x * (R / 2) * g) + w - ((x * (R / 2) * g) + (w - i)) * Math.sin(gamma);
                //let nj = (x * (R / 2) * g) + w - ((x * (R / 2) * g) + (w - i)) * Math.cos(gamma);

                //holocyl2, 3 et 4,5
                //let ni = (x * R * g) + w - ((x * R * g) + (w - i)) * Math.sin(gamma);
                //let nj = (x * R * g) + w - ((x * R * g) + (w - i)) * Math.cos(gamma);

                //holocyl6 7
                let ni = R + (w * x * g) - (R + ((w * x * g) - i)) * Math.sin(gamma);
                let nj = R + (w * x * g) - (R + ((w * x * g) - i)) * Math.cos(gamma);

                //affecte valeur au pixel de coordonnées déterminées avant
                let val = ip.getPixel(i, h - j + 1);
                ipdist.set(ni, nj, val);
                ipdist.set(ni + 1, nj + 1, val);
                ipdist.set(ni - 1, nj + 1, val);
                ipdist.set(ni, nj + 1, val);
                dist.updateAndDraw();
                dist.show();
            }
        }
    }

    return dist;
}

let R = 360;
let teta = 120;

let imp = IJ.getImage();
let w = imp.getWidth();
let h = imp.getHeight();

let title = imp.getTitle();
let result1 = proj(imp, w, h, R, teta);
result1.show();

IJ.log("fini");