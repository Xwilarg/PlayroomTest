import { PerspectiveCamera, Scene, WebGLRenderer, DirectionalLight, DirectionalLightHelper } from "three"
// @ts-ignore
import { onPlayerJoin, insertCoin } from "playroomkit"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"

function initGame() {
    const loader = new GLTFLoader()

    const scene = new Scene()
    const camera = new PerspectiveCamera(45, window.innerWidth / window.innerWidth, 1, 1000)

    const light = new DirectionalLight( 0xFFFFFF )
    const helper = new DirectionalLightHelper( light, 5 )

    scene.add( helper )

    const renderer = new WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)

    document.body.appendChild(renderer.domElement)

    renderer.setAnimationLoop(() => {
        renderer.render(scene, camera)
    })

    loader.load("assets/Table.gltf", function (gltf) {
        scene.add(gltf.scene)
        console.log("Object loaded")
    }, undefined, function (error) {
        console.error(error)
    })
}

let isInit = false
onPlayerJoin((state) => {
    console.log("Player joined")
    console.log(state)

    if (!isInit) {
        isInit = true
        initGame()
    }
})

insertCoin()

console.log("Game started!")