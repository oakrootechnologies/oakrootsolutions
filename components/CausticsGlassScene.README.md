# Customizing the Caustics Glass Scene

## How to Replace Models

### Option 1: Replace with Your Own GLB Model

1. **Get or Create Your 3D Model:**
   - Use Blender, Maya, or any 3D modeling software
   - Export as GLB format
   - Or download free models from:
     - [Sketchfab](https://sketchfab.com/)
     - [Poly Haven](https://polyhaven.com/)
     - [Free3D](https://free3d.com/)

2. **Prepare Your Model:**
   - Name your GLB file (e.g., `my-scene.glb`)
   - Place it in the `public` folder
   - Make sure it's optimized (under 2MB recommended)

3. **Update the Component:**
   - Change the model path in `CausticsGlassScene.tsx`
   - Update the node/material references to match your model

### Option 2: Use Multiple Models

You can load multiple GLB files and combine them in the scene.

### Option 3: Use Simple Primitives

Replace complex models with Three.js primitives (boxes, spheres, etc.) for testing.

## Step-by-Step Guide

### Step 1: Update the Model Path

In `CausticsGlassScene.tsx`, change:

```tsx
const { nodes, materials } = useGLTF('/glass-transformed.glb');
```

To:

```tsx
const { nodes, materials } = useGLTF('/your-model.glb');
```

### Step 2: Inspect Your Model Structure

To see what nodes and materials your GLB file contains, you can:

1. Use [gltfjsx](https://github.com/pmndrs/gltfjsx):
   ```bash
   npx gltfjsx your-model.glb
   ```
   This will generate a JSX file showing all nodes and materials.

2. Or use an online viewer:
   - [glTF Viewer](https://gltf-viewer.donmccurdy.com/)
   - [Babylon.js Sandbox](https://sandbox.babylonjs.com/)

### Step 3: Update the Scene Component

Replace the mesh references with your model's node names:

```tsx
function Scene(props: any) {
  const { nodes, materials } = useGLTF('/your-model.glb');

  return (
    <group {...props} dispose={null}>
      {/* Replace these with your model's nodes */}
      <mesh geometry={nodes.yourObject1.geometry} material={materials.yourMaterial1} />
      <mesh geometry={nodes.yourObject2.geometry} material={materials.yourMaterial2} />
      {/* etc... */}
    </group>
  );
}
```

### Step 4: Apply Caustics (Optional)

If you want caustics on a specific object (like glass), wrap it:

```tsx
<Caustics
  backfaces
  color={[1, 0.8, 0.8]}
  focus={[0, -1.2, 0]}
  lightSource={[-1.2, 3, -2]}
  frustum={1.75}
  intensity={0.005}
  worldRadius={0.1126 / 10}
  ior={0.91}
  backfaceIor={1.26}
>
  <mesh geometry={nodes.glassObject.geometry}>
    <MeshTransmissionMaterial
      backside
      backsideThickness={0.1}
      thickness={0.05}
      chromaticAberration={0.05}
      anisotropicBlur={1}
      clearcoat={0.5}
      clearcoatRoughness={1}
      envMapIntensity={1.5}
    />
  </mesh>
</Caustics>
```

## Example: Simple Custom Scene

Here's an example using simple primitives:

```tsx
function Scene(props: any) {
  return (
    <group {...props} dispose={null}>
      {/* A simple box */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>

      {/* A sphere */}
      <mesh position={[2, 0, 0]} castShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="blue" />
      </mesh>

      {/* A torus */}
      <mesh position={[-2, 0, 0]} castShadow>
        <torusGeometry args={[0.5, 0.2, 16, 100]} />
        <meshStandardMaterial color="green" />
      </mesh>
    </group>
  );
}
```

## Example: Using Your Own GLB Model

```tsx
function Scene(props: any) {
  const { nodes, materials } = useGLTF('/my-custom-scene.glb');

  return (
    <group {...props} dispose={null}>
      {/* Use your model's node names */}
      <mesh 
        geometry={nodes.MyObject.geometry} 
        material={materials.MyMaterial}
        castShadow
      />
      
      {/* Add caustics to transparent objects */}
      <Caustics
        color={[1, 0.8, 0.8]}
        focus={[0, -1.2, 0]}
        lightSource={[-1.2, 3, -2]}
        intensity={0.005}
      >
        <mesh geometry={nodes.GlassObject.geometry}>
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

## Tips

1. **Model Optimization:**
   - Keep file size under 2MB for web
   - Use compressed textures
   - Reduce polygon count if needed

2. **Positioning:**
   - Adjust `position={[x, y, z]}` to place objects
   - Use `rotation={[x, y, z]}` to rotate
   - Use `scale={[x, y, z]}` to resize

3. **Lighting:**
   - The scene uses AccumulativeShadows for soft shadows
   - Environment lighting is provided by the Env component
   - Adjust light positions in the Caustics component

4. **Materials:**
   - Use `MeshTransmissionMaterial` for glass/transparent objects
   - Use `MeshStandardMaterial` for regular objects
   - Adjust material properties for desired look

## Need Help?

- Check the [drei documentation](https://github.com/pmndrs/drei) for more components
- See [React Three Fiber docs](https://docs.pmnd.rs/react-three-fiber) for R3F usage
- Use [gltfjsx](https://github.com/pmndrs/gltfjsx) to auto-generate component code from your GLB

