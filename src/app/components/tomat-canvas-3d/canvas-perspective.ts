import * as THREE from 'three';

import tomat from 'Src/static/media/tomat-left.png';

const imageArray = [];
import * as dat from 'dat.gui';

console.log('window.innerHeight', window.innerHeight)

// gui
const gui = new dat.GUI({name: 'My GUI'});

// var cameraState = {
//     fieldOfView: 75,
//     aspectRatio:  window.innerWidth / window.innerHeight,
//     nearPlane: 0.1,
//     farPlane: 1000,
// };

var cameraState = {
    x: 0,
    y: 0,
    z: 0
};


var guiState = {
    x: 0,
    y: 0,
    z: 0,
    size: 200,
    displayOutline: false,
    explode: () => {},
};
gui.add(guiState, 'x', -2000, 2000);
gui.add(guiState, 'y', -2000, 2000);
gui.add(guiState, 'z', -2000, 2000);
gui.add(guiState, 'size', -2000, 2000);

// gui.add(cameraState, 'aspectRatio', -5, 5);
// gui.add(cameraState, 'nearPlane', -3, 3);
// gui.add(cameraState, 'farPlane', -1000, 1000);
// gui.add(cameraState, 'fieldOfView', -75, 150);

// gui.add(cameraState, 'x', -10, 10);
// gui.add(cameraState, 'y', -10, 10);
// gui.add(cameraState, 'z', -10, 10);

class PomodoroObject {
    state: any = {}

    constructor() {
        this.state = {
            position: {
                
            }
        }
    }
}


class TomatImage {
    state: any = {}

    constructor() {
        this.state = {
            position: guiState
        }
    }
}

// imageArray.push(new TomatImage());

const pomidor = new TomatImage();

export const startDraw = (canvasElm: any) => {
    var scene = new THREE.Scene();

    // var camera = new THREE.PerspectiveCamera(
    //     cameraState.fieldOfView,
    //     cameraState.aspectRatio,
    //     cameraState.nearPlane,
    //     cameraState.farPlane,
    // );

    const camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 1000 );

    camera.position.z = 5;
    // console.log('camera', camera)

    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas: canvasElm });

    renderer.setSize(window.innerWidth, window.innerHeight);

    var loader = new THREE.TextureLoader();

    loader.setCrossOrigin("Anonymous");

    var material = new THREE.MeshLambertMaterial({
        map: loader.load(
            tomat
            // "https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png" 
        )
    });

    material.transparent = true;

    // var geometry = new THREE.PlaneGeometry(1, 1 * 0.75);
    var geometry = new THREE.PlaneGeometry(guiState.size, guiState.size);

    var mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(pomidor.state.position.x, pomidor.state.position.y, pomidor.state.position.z);

    scene.add(mesh);

    var light = new THREE.PointLight(0xffffff, 0.9, 0);
    light.position.set(0, 0, 2000);
    scene.add(light);
    // or
    // var ambientLight = new THREE.AmbientLight(0x999999);
    // scene.add(ambientLight);

    function animate() {
        // pomidor.state.position.x = pomidor.state.position.x - 0.01;

        // camera.fov = cameraState.fieldOfView
        // camera.aspect = cameraState.aspectRatio
        // camera.near = cameraState.nearPlane
        // camera.far = cameraState.farPlane
        // console.log('camera', camera)

        mesh.position.set(pomidor.state.position.x, pomidor.state.position.y, pomidor.state.position.z);
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    animate();
}
