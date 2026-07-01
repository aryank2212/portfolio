export default function SectionHeader({ route, title }: { route: string; title: string }) {
  return (
    <div className="mb-12 flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <div className="h-[1px] w-8 bg-line" />
        <span className="font-mono text-sm tracking-widest text-cyan">/sys/{route}</span>
      </div>
      <h2 className="text-3xl font-bold tracking-tighter md:text-5xl">{title}</h2>
    </div>
  );
}
