export default function PeerReviews() {
  const notes = [
    {
      text: "Building neural nets from first principles — autograd, backprop, and the deep-learning math underneath. If I can't derive it, I don't trust it yet.",
      label: "ML Systems & DL Math",
      meta: "focus // now",
    },
    {
      text: "Running Anton, a self-hosted homelab, as a playground for training experiments, tinkering, and keeping everything close to the metal.",
      label: "Homelab: Anton",
      meta: "infra // always-on",
    },
    {
      text: "Chasing a path toward research engineering and data science — one repo, one paper reimplementation, and one very full cup of coffee at a time.",
      label: "Research Engineer / DS",
      meta: "goal // 2029",
    },
  ];

  return (
    <section id="peer-reviews" className="w-full border-y border-line bg-surface py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="mb-12 flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="h-[1px] w-8 bg-line" />
            <span className="font-mono text-sm tracking-widest text-cyan">/sys/field-notes</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-5xl">Field Notes</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {notes.map((note, i) => (
            <div
              key={i}
              className="flex flex-col justify-between rounded-xl border border-line bg-bg p-8"
            >
              <div className="mb-6 font-mono text-sm leading-relaxed text-muted">
                <span className="text-emerald">{"// " + note.meta}</span>
                <br />
                <br />
                {note.text}
              </div>

              <div className="flex items-center gap-3 border-t border-line pt-6">
                <div className="h-2 w-2 flex-none rounded-full bg-cyan" />
                <div className="font-mono text-xs font-bold tracking-widest text-body uppercase">
                  {note.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
