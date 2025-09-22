/**
 * Minimal GLTFLoader for loading .gltf and .glb files.
 * This is a simplified version and does not cover all GLTF features.
 * For production, consider using three.js's GLTFLoader.
 */

export class GLTFLoader {
    constructor() {}

    async load(url) {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to load GLTF: ${url}`);
        const isBinary = url.endsWith('.glb');
        if (isBinary) {
            const arrayBuffer = await response.arrayBuffer();
            return this.parseGLB(arrayBuffer);
        } else {
            const json = await response.json();
            return this.parseGLTF(json, url);
        }
    }

    async parseGLTF(json, url) {
        // Minimal: just return the JSON and base URL
        return {
            json,
            baseUrl: url.substring(0, url.lastIndexOf('/') + 1)
        };
    }

    async parseGLB(arrayBuffer) {
        // Minimal: parse GLB header and extract JSON chunk
        const dataView = new DataView(arrayBuffer);
        const magic = dataView.getUint32(0, true);
        if (magic !== 0x46546C67) throw new Error('Invalid GLB file');
        const jsonLength = dataView.getUint32(12, true);
        const jsonStart = 20;
        const jsonText = new TextDecoder().decode(
            new Uint8Array(arrayBuffer, jsonStart, jsonLength)
        );
        const json = JSON.parse(jsonText);
        return { json };
    }
}