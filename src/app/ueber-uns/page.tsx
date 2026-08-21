import type { Metadata } from "next";
import { company } from "@/lib/company";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Über uns",
  description: "WASCOTEXTIL Textilveredelung in Paderborn — individuell und hochwertig.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
      <Reveal>
        <p className="text-[11px] uppercase tracking-[0.24em] text-muted">Über uns</p>
        <h1 className="mt-3 max-w-3xl font-serif text-4xl tracking-tight sm:text-6xl lg:text-7xl">
          WASCOTEXTIL Textilveredelung — individuell und hochwertig
        </h1>
        <p className="mt-6 max-w-2xl text-[16px] leading-8 text-muted">
          Profitiere von unserer Expertise im Textildruck, modernster Technik und langjähriger Erfahrung. Wir stehen für herausragende Qualität, exzellenten Service und absolute Zuverlässigkeit.
        </p>
      </Reveal>
      <div className="mt-14 grid gap-3 md:grid-cols-3">
        {company.team.map((member, index) => (
          <Reveal key={member.name} delay={index * 80}>
            <article className="h-full rounded-[28px] bg-white/70 p-7">
              <h2 className="text-xl tracking-tight">{member.name}</h2>
              <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-red">{member.role}</p>
              {"bio" in member && member.bio ? (
                <p className="mt-4 text-sm leading-7 text-muted">{member.bio}</p>
              ) : null}
              {"email" in member && member.email ? (
                <p className="mt-4 text-sm">
                  <a className="hover:text-red" href={`mailto:${member.email}`}>
                    {member.email}
                  </a>
                </p>
              ) : null}
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
