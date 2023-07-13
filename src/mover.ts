import { Clock, Vector3 } from "three"

class Mover {
    private forwardDown: boolean
    private leftDown: boolean
    private rightDown: boolean
    private backDown: boolean

    protected clock: Clock

    protected start() {
        window.addEventListener("keydown", this.onKeyDown.bind(this))
        window.addEventListener("keyup", this.onKeyUp.bind(this))
        
        this.clock = new Clock()
    }

    protected getMovementVector(): Vector3 {
        const vector = new Vector3()
        const delta = this.clock.getDelta()

        if (this.forwardDown) vector.x = delta * 1.0
        if (this.leftDown) vector.z = delta * 1.0
        if (this.rightDown) vector.z = -(delta * 1.0)
        if (this.backDown) vector.x = -(delta * 1.0)

        return vector
    }

    private onKeyDown(event: KeyboardEvent) {
        switch(event.key) {
        case "w":
            this.forwardDown = true
            break
        case "a":
            this.leftDown = true
            break
        case "d":
            this.rightDown = true
            break
        case "s":
            this.backDown = true
            break
        }
    }

    private onKeyUp(event: KeyboardEvent) {
        switch(event.key) {
        case "w":
            this.forwardDown = false
            break
        case "a":
            this.leftDown = false
            break
        case "d":
            this.rightDown = false
            break
        case "s":
            this.backDown = false
            break
        }
    }
}

export { Mover }