import Image from "next/image";
import Reveal from "../../components/Reveal";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

export const metadata = {
  title: "About Me | Dr. Victor Chukwu",
  description:
    "Pastor, Author, Physician, and Biostatistician serving God and humanity with faith, excellence, and purpose.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-14 px-6 py-16">
      {/* HERO */}
      <Reveal>
        <section className="grid items-center gap-10 md:grid-cols-[2fr_3fr]">
          <div className="relative h-96 w-full overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 transition-transform duration-300 hover:scale-[1.01]">
            <Image
              src="/images/dr.chuk.jpeg"
              alt="Portrait of Dr. Victor Chukwu"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
              About Me
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-white">
              Welcome
            </h1>
            <p className="text-slate-300">
              Welcome to the official website of Dr. Victor Chukwu.
            </p>
            <p className="text-slate-300">
              Dr. Victor Chukwu is a dynamic and multi-talented leader who serves
              God and humanity across multiple spheres of influence. He is a
              Pastor, Author, Advisor, Musician, Physician, and Biostatistician,
              passionately committed to faith, excellence, and purposeful
              living.
            </p>
          </div>
        </section>
      </Reveal>

      {/* PROFESSIONAL JOURNEY – HORIZONTAL CARD */}
      <Reveal>
        <section className="rounded-3xl border border-slate-800 bg-slate-900 px-8 py-10 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-slate-800/60">
          <div className="grid gap-8 md:grid-cols-[1fr_3fr]">
            <h2 className="text-3xl font-semibold text-white">
              Professional Journey
            </h2>

            <div className="space-y-4 text-slate-300">
              <p>
                Victor’s journey of excellence began early. His dedication,
                discipline, and leadership qualities earned him the role of
                Senior Prefect (Student Council President) in high school—
                marking the start of a lifelong pursuit of purposeful
                leadership.
              </p>

              <p>
                He pursued his medical education at the University of Port
                Harcourt, Nigeria, where he studied Medicine and Surgery and
                graduated as a physician in 2010. After several years of medical
                practice, his growing passion for research and population health
                led him to the United States in 2013.
              </p>

              <p>
                In the U.S., Victor obtained a Master of Public Health (MPH) and
                later a Doctorate in Public Health (DrPH) with specialization in
                Biostatistics. As a Consultant Biostatistician at Everlywell, he
                played a key role in developing one of the pioneering at-home
                COVID-19 test kits.
              </p>

              <p>
                He currently serves as a Clinical Biostatistician at Boehringer
                Ingelheim, contributing to innovative clinical trials that shape
                the future of medicine.
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* MINISTRY & LEADERSHIP – HORIZONTAL CARD */}
      <Reveal>
        <section className="rounded-3xl border border-slate-800 bg-slate-900 px-8 py-10 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-slate-800/60">
          <div className="grid gap-8 md:grid-cols-[1fr_3fr]">
            <h2 className="text-3xl font-semibold text-white">
              Ministry & Leadership
            </h2>

            <div className="space-y-4 text-slate-300">
              <p>
                Victor surrendered his life to Jesus Christ at the age of seven,
                beginning a lifelong journey of faith and service. Raised in
                church, he served extensively in the choir, learning the piano
                and violin, eventually directing choirs and mentoring young
                people.
              </p>

              <p>
                After relocating to the United States, he served as President of
                a Young Adult Ministry (2014–2019) and later as Regional Youth
                Pastor. In obedience to God’s call, he founded Peace of God
                Ministry—committed to equipping individuals to live lives of
                peace, faith, and purpose.
              </p>

              <p>
                Through Peace of God Ministry, Victor pastors Peace of God
                Church, leads the Peace Marriage Program, and authors impactful
                books including <em>The Spirit That Conquers</em>,{" "}
                <em>Making Life-Changing Decisions</em>, and{" "}
                <em>The Will of God</em>.
              </p>

              <p>
                He also expresses his creativity through Peace Music, writing
                and producing songs that inspire worship and devotion.
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* FAMILY LIFE – HORIZONTAL CARD */}
      <Reveal>
        <section className="rounded-3xl border border-slate-800 bg-slate-900 px-8 py-10 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-slate-800/60">
          <div className="grid gap-8 md:grid-cols-[1fr_3fr]">
            <h2 className="text-3xl font-semibold text-white">Family Life</h2>

            <div className="space-y-4 text-slate-300">
              <p>
                Victor married his beloved wife Esther in 2014. Esther is the
                co-founder of Peace of God Ministry, and together they are
                blessed with three wonderful children: Shalom, Shiloh, and
                Salma.
              </p>

              <p>
                They reside in Atlanta, Georgia, where they continue to serve
                their community and live out God’s purpose with joy and
                dedication.
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* CONTACT – HORIZONTAL PANEL */}
      <Reveal>
        <section className="rounded-3xl border border-slate-800 bg-slate-900 px-8 py-12 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-slate-800/60">
          <div className="grid gap-8 md:grid-cols-[2fr_3fr] md:items-center">
            {/* LEFT */}
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold text-white">Contact</h2>
              <p className="text-slate-300">
                Feel free to connect with Dr. Victor Chukwu.
              </p>

              <div className="flex gap-6 text-white">
                <a href="https://facebook.com" className="hover:text-cyan-400 transition">
                  <FaFacebookF size={22} />
                </a>
                <a href="https://instagram.com" className="hover:text-cyan-400 transition">
                  <FaInstagram size={22} />
                </a>
                <a href="https://twitter.com" className="hover:text-cyan-400 transition">
                  <FaTwitter size={22} />
                </a>
                <a href="https://linkedin.com" className="hover:text-cyan-400 transition">
                  <FaLinkedinIn size={22} />
                </a>
              </div>
            </div>

            {/* RIGHT */}
            <div className="space-y-2 md:text-right">
              <p className="text-xl font-semibold text-white">
                victorochukwu@gmail.com
              </p>
              <p className="text-xl font-semibold text-white">
                405-762-2556
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      <p className="text-center text-xs text-slate-500">
        © 2025 Victor Chukwu
      </p>
    </div>
  );
}


// import Image from "next/image";
// import Reveal from "../../components/Reveal";
// import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

// export const metadata = {
//   title: "About Me | Dr. Victor Chukwu",
// };

// export default function AboutPage() {
//   return (<div className="mx-auto max-w-6xl space-y-10 px-4 py-12">
    
//       {/* Hero: image + welcome text */}
//       <Reveal>
//         <section className="grid items-center gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
//           <div className="relative h-72 w-full overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 transition-transform duration-300 hover:scale-[1.01] md:h-80">
//             <Image
//               src="/images/dr-victor-chukwu.jpg"
//               alt="Dr. Victor Chukwu"
//               fill
//               className="object-cover"
//               priority
//             />
//           </div>

//           <div className="space-y-4">
//             <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
//               About Me
//             </p>
//             <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
//               Welcome
//             </h1>
//             <p className="text-sm text-slate-300 md:text-base">
//               Welcome to the official website of Dr. Victor Chukwu.
//             </p>
//             <p className="text-sm text-slate-300 md:text-base">
//               Dr. Victor Chukwu is a dynamic and multi-talented leader who
//               serves God and humanity across multiple spheres of influence. He
//               is a Pastor, Author, Advisor, Musician, Physician, and
//               Biostatistician, passionately committed to faith, excellence, and
//               purposeful living.
//             </p>
//           </div>
//         </section>
//       </Reveal>

//       {/* Journey, Ministry, Family – horizontal card layout */}
//       <section className="flex flex-col gap-8 md:flex-row">
//         <Reveal>
//           <div className="flex-1 rounded-3xl border border-slate-800 bg-slate-900 p-6 transition-colors hover:border-cyan-400/40 hover:bg-slate-800/60">
//             <h2 className="mb-3 text-lg font-semibold text-slate-50">
//               Professional Journey
//             </h2>
//             <div className="space-y-2 text-sm text-slate-300">
//               <p>
//                 Victor's journey of excellence began early. His dedication,
//                 discipline, and leadership qualities earned him the role of
//                 Senior Prefect (Student Council President) during high
//                 school—an early sign of his lifelong commitment to purposeful
//                 leadership.
//               </p>
//               <p>
//                 He pursued his medical education at the University of Port
//                 Harcourt, Nigeria, where he studied Medicine and Surgery and
//                 graduated as a physician in 2010. After several years of medical
//                 practice, his growing passion for research, public health, and
//                 population-level impact led him to the United States in 2013.
//               </p>
//               <p>
//                 In the U.S., Victor obtained a Master of Public Health (MPH) and
//                 later a Doctorate in Public Health (DrPH) with specialization in
//                 Biostatistics. His expertise has contributed significantly to
//                 medical research and clinical development.
//               </p>
//               <p>
//                 As a Consultant Biostatistician at Everlywell, Victor played a
//                 key role in the development of one of the pioneering at-home
//                 COVID-19 test kits, a breakthrough that impacted lives globally.
//                 He currently serves as a Clinical Biostatistician at Boehringer
//                 Ingelheim, one of the world's leading pharmaceutical
//                 companies, contributing to innovative clinical trials that shape
//                 the future of medicine.
//               </p>
//             </div>
//           </div>
//         </Reveal>

//         <Reveal delay={0.1}>
//           <div className="flex-1 rounded-3xl border border-slate-800 bg-slate-900 p-6 transition-colors hover:border-cyan-400/40 hover:bg-slate-800/60">
//             <h2 className="mb-3 text-lg font-semibold text-slate-50">
//               Ministry &amp; Leadership
//             </h2>
//             <div className="space-y-2 text-sm text-slate-300">
//               <p>
//                 Victor surrendered his life to Jesus Christ at the age of seven,
//                 beginning a lifelong journey of faith and service. Raised in
//                 church, he served extensively in the choir, learning to play the
//                 piano and violin, eventually directing choirs and mentoring
//                 young people in music and spiritual growth.
//               </p>
//               <p>
//                 After relocating to the United States, Victor became a pioneer
//                 in his denomination—serving as President of a Young Adult
//                 Ministry (2014–2019) and later as Regional Youth Pastor. In
//                 obedience to God's call, he founded Peace of God Ministry, an
//                 initiative committed to equipping individuals—especially young
//                 people—to live lives of peace, faith, and purpose.
//               </p>
//               <p>
//                 Through Peace of God Ministry, Victor pastors Peace of God
//                 Church, preaching weekly and inspiring believers to walk in
//                 faith, discover their God-given identity, and fulfill divine
//                 purpose. He also leads the Peace Marriage Program, mentoring and
//                 counseling couples preparing for marriage with wisdom, biblical
//                 truth, and practical insight.
//               </p>
//               <p>
//                 Victor is also an accomplished author. His books—including
//                 <em> The Spirit That Conquers</em>,
//                 <em> Making Life-Changing Decisions</em>, and
//                 <em> The Will of God</em>—have impacted many lives by offering
//                 clarity, direction, and encouragement for purposeful living.
//               </p>
//               <p>
//                 In addition to teaching and writing, he expresses his creativity
//                 through Peace Music, writing and producing songs that inspire
//                 worship, faith, and devotion.
//               </p>
//             </div>
//           </div>
//         </Reveal>

//         <Reveal delay={0.2}>
//           <div className="flex-1 rounded-3xl border border-slate-800 bg-slate-900 p-6 transition-colors hover:border-cyan-400/40 hover:bg-slate-800/60">
//             <h2 className="mb-3 text-lg font-semibold text-slate-50">
//               Family Life
//             </h2>
//             <div className="space-y-2 text-sm text-slate-300">
//               <p>
//                 Victor married his beloved wife Esther in 2014. Esther is the
//                 co-founder of Peace of God Ministry, and together they are
//                 blessed with three wonderful children: Shalom, Shiloh, and
//                 Salma.
//               </p>
//               <p>
//                 They reside in Atlanta, Georgia, where they continue to serve
//                 their community, raise their family, and live out God's purpose
//                 with joy and dedication.
//               </p>
//             </div>
//           </div>
//         </Reveal>
//       </section>

//       {/* Contact */}
//       <section className="space-y-4 text-sm text-slate-300 md:text-base">
//         <Reveal>
//           <div className="space-y-3">
//             <h2 className="text-lg font-semibold text-slate-50">Contact</h2>
//             <p>Feel free to connect with Dr. Victor Chukwu:</p>
//             <p>
//               Email:{" "}
//               <a
//                 href="mailto:victorochukwu@gmail.com"
//                 className="text-cyan-300 underline-offset-2 hover:underline"
//               >
//                 victorochukwu@gmail.com
//               </a>
//             </p>
//             <p>
//               Phone:{" "}
//               <a
//                 href="tel:14057622556"
//                 className="text-cyan-300 underline-offset-2 hover:underline"
//               >
//                 405-762-2556
//               </a>
//             </p>
//           </div>
//         </Reveal>

//         <Reveal>
//           <ul className="flex flex-wrap gap-4">
//             {[
//               {
//                 icon: <FaFacebookF />,
//                 label: "Facebook",
//                 href: "https://www.facebook.com",
//               },
//               {
//                 icon: <FaInstagram />,
//                 label: "Instagram",
//                 href: "https://www.instagram.com",
//               },
//               {
//                 icon: <FaTwitter />,
//                 label: "Twitter",
//                 href: "https://www.twitter.com",
//               },
//               {
//                 icon: <FaLinkedinIn />,
//                 label: "LinkedIn",
//                 href: "https://www.linkedin.com",
//               },
//             ].map(({ icon, label, href }) => (
//               <li key={label}>
//                 <a
//                   href={href}
//                   aria-label={label}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="group flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 text-slate-300 transition hover:border-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-300"
//                 >
//                   <span className="text-lg transition group-hover:scale-110">
//                     {icon}
//                   </span>
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </Reveal>

//         <p className="text-xs text-slate-500"> 2025 Victor Chukwu</p>
//       </section>
//     </div>
//   );
// }