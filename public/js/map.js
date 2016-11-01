var container;
var camera, scene, renderer;
var controls;
var cube;
var cubeGeo;
var framerate = 1000/60;

init();
render();

function init() {

  container = document.createElement( 'div' );
  document.body.appendChild( container );

  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );

  scene = new THREE.Scene();

  // controls
  controls = new PointerLockControls(camera);
  var controlsObject = controls.getObject();

  // change the starting position of the camera/controls
  // above the scene looking down
  controlsObject.translateZ(200);
  controlsObject.translateY(800);
  controlsObject.children[0].rotation.x = -1.5;

  scene.add(controlsObject);

  // cubes

  cubeGeo = new THREE.BoxGeometry( 50, 50, 50 );

  // Lights

  var ambientLight = new THREE.AmbientLight( 0x606060 );
  scene.add( ambientLight );

  var directionalLight = new THREE.DirectionalLight( 0xffffff );
  directionalLight.position.set( 1, 0.75, 0.5 ).normalize();
  scene.add( directionalLight );

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setClearColor( 0xf0f0f0 );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
  render();

}

function render() {
  // use # of ms since last update as delta
  controls.update(framerate);
  renderer.render(scene, camera);
}

// code for drawing minecraft maps

function addVoxel(x, y, z, color) {
  // default color is yellow
  var cubeMaterial = new THREE.MeshLambertMaterial({color: color || 0xfeb74c});
  var voxel = new THREE.Mesh(cubeGeo, cubeMaterial);
  voxel.position.set(x, y, z);
  scene.add(voxel);
}

function addShapeVoxels(shape) {
  voxelSideLength = 50;
  // todo: add in shape.x, y and z for offsets later
  for(var x = 0; x < shape.w; x++) {
    for(var z = 0; z < shape.d; z++) {
      for(var y = 0; y < (shape.data.n / (shape.w * shape.d)); y++) {
        // this is how the geolyzer reports 3d data in a 1d array
        // also lua is indexed from 1
        index = (x + 1) + z*shape.w + y*shape.w*shape.d;
        if(shape.data[index]) {
          // subtract one because lua starts at 1 but three.js doesn't
          addVoxel(
            x * voxelSideLength,
            y * voxelSideLength,
            z * voxelSideLength,
            colorFromHardness(shape.data[index])
          );
        }
      }
    }
  }
  // have the shapes appear immediately even if the camera isn't moving
  render();
}

// convert ranges of noisy hardness values to specific colors
function colorFromHardness(hardness) {

  // todo: look up minecraft's actual hardness values
  var hardnessToColorMap = {
    0.2: 0x002200,
    0.8: 0x004400,
    1.0: 0x006600,
    1.5: 0x008800,
    2.0: 0x00aa00,
    3.0: 0x00cc00,
    5.0: 0x00ff00
  };

  var closestMatch = 999; // arbitrarily high number
  var oldDifference = Math.abs(closestMatch - hardness);
  for (var key in hardnessToColorMap) {

    var newDifference = Math.abs(key - hardness);
    if (newDifference < oldDifference) {
      closestMatch = key;
      oldDifference = newDifference;
    }

  }

  return hardnessToColorMap[closestMatch];

}

// locking/unlocking the cursor, enabling/disabling controls
if ('pointerLockElement' in document) {

  var element = renderer.domElement;

  function pointerLockChangeCB(event) {
    if (document.pointerLockElement === element) {controls.enabled = true;}
    else {
      controls.enabled = false;
      document.getElementById('commandInput').focus();
    }
  }

  // Hook pointer lock state change events
  document.addEventListener( 'pointerlockchange', pointerLockChangeCB, false );
  document.addEventListener( 'pointerlockerror', console.dir, false );

  element.addEventListener('click', function(event) {
    element.requestPointerLock();
  }, false);

}
else {alert("Your browser doesn't seem to support Pointer Lock API");}

render();
// after the first time, render only while controls are active
setInterval(function() {controls.enabled ? render() : false}, framerate);
