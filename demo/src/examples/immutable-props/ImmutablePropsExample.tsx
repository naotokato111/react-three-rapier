import { Box, Sphere, Torus } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  MeshCollider,
  RapierRigidBody,
  RigidBody,
  euler,
  quat
} from "@react-three/rapier";
import { Demo } from "../../App";
import { useEffect, useRef, useState } from "react";
import { useControls } from "leva";

export const ImmutablePropsExample: Demo = () => {
  const [canSleep, setCanSleep] = useState(true);
  const rb = useRef<RapierRigidBody>(null);

  useControls({
    canSleep: {
      value: canSleep,
      onChange: (v) => setCanSleep(v)
    }
  });

  useFrame(() => {
    let rot = performance.now() / 1000;
    rb.current!.setRotation(
      quat().setFromEuler(euler({ x: 0, y: rot, z: 0 })),
      true
    );
  });

  return (
    <group>
      <RigidBody type="fixed" ref={rb} canSleep={canSleep}>
        <Box />
      </RigidBody>
    </group>
  );
};
