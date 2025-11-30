# How to Replace Models in CausticsGlassScene

## Quick Start: 3 Options

### Option 1: Use Simple Shapes (Easiest - No GLB needed)

Replace the `Scene` function in `CausticsGlassScene.tsx` with this:

```tsx
function Scene(props: any) {
  return (
    <group {...props} dispose={null}>
      {/* Your custom objects */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      
      <mesh position={[2, 0, 0]} castShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="blue" />
      </mesh>
      
      {/* Glass object with caustics */}
      <Caustics
        color={[1, 0.8, 0.8]}
        focus={[0, -1.2, 0]}
        lightSource={[-1.2, 3, -2]}
        intensity={0.005}
      >
        <mesh position={[0, 1, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.3, 0.3, 1, 32]} />
          <MeshTransmissionMaterial
            thickness={0.05}
            chromaticAberration={0.05}
            envMapIntensity={1.5}
          />
        </mesh>
      </Caustics>
    </group>
  );
}
```

### Option 2: Use Your Own GLB Model

1. **Place your GLB file in `public` folder:**
   - Example: `public/my-models.glb`

2. **Find out what's in your GLB:**
   ```bash
   npx gltfjsx my-models.glb
   ```
   This will show you all node and material names.

3. **Update the Scene function:**
   ```tsx
   function Scene(props: any) {
     const { nodes, materials } = useGLTF('/my-models.glb');
     
     return (
       <group {...props} dispose={null}>
         {/* Use your model's node names */}
         <mesh 
           geometry={nodes.YourObjectName.geometry} 
           material={materials.YourMaterialName}
           castShadow
         />
       </group>
     );
   }
   ```

4. **Update preload:**
   ```tsx
   useGLTF.preload('/my-models.glb');
   ```

### Option 3: Mix GLB + Primitives

```tsx
function Scene(props: any) {
  const { nodes, materials } = useGLTF('/my-model.glb');
  
  return (
    <group {...props} dispose={null}>
      {/* From GLB */}
      <mesh geometry={nodes.MainObject.geometry} material={materials.MainMaterial} />
      
      {/* Add primitives */}
      <mesh position={[2, 0, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </group>
  );
}
```

## Available Three.js Primitives

You can use these without any GLB file:

- `<boxGeometry args={[width, height, depth]} />`
- `<sphereGeometry args={[radius, widthSegments, heightSegments]} />`
- `<cylinderGeometry args={[radiusTop, radiusBottom, height, segments]} />`
- `<coneGeometry args={[radius, height, segments]} />`
- `<torusGeometry args={[radius, tube, radialSegments, tubularSegments]} />`
- `<planeGeometry args={[width, height]} />`
- `<ringGeometry args={[innerRadius, outerRadius, segments]} />`

## Where to Get Free 3D Models

1. **Sketchfab** - https://sketchfab.com/ (filter by "Downloadable" and "CC License")
2. **Poly Haven** - https://polyhaven.com/models
3. **Free3D** - https://free3d.com/
4. **TurboSquid** - https://www.turbosquid.com/ (has free section)

## Tips

- **File size:** Keep GLB files under 2MB for web
- **Optimization:** Use [gltf-pipeline](https://github.com/CesiumGS/gltf-pipeline) to optimize
- **Naming:** Use descriptive names in your 3D software before exporting
- **Materials:** You can override materials in code even if they're in the GLB

## Need Help?

Check `CausticsGlassScene.example.tsx` for complete working examples!

