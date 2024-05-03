// Tomar fuente de video dependiendo del dispositivo
const isMobile = /Mobi|Android/i.test(navigator.userAgent);

const facingMode = isMobile ? "environment" : "user";

navigator.mediaDevices
  .getUserMedia({
    video: { facingMode: { exact: facingMode } },
  })
  .then((stream) => {
    document.getElementById("webcam").srcObject = stream;
  })
  .catch((err) => {
    console.error("Error accessing camera:", err);
  });

// Listener para el botón de captura
document.getElementById("takeScreenshot").addEventListener("click", () => {
  let audio = new Audio("../assets/sounds/camera-13695.mp3");
  audio.play();
  const canvas = document.getElementById("canvas");
  //Ajuste de tamaño del canvas para la imagen producida
  canvas.width = isMobile ? 720 : webcam.videoWidth; //<--- Esto directamente decide el tamaño de la imgen
  canvas.height = isMobile ? 1280 : webcam.videoHeight; //<--- En teléfono se mira bien (Los de la izquierda)

  const context = canvas.getContext("2d");

  // Dibujar imagen de cámara en el canvas
  const video = document.getElementById("webcam");
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Dibujar contenido del a-scene en el canvas
  const aScene = document.querySelector("a-scene");
  const renderer = aScene.renderer;

  if (renderer) {
    renderer.render(aScene.object3D, aScene.camera);
    context.drawImage(renderer.domElement, 0, 0, canvas.width, canvas.height);
  }

  // Descargar archivo
  const combinedImage = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = combinedImage;
  link.download =
    "ExgenStation" +
    "_" +
    new Date().toLocaleDateString("en-IN") +
    "_" +
    new Date().toLocaleTimeString("it-IT") +
    ".png";
  link.click();
});
