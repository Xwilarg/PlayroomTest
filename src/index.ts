import { PerspectiveCamera, Scene, WebGLRenderer, DirectionalLight, Camera, Object3D, Vector3, Color } from "three"
// @ts-ignore
import { onPlayerJoin, insertCoin, myPlayer } from "playroomkit"

import { GLTF, GLTFLoader } from "three/addons/loaders/GLTFLoader.js"
import { Mover } from "./mover"
import { createPlane } from "./util"

// Set up scene and renderer
const scene = new Scene()

scene.background = new Color(49 / 255, 77 / 255, 121 / 255)

const renderer = new WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)

// Add a light to our scene
const light = new DirectionalLight(0xffffff)

light.position.set(0, 10, 10)
scene.add(light)

// Add cute floor
createPlane("zirk.png", scene)

// Since Playroom has no bindings
interface DummyState
{
    getState(state: string): object
}

interface Player {
    object: Object3D
    state?: DummyState
}

class Game extends Mover {
    private scene: Scene
    private renderer: WebGLRenderer
    private camera: Camera

    private loader: GLTFLoader

    private players: Player[]

    constructor(scene: Scene, renderer: WebGLRenderer, camera: Camera) {
        super()

        this.scene = scene
        this.renderer = renderer
        this.camera = camera

        this.loader = new GLTFLoader()
        this.loader.setPath("assets/")

        this.players = []
    }

    start() {
        super.start()

        // Create the player
        this.createLocalPlayer()

        document.body.appendChild(this.renderer.domElement)

        // Start the render loop
        this.renderer.setAnimationLoop(this.render.bind(this))
    }

    // Adds a player to the scene
    addPlayer(state?: DummyState, callback?: (object: Object3D) => void) {
        this.loader.load("Chair.gltf", (gltf: GLTF) => {
            this.scene.add(gltf.scene)

            const player: Player = { state, object: gltf.scene }
            this.players.push(player)

            if (callback) callback(gltf.scene)
        })
    }

    // Creates the local player
    createLocalPlayer() {
        this.addPlayer(null, (player) => {
            this.camera.position.set(0, 3.5, 5)
            this.camera.rotateX(-0.5)

            player.attach(this.camera)
        })
    }

    // Gets the local player
    getLocalPlayer(): Player {
        return this.players.find(x => x.state == null)
    }
    
    render() {
        const player = this.getLocalPlayer()

        // Process local player
        if (player) {
            const forward = super.getMovementVector()

            player.object.position.add(forward)

            myPlayer().setState("position", player.object.position)
        }
        
        // Process other players
        for (const player of this.players) {
            if (player.state == null) continue

            const position = player.state.getState("position") as Vector3

            if (position) {
                player.object.position.set(position.x, position.y, position.z)
            }
        }

        this.renderer.render(this.scene, this.camera)
    }

    onPlayerJoin(state: DummyState) {
        this.addPlayer(state)
    }
}

const game = new Game(scene, renderer, camera)

// Insert the coin!
insertCoin().then(() => game.start())

onPlayerJoin(game.onPlayerJoin.bind(game))