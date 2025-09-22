/**
 * OrbitControls - A simple implementation for orbiting a 3D object using mouse/touch.
 * Usage: const controls = new OrbitControls(camera, domElement);
 */

class OrbitControls {
    constructor(camera, domElement) {
        this.camera = camera;
        this.domElement = domElement || document;

        // Parameters
        this.enabled = true;
        this.target = { x: 0, y: 0, z: 0 };
        this.minDistance = 0;
        this.maxDistance = Infinity;
        this.minPolarAngle = 0; // radians
        this.maxPolarAngle = Math.PI; // radians

        // Internal state
        this.spherical = { radius: 10, phi: Math.PI / 2, theta: 0 };
        this.state = null;
        this.pointerStart = { x: 0, y: 0 };
        this.sphericalStart = { ...this.spherical };

        // Bindings
        this.onPointerDown = this.onPointerDown.bind(this);
        this.onPointerMove = this.onPointerMove.bind(this);
        this.onPointerUp = this.onPointerUp.bind(this);
        this.onWheel = this.onWheel.bind(this);

        // Init
        this.addEventListeners();
        this.update();
    }

    addEventListeners() {
        this.domElement.addEventListener('pointerdown', this.onPointerDown);
        this.domElement.addEventListener('wheel', this.onWheel, { passive: false });
    }

    removeEventListeners() {
        this.domElement.removeEventListener('pointerdown', this.onPointerDown);
        this.domElement.removeEventListener('wheel', this.onWheel);
        document.removeEventListener('pointermove', this.onPointerMove);
        document.removeEventListener('pointerup', this.onPointerUp);
    }

    onPointerDown(event) {
        if (!this.enabled) return;
        this.state = 'rotate';
        this.pointerStart.x = event.clientX;
        this.pointerStart.y = event.clientY;
        this.sphericalStart = { ...this.spherical };
        document.addEventListener('pointermove', this.onPointerMove);
        document.addEventListener('pointerup', this.onPointerUp);
    }

    onPointerMove(event) {
        if (!this.enabled || this.state !== 'rotate') return;
        const dx = event.clientX - this.pointerStart.x;
        const dy = event.clientY - this.pointerStart.y;
        const ROTATE_SPEED = 0.005;

        this.spherical.theta = this.sphericalStart.theta - dx * ROTATE_SPEED;
        this.spherical.phi = this.sphericalStart.phi - dy * ROTATE_SPEED;

        // Clamp phi
        this.spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this.spherical.phi));

        this.update();
    }

    onPointerUp() {
        this.state = null;
        document.removeEventListener('pointermove', this.onPointerMove);
        document.removeEventListener('pointerup', this.onPointerUp);
    }

    onWheel(event) {
        if (!this.enabled) return;
        event.preventDefault();
        const ZOOM_SPEED = 0.95;
        if (event.deltaY < 0) {
            this.spherical.radius *= ZOOM_SPEED;
        } else if (event.deltaY > 0) {
            this.spherical.radius /= ZOOM_SPEED;
        }
        this.spherical.radius = Math.max(this.minDistance, Math.min(this.maxDistance, this.spherical.radius));
        this.update();
    }

    update() {
        // Spherical to Cartesian
        const { radius, phi, theta } = this.spherical;
        const sinPhiRadius = Math.sin(phi) * radius;
        this.camera.position.x = this.target.x + sinPhiRadius * Math.sin(theta);
        this.camera.position.y = this.target.y + Math.cos(phi) * radius;
        this.camera.position.z = this.target.z + sinPhiRadius * Math.cos(theta);
        if (typeof this.camera.lookAt === 'function') {
            this.camera.lookAt(this.target.x, this.target.y, this.target.z);
        }
    }

    dispose() {
        this.removeEventListeners();
    }
}

export default OrbitControls;