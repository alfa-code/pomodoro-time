import * as THREE from 'three';

import tomat from 'Src/static/media/tomat-left.png';

const tomatoesQuantity = 3;

// import * as dat from 'dat.gui';

const cameraState = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    z: 5
}

// gui
// const gui = new dat.GUI({name: 'My GUI'});
// gui.add(cameraState, 'x', -2000, 2000);
// gui.add(cameraState, 'y', -2000, 2000);
// gui.add(cameraState, 'z', -2000, 2000);

class Tomato {
    position: {
        x: number;
        y: number;
        z: number;
    };

    size: {
        w: number;
        h: number;
    }

    maxSpeed: number = 2;
    minSpeed: number = 0.1;
    speed: number = 1;

    constructor(quantity: number, index: number) {
        const heightPiece = Math.floor(window.innerHeight / quantity);
        const maxHeight = Math.floor(window.innerHeight / 3);
        let size = Math.floor(heightPiece / (index + 1));
        if (size > maxHeight) { size = maxHeight }

        this.size = {
            w: size,
            h: size,
        }

        this.position = {
            x: (window.innerWidth) + this.size.w,
            y: Math.floor((heightPiece)) + (heightPiece * index) - 100,
            z: 0,
        }

        this.speed = (this.minSpeed + (this.minSpeed * index)) + (this.maxSpeed / 10);
    }

    updatePosition = () => {
        this.position.x = this.position.x - this.speed;

        if (this.position.x < (-((window.innerWidth) + this.size.w))) {
            this.position.x = (window.innerWidth) + this.size.w;
        }
    }
}

function getTomatoes(quantity: number) {
    const tomatoes: Tomato[] = [];

    for (let index = 0; index < quantity; index++) {
        const tomato = new Tomato(quantity, index);
        tomatoes.push(tomato);
    }

    console.log('tomatoes', tomatoes)

    return tomatoes;
}

export const startDraw = (canvasElm: any) => {
    var scene = new THREE.Scene();

    const camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 1000 );

    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas: canvasElm });

    renderer.setSize(window.innerWidth, window.innerHeight);

    var loader = new THREE.TextureLoader();

    loader.setCrossOrigin("Anonymous");

    // Creating material
    var material = new THREE.MeshLambertMaterial({
        map: loader.load(
            tomat
        )
    });
    material.transparent = true;

    // Creating an adding meshes
    const tomatoes = getTomatoes(tomatoesQuantity);
    const meshes = tomatoes.map((tomato) => {
        const geometry = new THREE.PlaneGeometry(tomato.size.w, tomato.size.h);
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(tomato.position.x, tomato.position.y, tomato.position.z);

        return mesh;
    })

    // Adding meshes
    meshes.forEach((mesh) => {
        scene.add(mesh);
    });

    // light;
    var light = new THREE.PointLight(0xffffff, 0.9, 0);
    light.position.set(0, 0, 4000);
    scene.add(light);

    function animate() {
        meshes.forEach((mesh, i) => {
            const tomato = tomatoes[i]
            tomato.updatePosition();
            mesh.position.set(tomato.position.x, tomato.position.y, tomato.position.z);
        });

        camera.position.set(cameraState.x, cameraState.y, cameraState.z);

        const requestID = requestAnimationFrame(animate);
        window.addEventListener('resize', () => { cancelAnimationFrame(requestID) });

        renderer.render(scene, camera);
    }

    animate();
}
