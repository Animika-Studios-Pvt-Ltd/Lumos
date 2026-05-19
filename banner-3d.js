import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js';

const mount = document.getElementById('globe3d');
if (mount) {
    /* ───── Scene ───── */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 1000);
    camera.position.set(0, 0, 4.3);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth || 560, mount.clientHeight || 560, false);
    mount.appendChild(renderer.domElement);

    /* ───── Single rotating group (everything rotates together) ───── */
    const globe = new THREE.Group();
    globe.rotation.y = -1.95;          // Start rotation from Europe (Greece facing viewer)
    scene.add(globe);

    /* ───── Lighting ───── */
    scene.add(new THREE.AmbientLight(0xffffff, 2.2));

    const loader = new THREE.TextureLoader();
    const earthMap = loader.load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg');
    const earthSpec = loader.load('https://threejs.org/examples/textures/planets/earth_specular_2048.jpg');
    const earthNorm = loader.load('https://threejs.org/examples/textures/planets/earth_normal_2048.jpg');

    const R = 1.3; // globe radius

    /* ───── Earth ───── */
    const earth = new THREE.Mesh(
        new THREE.SphereGeometry(R, 96, 96),
        new THREE.MeshPhongMaterial({
            map: earthMap,
            specularMap: earthSpec,
            normalMap: earthNorm,
            specular: new THREE.Color(0x444444),
            shininess: 12
        })
    );
    globe.add(earth);



    /* ───── Atmosphere ───── */
    const atmosphere = new THREE.Mesh(
        new THREE.SphereGeometry(R + 0.07, 96, 96),
        new THREE.MeshBasicMaterial({
            color: 0x8fd3ff,
            transparent: true,
            opacity: 0.10
        })
    );
    globe.add(atmosphere);

    /* ───── Lat/Lon → 3D ───── */
    function latLon(lat, lon, radius) {
        const phi = (90 - lat) * Math.PI / 180;
        const theta = (lon + 180) * Math.PI / 180;
        return new THREE.Vector3(
            -radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.cos(phi),
            radius * Math.sin(phi) * Math.sin(theta)
        );
    }

    /* ───── Route curve (Greece → Bangalore) ───── */
    const routeR = R + 0.02; // dots sit just above the surface
    const greece = latLon(39.0742, 21.8243, routeR);
    const bangalore = latLon(12.9716, 77.5946, routeR);

    // Intermediate control points for a gentle arc
    const mid1 = latLon(34, 38, R + 0.16);
    const mid2 = latLon(24, 55, R + 0.22);
    const mid3 = latLon(18, 68, R + 0.16);

    const curve = new THREE.CatmullRomCurve3([greece, mid1, mid2, mid3, bangalore]);

    /* ───── Dotted route (visible points, not lines) ───── */
    const dotCount = 160;
    const dotPositions = [];
    for (let i = 0; i <= dotCount; i++) {
        const pt = curve.getPointAt(i / dotCount);
        dotPositions.push(pt.x, pt.y, pt.z);
    }

    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute('position', new THREE.Float32BufferAttribute(dotPositions, 3));

    const dotMat = new THREE.PointsMaterial({
        color: 0xf4a04b,
        size: 0.032,
        transparent: true,
        opacity: 0.95,
        depthWrite: false,
        sizeAttenuation: true
    });
    const pathDots = new THREE.Points(dotGeo, dotMat);
    globe.add(pathDots);

    /* ───── Location markers (small rings at Greece & Bangalore) ───── */
    function makeLocationDot(pos, color) {
        const m = new THREE.Mesh(
            new THREE.SphereGeometry(0.025, 16, 16),
            new THREE.MeshBasicMaterial({ color })
        );
        m.position.copy(pos);
        globe.add(m);
    }
    makeLocationDot(greece, 0xf37022);
    makeLocationDot(bangalore, 0xf37022);

    /* ───── Moving marker ───── */
    const marker = new THREE.Mesh(
        new THREE.SphereGeometry(0.045, 18, 18),
        new THREE.MeshBasicMaterial({ color: 0xf37022 })
    );
    globe.add(marker);

    /* ───── Subtle outer glow (CSS overlay) ───── */
    const glow = document.createElement('div');
    glow.style.cssText = 'position:absolute;inset:9%;border-radius:50%;box-shadow:0 0 90px rgba(243,112,34,.18), inset 0 0 90px rgba(255,255,255,.08);pointer-events:none;';
    mount.appendChild(glow);

    /* ───── Animation state ───── */
    let progress = 0;
    let hold = 0;
    const travelFrames = 250;
    const holdFrames = 60;

    function animate() {
        requestAnimationFrame(animate);

        // Normalize rotation angle to [0, 2*PI]
        const norm = ((globe.rotation.y % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

        // Dynamically compute speed: fast in Pacific/Atlantic/Americas (around 1.1 rad), slow in Europe/Asia (around 4.2 rad)
        const minSpeed = 0.0016;
        const maxSpeed = 0.0110;
        const dynamicSpeed = minSpeed + (maxSpeed - minSpeed) * (0.5 + 0.5 * Math.cos(norm - 1.1));

        /* West-to-east rotation — whole group rotates so dots stay anchored */
        globe.rotation.y -= dynamicSpeed;

        /* ── Marker travel logic ── */
        if (hold > 0) {
            hold--;
        } else {
            progress++;
            if (progress > travelFrames) {
                progress = travelFrames;
                hold = holdFrames;
            }
        }

        const t = Math.min(progress / travelFrames, 1);
        // Ease-in-out for smooth marker motion
        const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        marker.position.copy(curve.getPointAt(e));

        if (t >= 1 && hold > 0) {
            // Pulse at Bangalore
            const pulse = 1.0 + 0.35 * Math.sin(hold * 0.15);
            marker.scale.setScalar(pulse);
            marker.position.copy(curve.getPointAt(1));
        } else {
            marker.scale.setScalar(1);
        }

        // Reset for loop
        if (progress >= travelFrames && hold === 0) progress = 0;

        renderer.render(scene, camera);
    }

    animate();

    /* ───── Responsive resize ───── */
    window.addEventListener('resize', () => {
        const w = mount.clientWidth || 560;
        const h = mount.clientHeight || 560;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
    });
}