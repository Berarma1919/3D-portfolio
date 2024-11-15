// Setting up the scene for 3D model
let scene, camera, renderer;

function init3D() {
    // Create the scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeeee); // Set background color

    // Set up the camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1, 3); // Set the camera position to view the model

    // Set up the renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("model-container").appendChild(renderer.domElement);

    // Add lighting to the scene
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft ambient light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Strong directional light
    directionalLight.position.set(5, 5, 5); // Light from above and to the right
    scene.add(directionalLight);

    // Loading the GLB model
    const loader = new THREE.GLTFLoader();
    loader.load('table.glb', function (gltf) {
        const model = gltf.scene;
        scene.add(model);

        // Scale and position the model to fit nicely in the scene
        model.scale.set(0.5, 0.5, 0.5);  // Adjust the model size
        model.position.set(0, 0, 0);    // Center the model in the scene

        animate(); // Start the animation loop
    }, undefined, function (error) {
        console.error("Error loading the model:", error);
    });
}

// Animation loop to render the scene
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// Handle window resizing
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Initialize the 3D model scene
init3D();
