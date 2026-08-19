import type { Metadata } from "next";
import { company } from "@/lib/company";

export const metadata: Metadata = {
  title: "Über uns",
  description: "WASCOTEXTIL Textilveredelung in Paderborn — individuell und hochwertig.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
      <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Über uns</p>
      <h1 className="mt-3 max-w-3xl font-serif text-4xl tracking-tight sm:text-6xl">
        WASCOTEXTIL Textilveredelung — individuell und hochwertig
      </h1>
      <p className="mt-6 max-w-2xl text-[16px] leading-7 text-muted">
        Profitiere von unserer Expertise im Textildruck, modernster Technik und langjähriger Erfahrung. Wir stehen für herausragende Qualität, exzellenten Service und absolute Zuverlässigkeit.
      </p>
      <div className="mt-14 grid gap-8 md:grid-cols-3">
        {company.team.map((member) => (
          <article key={member.name} className="border border-line bg-white p-6">
            <h2 className="text-xl">{member.name}</h2>
            <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-red">{member.role}</p>
            {"bio" in member && member.bio ? (
              <p className="mt-4 text-sm leading-6 text-muted">{member.bio}</p>
            ) : null}
            {"email" in member && member.email ? (
              <p className="mt-4 text-sm">
                <a href={`mailto:${member.email}`}>{member.email}</a>
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}
