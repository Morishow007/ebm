/**
 * IFC Viewer — STUB (Phase 2)
 *
 * Future integration with:
 *   - web-ifc (https://github.com/IFCjs/web-ifc): WebAssembly-powered IFC parser
 *   - web-ifc-three (https://github.com/IFCjs/web-ifc-three): Three.js adapter
 *
 * Implementation plan:
 *   1. npm install web-ifc web-ifc-three
 *   2. Copy IFCWorker.js wasm assets to /public/wasm/
 *   3. Initialize IfcLoader with wasmPath pointing to /public/wasm/
 *   4. Use IfcLoader.load(url, onLoad) inside a useEffect
 *   5. Add the loaded model to the Three.js scene via useThree()
 *   6. Implement element selection with raycasting for property inspection
 */

export function IFCViewer() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-zinc-900 text-zinc-400">
      <p className="text-sm">Visualizador IFC — disponível na Fase 2</p>
    </div>
  )
}
