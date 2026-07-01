export default function Interlude() {
  return (
    <section className="relative flex w-full flex-col items-center justify-center overflow-hidden border-y border-line bg-surface py-20 lg:py-32">
      <div className="pointer-events-none relative flex w-[120%] -translate-x-[10%] justify-center overflow-hidden">
        <h2 
          className="text-[18vw] font-bold leading-none tracking-tighter mix-blend-plus-lighter whitespace-nowrap opacity-30"
          style={{
            fontFamily: "var(--font-display)",
            WebkitTextStroke: "1px rgba(34, 211, 238, 0.3)",
            color: "transparent"
          }}
          aria-hidden="true"
        >
          SIGNAL
        </h2>
      </div>
      
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-b from-transparent via-bg/20 to-transparent backdrop-blur-[2px]">
        <div className="font-mono text-xs tracking-widest text-cyan">
          // the part of the iceberg you don&apos;t see
        </div>
      </div>
    </section>
  );
}
