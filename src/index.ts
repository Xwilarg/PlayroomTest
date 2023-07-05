import { PerspectiveCamera, Scene, WebGLRenderer } from "three"
// @ts-ignore
import { onPlayerJoin, insertCoin, isHost, myPlayer } from "playroomkit"

const scene = new Scene()
const camera = new PerspectiveCamera(45, window.innerWidth / window.innerWidth, 1, 1000)

const renderer = new WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

renderer.setAnimationLoop(() => {
    renderer.render(scene, camera)
})

onPlayerJoin((state) => {
    console.log(`Player joined: {state}`)
})

await insertCoin()

console.log("Game started!")