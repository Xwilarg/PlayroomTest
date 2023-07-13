import { Mesh, MeshBasicMaterial, PlaneGeometry, Scene, Texture, TextureLoader } from "three"

function createPlane(texture: string, scene: Scene) {
    const loader = new TextureLoader()
    loader.setPath("assets/")

    // Load the texture
    loader.load(texture, (texture: Texture) => {
        // And.. now create the geometry 
        const geometry = new PlaneGeometry(10, 10)
        const material = new MeshBasicMaterial({ map: texture })

        const plane = new Mesh(geometry, material)
        plane.rotateX(Math.PI / 180 * -90)

        scene.add(plane)
    })
}

export { createPlane }