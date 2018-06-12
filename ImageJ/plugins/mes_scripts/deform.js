function proj(canal,w,h,R,teta){
  let new_w= 2*(R+w);
  let new_h= 2*(R+w);
  let ip = canal.getProcessor();
  let titlec = canal.getTitle();
  let canalproj=IJ.createImage(`${titlec}_proj`, "RGB black",new_w,new_h,1);

  ipcanalproj=canalproj.getProcessor();
  
  let len = new_h * new_w;
  for (let i= 0; i < len; i++) {
    let valpix=Math.floor(i*255/1200);
    ipcanalproj.set(i,valpix);
  }

  return canalproj;
  }
  
let R=3.6;
let teta=110; //faut il le mettre en radiant ? 

let imp=IJ.getImage();
let w= imp.getWidth();
let h=imp.getHeight();

let title = imp.getTitle();
IJ.run("Split Channels");
IJ.selectWindow(`${title} (red)`); let impR = IJ.getImage(); impR.setTitle('red');
let result1 = proj(impR,w,h,R,teta);
result1.show();
IJ.selectWindow(`${title} (green)`); let impG = IJ.getImage(); impG.setTitle('green');
let result2 = proj(impG,w,h,R,teta);
result2.show();
IJ.selectWindow(`${title} (blue)`); let impB = IJ.getImage(); impB.setTitle('blue');
let result3 = proj(impB,w,h,R,teta);
result3.show();

let ic = new ImageCalculator();
let impRG = ic.run("Add create", result1, result2);
impRG.show();

let ic2 = new ImageCalculator();
let impRGB = ic.run("Add create", impRG, result3);
impRGB.show();

IJ.log("fini");