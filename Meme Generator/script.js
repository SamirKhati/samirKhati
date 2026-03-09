const imageFileInput = document.querySelector('#image-file');
const topTextInput = document.querySelector('#topText');
const bottomTextInput = document.querySelector('#bottomText');
const canvas = document.querySelector('#meme');
const downloadBtn = document.querySelector('#downloadBtn');

let image = null;

// when image is selected
imageFileInput.addEventListener("change", () => {

  const file = imageFileInput.files[0];
  if (!file) return;

  const imageDataUrl = URL.createObjectURL(file);

  image = new Image();
  image.src = imageDataUrl;

  image.onload = () => {
    checkAndGenerate();
  };
});

// when typing text
topTextInput.addEventListener("input", checkAndGenerate);
bottomTextInput.addEventListener("input", checkAndGenerate);

// check if everything is ready
function checkAndGenerate(){

  if(!image) return;

  const topText = topTextInput.value.trim();
  const bottomText = bottomTextInput.value.trim();

  // show meme only if both texts exist
  if(topText !== "" && bottomText !== ""){
    updateMemeCanvas(topText, bottomText);
  }
}

function updateMemeCanvas(topText, bottomText){

  const ctx = canvas.getContext("2d");

  const width = image.width;
  const height = image.height;

  canvas.width = width;
  canvas.height = height;

  const fontSize = Math.floor(width / 10);
  const yOffset = height / 25;

  // draw image
  ctx.drawImage(image, 0, 0);

  // text style
  ctx.font = `${fontSize}px Impact, sans-serif`;
  ctx.textAlign = "center";
  ctx.strokeStyle = "black";
  ctx.lineWidth = fontSize / 20;
  ctx.fillStyle = "white";

  // top text
  ctx.textBaseline = "top";
  ctx.strokeText(topText.toUpperCase(), width/2, yOffset);
  ctx.fillText(topText.toUpperCase(), width/2, yOffset);

  // bottom text
  ctx.textBaseline = "bottom";
  ctx.strokeText(bottomText.toUpperCase(), width/2, height - yOffset);
  ctx.fillText(bottomText.toUpperCase(), width/2, height - yOffset);
}

// download meme
downloadBtn.addEventListener("click", () => {

  if(!image) return;

  const link = document.createElement("a");
  link.download = "meme.png";
  link.href = canvas.toDataURL("image/png");
  link.click();

});