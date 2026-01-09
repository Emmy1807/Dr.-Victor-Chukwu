import { redirect, notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../api/auth/[...nextauth]/route";
import { programs } from "../../../../content/programs";

export default async function ProgramApplyPage({ params }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/sign-up");
  }

  const program = programs.find((item) => item.slug === params.slug);

  if (!program) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-12">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400 mb-3">
          Program Details
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          {program.title}
        </h1>
      </div>

      {program.slug === "pre-marital-counselling" && (
        <div className="space-y-6">
          {/* Main Content Box */}
          <div className="rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-900/60 to-slate-800/40 backdrop-blur-sm p-8 md:p-10 space-y-6">

            {/* Intro Section */}
            <section className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 mt-2 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-white mb-3">Welcome</h2>
                  <p className="text-slate-300 leading-relaxed text-base">
                    Congratulations on your decision to embark on a journey toward a lifetime of love and commitment! As you prepare for your upcoming marriage, it's important to also prepare for the challenges that may come along the way. That's why I offer Godly pre-marital counseling, designed to help couples build a strong foundation for a fulfilling and lifelong partnership.
                  </p>
                </div>
              </div>
            </section>

            <div className="h-px bg-gradient-to-r from-cyan-400/0 via-cyan-400/30 to-cyan-400/0" />

            {/* Program Details Section */}
            <section className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 mt-2 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-white mb-3">Program Overview</h2>
                  <p className="text-slate-300 leading-relaxed text-base">
                    In this program, we use the renowned <span className="text-cyan-300 font-semibold">Symbis assessment</span> to explore various aspects of your relationship, including communication, conflict resolution, intimacy, finances, and faith. Together, we will work through any potential issues or concerns, and equip you with the tools and skills needed to navigate the ups and downs of married life.
                  </p>
                </div>
              </div>
            </section>

            <div className="h-px bg-gradient-to-r from-cyan-400/0 via-cyan-400/30 to-cyan-400/0" />

            {/* Approach Section */}
            <section className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 mt-2 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-white mb-3">My Approach</h2>
                  <p className="text-slate-300 leading-relaxed text-base">
                    As a Christian counsellor, my approach is rooted in <span className="text-cyan-300 font-semibold">biblical principles and values</span>. I believe that a strong relationship with God is the cornerstone of a successful marriage. I am excited to walk alongside you and your partner during this important season of your lives, and to help you build a God-honouring marriage that will last a lifetime.
                  </p>
                </div>
              </div>
            </section>

            <div className="h-px bg-gradient-to-r from-cyan-400/0 via-cyan-400/30 to-cyan-400/0" />

            {/* CTA Section */}
            <section className="pt-4">
              <a
                href="https://www.peacemarriage.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 text-base font-semibold text-slate-950 hover:shadow-lg hover:shadow-cyan-400/30 transition-all duration-200 hover:scale-105"
              >
                Register at PeaceMarriage.org
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6v12h4m0 0v6m0-6v-6m8 0h4v12h-4m0 0v6m0-6v-6" />
                </svg>
              </a>
            </section>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-slate-700 bg-slate-900/40 p-6 text-center hover:border-cyan-400/50 transition-colors">
              <div className="text-3xl mb-2">📋</div>
              <h3 className="font-semibold text-white mb-2">Symbis Assessment</h3>
              <p className="text-sm text-slate-400">Comprehensive relationship evaluation</p>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-900/40 p-6 text-center hover:border-cyan-400/50 transition-colors">
              <div className="text-3xl mb-2">💬</div>
              <h3 className="font-semibold text-white mb-2">Guided Sessions</h3>
              <p className="text-sm text-slate-400">Expert counseling and support</p>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-900/40 p-6 text-center hover:border-cyan-400/50 transition-colors">
              <div className="text-3xl mb-2">✨</div>
              <h3 className="font-semibold text-white mb-2">God-Centred</h3>
              <p className="text-sm text-slate-400">Biblical principles for marriage</p>
            </div>
          </div>
        </div>
      )}

      {program.slug !== "pre-marital-counselling" && (
        <div className="space-y-6">
          {program.slug === "mentorship-program" ? (
            <>
              {/* Mentorship Program Content */}
              <div className="rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-900/60 to-slate-800/40 backdrop-blur-sm p-8 md:p-10 space-y-6">

                {/* Intro Section */}
                <section className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 mt-2 flex-shrink-0" />
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-3">Welcome</h2>
                      <p className="text-slate-300 leading-relaxed text-base">
                        Welcome to my mentorship program, where my passion is to <span className="text-cyan-300 font-semibold">empower and guide young individuals</span> in fulfilling their true potential. As a mentor, my goal is to help you develop the necessary skills and knowledge to achieve your goals and live a fulfilling life.
                      </p>
                    </div>
                  </div>
                </section>

                <div className="h-px bg-gradient-to-r from-cyan-400/0 via-cyan-400/30 to-cyan-400/0" />

                {/* Support Section */}
                <section className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 mt-2 flex-shrink-0" />
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-3">Your Journey</h2>
                      <p className="text-slate-300 leading-relaxed text-base">
                        Whether you're seeking guidance in your personal or professional life, I am committed to providing you with the <span className="text-cyan-300 font-semibold">support and resources needed to succeed</span>. Together, we will explore your passions and strengths, set achievable goals, and work towards actualizing your dreams.
                      </p>
                    </div>
                  </div>
                </section>

                <div className="h-px bg-gradient-to-r from-cyan-400/0 via-cyan-400/30 to-cyan-400/0" />

                {/* Vision Section */}
                <section className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 mt-2 flex-shrink-0" />
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-3">Our Vision</h2>
                      <p className="text-slate-300 leading-relaxed text-base">
                        I am excited to embark on this journey with you and see your <span className="text-cyan-300 font-semibold">positive impact on the world</span>. Together, we'll unlock your potential and equip you with the tools to succeed in all areas of life.
                      </p>
                    </div>
                  </div>
                </section>

                <div className="h-px bg-gradient-to-r from-cyan-400/0 via-cyan-400/30 to-cyan-400/0" />

                {/* CTA Section */}
                <section className="pt-4">
                  <a
                    href="https://peacementorship.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 text-base font-semibold text-slate-950 hover:shadow-lg hover:shadow-cyan-400/30 transition-all duration-200 hover:scale-105"
                  >
                    Learn More at PeaceMentorship.org
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6v12h4m0 0v6m0-6v-6m8 0h4v12h-4m0 0v6m0-6v-6" />
                    </svg>
                  </a>
                </section>
              </div>

              {/* Info Cards */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="rounded-xl border border-slate-700 bg-slate-900/40 p-6 text-center hover:border-cyan-400/50 transition-colors">
                  <div className="text-3xl mb-2">🎯</div>
                  <h3 className="font-semibold text-white mb-2">Goal Setting</h3>
                  <p className="text-sm text-slate-400">Achieve your dreams with clarity</p>
                </div>
                <div className="rounded-xl border border-slate-700 bg-slate-900/40 p-6 text-center hover:border-cyan-400/50 transition-colors">
                  <div className="text-3xl mb-2">💡</div>
                  <h3 className="font-semibold text-white mb-2">Skills Development</h3>
                  <p className="text-sm text-slate-400">Build competencies for success</p>
                </div>
                <div className="rounded-xl border border-slate-700 bg-slate-900/40 p-6 text-center hover:border-cyan-400/50 transition-colors">
                  <div className="text-3xl mb-2">🚀</div>
                  <h3 className="font-semibold text-white mb-2">Unlock Potential</h3>
                  <p className="text-sm text-slate-400">Discover and reach your peak</p>
                </div>
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-8 text-center">
              <p className="text-slate-300 text-base">
                Application form coming soon. For now, please contact the ministry
                office to express your interest in this program.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
