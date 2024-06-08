// Import three.js
import * as THREE from './modules/three.module.js';
// import { GLTFLoader } from './modules/GLTFLoader.js';

// Get game canvas and three.js canvas
const canvas = document.getElementById('crt');
const imgElement = document.getElementById('game');

// Create renderer
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(imgElement.clientWidth, imgElement.clientHeight);
canvas.appendChild(renderer.domElement);

// Create scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// Setup camera
const camera = new THREE.PerspectiveCamera(
    80,
    imgElement.offsetWidth / imgElement.offsetHeight,
    0.01,
    10
);
camera.position.z = 1.3;

// Set up lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0);
scene.add(ambientLight);
const screenLight = new THREE.PointLight(0xC8DBE6, .04, 3, 4);
scene.add(screenLight);

// Texture Loader
var texture = new THREE.Texture(imgElement);

// Shaders
const vertexShader = /* glsl */ `
    varying vec2 vUv;
    uniform float uBulgeAmount;

    void main() {
        vUv = uv;
        // Calculate the distance from the center
        vec2 displacement = (uv - 0.5) * 2.0;
        float dist = length(displacement);
        // Calculate bulge effect
        float bulge = (1.0 - dist * dist) * uBulgeAmount;
        vec3 displacedPosition = position + normal * bulge;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);
    }
`;

const fragmentShader = /* glsl*/ `
    uniform sampler2D uTexture;
    varying vec2 vUv;

    void main() {
        // Offsets for fuzzy horizontal ghosting effect
        vec2 offset3 = vec2(0.015, 0.0);
        vec2 offset4 = vec2(-0.005, 0.0);
        vec2 offset5 = vec2(-0.01, 0.0);
        vec2 offset6 = vec2(-0.015, 0.0);

        // Sample the texture with different offsets
        vec4 color1 = texture2D(uTexture, vUv);
        vec4 color2 = texture2D(uTexture, vUv) * 1.0;
        vec4 color3 = texture2D(uTexture, vUv) * 0.4;
        vec4 color4 = texture2D(uTexture, vUv + offset3) * 0.2;
        vec4 color5 = texture2D(uTexture, vUv + offset4) * 0.6;
        vec4 color6 = texture2D(uTexture, vUv + offset5) * 0.4;
        vec4 color7 = texture2D(uTexture, vUv + offset6) * 0.2;



        // Blend the samples to create a fuzzy horizontal ghosting effect with bloom
        vec4 color = (color1 + color2 + color3 + color4 + color5 + color6 + color7) / 3.4;

        // Add scan lines effect
        float scanline = sin(vUv.y * 300.0) * 0.05; // Adjust the frequency and intensity as needed
        color.rgb -= vec3(scanline);

        gl_FragColor = color;
    }
`;


// Create game display object
const planeGeo = new THREE.PlaneGeometry(2, 2, 30, 30);
const planeMat = new THREE.ShaderMaterial({
    uniforms: {
        uTexture: {value: texture},
        uBulgeAmount: {value: 0.1}
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader
});
const plane = new THREE.Mesh(planeGeo, planeMat);
scene.add(plane);

// // Load MO DRIVE MODEL
// const loader = new GLTFLoader();
// loader.load(
//     './modrive.glb',
//     function ( gltf ){
//         scene.add( gltf.scene );
//     }
// )

// Create display housing
const geo = new THREE.PlaneGeometry(2, 1)
const mat = new THREE.MeshStandardMaterial({color: 0xE5E6C8});

const right = new THREE.Mesh(geo, mat);
right.position.x = 1
right.rotation.y = -Math.PI / 2;
right.rotation.x = Math.PI / 2;
scene.add(right);

const left = new THREE.Mesh(geo, mat);
left.position.x = -1;
left.rotation.y = Math.PI / 2;
left.rotation.x = Math.PI / 2;
scene.add(left);

const top = new THREE.Mesh(geo, mat);
top.position.y = 1;
top.rotation.x = Math.PI / 2;
scene.add(top);

const bottom = new THREE.Mesh(geo, mat);
bottom.position.y = -1;
bottom.rotation.x = -Math.PI / 2;
scene.add(bottom);

function animate(){
    texture.needsUpdate = true;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();
