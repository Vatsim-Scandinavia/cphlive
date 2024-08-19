import Globe from "@/components/magicui/globe";
 
export function GlobeDemo() {
  return (
    <div className="relative flex h-[100svh] w-full items-center justify-center overflow-hidden rounded-lg border bg-background px-40 pb-40 md:pb-60 md:shadow-xl">
      <Globe className="top-28" />
      <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
    </div>
  );
}