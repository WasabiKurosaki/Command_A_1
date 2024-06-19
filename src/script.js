import * as THREE from 'three';

import init from './init';

import './style.css';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const { sizes, camera, scene, canvas, controls, renderer } = init();

camera.position.set(-20, 30, 20);
// camera.rotateX(Math.PI);
// const floor = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshStandardMaterial({ color: "#444444", metalness: 0, roughness: 0 }));


// floor.receiveShadow = true;
// floor.rotation.x = -Math.PI * 0.5;
// scene.add(floor);


const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
hemiLight.position.set(0, 50, 0);
scene.add(hemiLight);


const dirLight = new THREE.DirectionalLight(0xffffff, 0.54);
dirLight.position.set(0, 50, 0);
dirLight.castShadow = true;
dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
scene.add(dirLight);

const loader = new GLTFLoader();


loader.load("models/lovers.glb", function (glb) {
	scene.add(glb.scene);
}, undefined, function ( error ) {
	console.error( error );
} );

scene.background = new THREE.Color('#ffffff');

const tick = () => {
	controls.update();
	renderer.render(scene, camera);
	window.requestAnimationFrame(tick);
};
tick();

/** Базовые обпаботчики событий длы поддержки ресайза */
window.addEventListener('resize', () => {
	// Обновляем размеры
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	// Обновляем соотношение сторон камеры
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	// Обновляем renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	renderer.render(scene, camera);
});

window.addEventListener('dblclick', () => {
	if (!document.fullscreenElement) {
		canvas.requestFullscreen();
	} else {
		document.exitFullscreen();
	}
});
