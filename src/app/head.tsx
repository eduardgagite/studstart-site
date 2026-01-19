import { assetPath } from "@/lib/assets";

export default function Head() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href={assetPath("/images/hero-mountains.png")}
      />
    </>
  );
}
