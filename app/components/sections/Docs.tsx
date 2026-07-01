"use client";

import SectionHeader from "../ui/SectionHeader";
import { QUOTES } from "@/lib/data";

function VerifiedBadge() {
  return (
    <svg viewBox="0 0 22 22" className="h-[18px] w-[18px] flex-none" aria-label="Verified account">
      <path
        fill="#1d9bf0"
        d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.878 1.688.47.443 1.054.747 1.69.878.634.132 1.293.084 1.902-.14.27.585.7 1.084 1.24 1.44s1.167.551 1.813.568c.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.438-1.246.356-.54.552-1.17.57-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"
      />
    </svg>
  );
}

export default function Docs() {
  return (
    <section id="docs" className="mx-auto w-full max-w-6xl px-4 py-24 md:px-8">
      <SectionHeader route="docs" title="Holy Tech Quotes" />

      <div className="flex justify-center">
        {/* X / Twitter-style post frame — mirrors my GitHub profile */}
        <article className="w-full max-w-xl rounded-2xl border border-line bg-[#000] p-5 md:p-6">
          <div className="flex items-start gap-3">
            <img
              src="https://github.com/aryank2212.png"
              alt="Aryan Kumar Rajput"
              width={48}
              height={48}
              className="h-12 w-12 flex-none rounded-full border border-line"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white">Aryan Kumar</span>
                <VerifiedBadge />
                <span className="truncate text-muted">@aryank2212</span>
              </div>

              <div className="mt-3 space-y-4 text-[15px] leading-snug text-white md:text-base">
                <p className="font-bold">#Holy_Tech_Quotes</p>
                {QUOTES.map((quote, i) => (
                  <p key={i}>
                    <span className="text-muted">-&gt;</span> &ldquo;{quote.text}&rdquo;
                  </p>
                ))}
              </div>

              <div className="mt-4 text-sm text-muted">10:00 AM · Jan 20, 2026</div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
