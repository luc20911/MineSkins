// Configuration de la scène, de la caméra et du rendu
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Contrôles pour déplacer la caméra
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Lumière ambiante
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// Lumière directionnelle pour mieux éclairer le modèle
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

// Chargement du modèle 3D du skin (ici un fichier .obj)
const loader = new THREE.OBJLoader();
loader.load('http://localhost:8000/skin.obj', function (object) {
    object.scale.set(0.1, 0.1, 0.1);  // Ajuste l'échelle du modèle si nécessaire
    object.position.set(0, -1, 0);  // Positionne le modèle à une hauteur visible
    scene.add(object);
}, undefined, function (error) {
    console.error(error);
});

// Position de la caméra (ajustée pour voir le modèle)
camera.position.z = 5;

// Fonction d'animation pour rendre la scène
function animate() {
    requestAnimationFrame(animate);
    controls.update();  // Nécessaire pour les contrôles OrbitControls
    renderer.render(scene, camera);
}

animate();

