import { useEffect, useRef } from "react";
import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


import backGround from '../../resources/fuji.jpg';
import cuteRabbit from'../../resources/cute-rabbit.png';
import space from '../../resources/space.jpg'

import './teller.css';

const Teller = () => {
  const refContainer = useRef();

  const addStar = () => {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);
  
    const [x, y, z] = Array(3)
      .fill()
      .map(() => THREE.MathUtils.randFloatSpread(100));
  
    star.position.set(x, y, z);
    return star;
  }

  useEffect(() => {
    // === THREE.JS CODE START ===
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild( renderer.domElement );
    // use ref as a mount point of the Three.js scene instead of the document.body
    refContainer.current && refContainer.current.appendChild( renderer.domElement );


    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);

    scene.add(cube);

    // const controls = new OrbitControls(camera, renderer.domElement);

    for(let i=0; i< 700; i++) {
      scene.add(addStar());
    }

    // Lights

    // const pointLight = new THREE.PointLight(0xffffff);
    // pointLight.position.set(5, 5, 5);

    // const ambientLight = new THREE.AmbientLight(0xffffff);
    // scene.add(pointLight, ambientLight);

    // Background
    const spaceTexture = new THREE.TextureLoader().load(space);
    scene.background = spaceTexture;

    const centerPosition = new THREE.Vector3(0, 0, 0);
    // Set initial camera position
    const cameraDistance = 50; // Distance from the center point
    camera.position.set(0, 0, cameraDistance);

    // Set up animation parameters
    const orbitSpeed = 0.00005; // Speed of orbit in radians per frame

    function moveCamera() {
      // Calculate new camera position
      const angle = Date.now() * orbitSpeed; // Calculate angle based on time
      const x = Math.cos(angle) * cameraDistance;
      const z = Math.sin(angle) * cameraDistance;
      camera.position.set(x, 0, z);
      camera.lookAt(centerPosition); // Make camera always look at the center point
    }
    
    var animate = function () {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;      

      // controls.update();
      moveCamera();

      renderer.render(scene, camera);
    };
    
    animate();
  }, []);
  return (
    <div ref={refContainer}></div>

  );
}

export default Teller;
