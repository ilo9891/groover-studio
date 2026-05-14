import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { CalendarDays, ChevronDown, ChevronLeft, ChevronRight, Headphones, Music2, Radio, SlidersHorizontal, X } from "lucide-react";
import "./styles.css";

const djImages = {
  booth: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1600&q=88&sat=-90",
  cdj: "https://images.unsplash.com/photo-1516873240891-4bf014598ab4?auto=format&fit=crop&w=1600&q=88&sat=-95",
  mixer: "https://images.unsplash.com/photo-1571266028243-d220c6a7edbf?auto=format&fit=crop&w=1600&q=88&sat=-95",
  decks: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1600&q=88&sat=-95",
  setup: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1600&q=88&sat=-92"
};

const services = [
  {
    title: "DJ პრაქტიკის ოთახი",
    text: "დაჯავშნე დრო და ივარჯიშე პროფესიონალურად მოწყობილ DJ სივრცეში. Groover Studio გაძლევს მშვიდ, ზუსტ და კომფორტულ გარემოს, სადაც შეგიძლია დახვეწო ტექნიკა, გადასვლები და შენი სეტი.",
    image: djImages.cdj,
    icon: Music2
  },
  {
    title: "ჩაწერე შენი სეტი",
    text: "ჩაიწერე შენი DJ სეტი ხარისხიანი ხმით და გამართული ტექნიკით. იდეალურია პორტფოლიოსთვის, სოციალურ ქსელებში გასაზიარებლად ან საკუთარი პროგრესის შესაფასებლად.",
    image: djImages.mixer,
    icon: Radio
  },
  {
    title: "ინდივიდუალური ტრენინგი",
    text: "ინდივიდუალური ტრენინგი შენს დონესა და მიზნებზე მორგებით. ვიმუშავებთ ტექნიკაზე, სეტის აწყობაზე, მიქსინგზე და იმ დეტალებზე, რომლებიც რეალურად ცვლის შესრულების ხარისხს.",
    image: djImages.decks,
    icon: Headphones
  },
  {
    title: "პროფესიონალური აპარატურა",
    text: "ტექნიკურად გამართული სივრცე სანდო ხმით და პროფესიონალური აპარატურით. ყველაფერი მზად არის იმისთვის, რომ კონცენტრირდე მუსიკაზე და მიიღო რეალური პრაქტიკული გამოცდილება.",
    image: djImages.booth,
    icon: SlidersHorizontal
  }
];

const equipment = [
  "2x CDJ 3000",
  "2x CDJ 2000 NXS2",
  "Allen & Heath Xone 96",
  "Sennheiser HD25",
  "2x DAS Audio Vantec 15A (Tops)",
  "2x DAS Audio Vantec 18A (Subs)"
];

const faqs = [
  ["როგორ დავჯავშნო დრო?", "დაგვიკავშირდი ტელეფონით ან სოციალური ქსელით. შევარჩევთ თავისუფალ დროს და დაგიდასტურებთ სესიას."],
  ["შეიძლება სეტის ჩაწერა?", "დიახ. სტუდიაში შეგიძლია ჩაწერო DJ სეტი სუფთა აუდიო სიგნალით, შემდეგ კი გამოიყენო პორტფოლიოსთვის ან კონტენტისთვის."],
  ["კურსი დამწყებისთვისაც არის?", "კი. ინდივიდუალური ტრენინგი იწყება შენი ამჟამინდელი დონიდან და ეტაპობრივად გადადის პრაქტიკულ, კლუბისთვის საჭირო უნარებზე."],
  ["ჩემი USB უნდა მოვიტანო?", "სასურველია მოიტანო შენი USB ან მუსიკალური ბიბლიოთეკა. საჭიროების შემთხვევაში დაგეხმარებით სწორ მომზადებაში."],
  ["სად მდებარეობს სტუდია?", "Groover Studio მდებარეობს მისამართზე: 9 Sulkhan Tsintsadze St."]
];

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 1.18, ease: [0.16, 1, 0.3, 1] } }
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.16
    }
  }
};

function Button({ children, href = "#contact", className = "" }) {
  const openBooking = (event) => {
    event.preventDefault();
    window.dispatchEvent(new CustomEvent("open-booking"));
  };

  return (
    <motion.a
      href={href}
      onClick={openBooking}
      whileHover={{ scale: 1.025 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-white/80 bg-gradient-to-b from-white to-[#cfcfcf] px-7 py-4 text-sm font800 text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_18px_46px_rgba(255,255,255,0.08)] transition-all duration-500 hover:border-white hover:from-white hover:to-white ${className}`}
    >
      <CalendarDays size={17} />
      {children}
    </motion.a>
  );
}

function SectionIntro({ eyebrow, title, text }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-120px" }}
      className="mx-auto mb-12 max-w-3xl text-center md:mb-16"
    >
      <div className="mx-auto mb-8 h-px w-12 bg-white/70" />
      <p className="mb-4 text-xs font800 uppercase tracking-[0.28em] text-white/[0.45]">{eyebrow}</p>
      <h2 className="chrome-text text-balance text-4xl font900 uppercase leading-[0.94] md:text-6xl">{title}</h2>
      {text && <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-studio-muted md:text-lg">{text}</p>}
    </motion.div>
  );
}

function Navbar() {
  const links = [["სერვისები", "#services"], ["ჩვენ შესახებ", "#about"], ["აპარატურა", "#equipment"], ["FAQ", "#faq"]];
  const openBooking = (event) => {
    event.preventDefault();
    window.dispatchEvent(new CustomEvent("open-booking"));
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 md:px-8">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-black/[0.45] px-4 py-3 shadow-2xl backdrop-blur-xl md:px-5">
        <a href="#hero" className="flex items-center gap-2 text-sm font900 uppercase tracking-tight text-white">
          <span className="flex h-5 items-end gap-[2px]" aria-hidden="true">
            {[9, 15, 7, 18].map((h, i) => <span key={i} style={{ height: h }} className="w-[3px] rounded-full bg-white" />)}
          </span>
          Groover
        </a>
        <div className="hidden items-center gap-8 text-sm font700 text-white/50 md:flex">
          {links.map(([label, href]) => <a key={label} className="transition-colors duration-300 hover:text-white" href={href}>{label}</a>)}
        </div>
        <a href="#contact" onClick={openBooking} className="rounded-full border border-white/[0.15] px-5 py-3 text-sm font800 text-white/80 transition-all duration-300 hover:border-white/[0.45] hover:bg-white/10 hover:text-white">
          დაჯავშნა
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="hero" className="relative isolate flex min-h-screen items-center overflow-hidden px-5 pb-10 pt-28">
      <div className="absolute inset-0 -z-30 bg-[#030303]" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_4%,rgba(255,255,255,0.12),transparent_28%),radial-gradient(circle_at_50%_46%,rgba(255,255,255,0.07),transparent_34%),linear-gradient(180deg,#151515_0%,#050505_54%,#000_100%)]" />
      <div className="waveform-bg absolute inset-0 -z-10 opacity-[0.18]" />
      <div className="mx-auto max-w-6xl text-center">
        <h1 className="chrome-text mx-auto max-w-4xl text-[14vw] font900 uppercase leading-[0.82] tracking-0 sm:text-[11vw] lg:text-[104px]">
          <span className="block">GROOVER</span>
          <span className="block">STUDIO</span>
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-studio-muted md:text-xl">
          ივარჯიშე, ჩაიწერე სეტი ან გაიარე DJ კურსი პროფესიონალურად მოწყობილ სივრცეში.
        </p>
        <div className="mt-10">
          <Button>დაჯავშნა</Button>
        </div>
        <HeroWave />
      </div>
    </section>
  );
}

function HeroWave() {
  const bars = [38, 54, 42, 72, 48, 88, 36, 64, 78, 46, 70, 52, 92, 44, 68, 82, 50, 74, 40, 86, 56, 76, 45, 66, 51, 84, 43, 60];
  return (
    <div className="mx-auto mt-20 flex max-w-5xl items-center justify-center gap-2 px-2 md:mt-24 md:gap-3">
      {bars.map((height, i) => (
        <motion.span
          key={i}
          animate={{ scaleY: [0.74, 0.96, 0.82, 1], opacity: [0.2, 0.44, 0.3, 0.38] }}
          transition={{ duration: 6.8 + (i % 7) * 0.22, repeat: Infinity, ease: "easeInOut", delay: i * 0.075 }}
          className="origin-center rounded-full bg-gradient-to-b from-white/65 via-white/[0.28] to-white/[0.08] shadow-[0_0_24px_rgba(255,255,255,0.06)]"
          style={{ height, width: "clamp(5px, 0.75vw, 8px)" }}
        />
      ))}
    </div>
  );
}

function ServiceCardShell({ service, index, total, progress }) {
  const Icon = service.icon;
  const segment = 1 / total;
  const start = index * segment;
  const enterEnd = start + segment * 0.35;
  const holdEnd = start + segment * 0.65;
  const exitEnd = start + segment;
  const previousHoldEnd = Math.max(0, start - segment * 0.35);
  const previousExitEnd = Math.max(0, start);
  const olderLift = -28 * Math.max(total - index - 1, 0);

  const y = index === 0
    ? useTransform(progress, [0, holdEnd, exitEnd, 1], ["0px", "0px", "-32px", `${olderLift}px`])
    : useTransform(progress, [0, previousHoldEnd, start, enterEnd, holdEnd, exitEnd, 1], ["110vh", "110vh", "110vh", "0px", "0px", "-32px", `${olderLift}px`]);

  const scale = index === 0
    ? useTransform(progress, [0, holdEnd, exitEnd, 1], [1, 1, 0.97, 0.94])
    : useTransform(progress, [0, previousHoldEnd, start, enterEnd, holdEnd, exitEnd, 1], [1, 1, 1, 1, 1, 0.97, 0.94]);

  return (
    <motion.article
      className="service-scroll-card group grid overflow-hidden rounded-[34px] border border-white/[0.08] bg-[#151515] shadow-chrome transition-colors duration-500 hover:border-white/20 md:grid-cols-[0.92fr_1.08fr]"
      style={{ zIndex: 20 + index, y, scale, opacity: 1 }}
    >
        <div className="service-card-copy relative flex flex-col justify-center">
        <div className="absolute inset-0 bg-[#151515]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.06),transparent_32%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
          <div className="relative">
            <div className="mb-9 h-px w-14 bg-white/70" />
            <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.05] text-white">
              <Icon size={22} />
            </div>
            <h3 className="text-3xl font900 uppercase leading-none text-white md:text-5xl">{service.title}</h3>
            <p className="mt-6 max-w-xl text-sm leading-7 text-studio-muted lg:text-base">{service.text}</p>
            <div className="mt-9">
              <Button href="#contact">დაჯავშნა</Button>
            </div>
          </div>
        </div>
      <div className="service-card-image group/image relative min-h-[320px] overflow-hidden rounded-[28px] bg-black md:m-5 md:min-h-0">
          <img src={service.image} alt={service.title} className="h-full w-full object-cover grayscale transition-transform duration-[2600ms] ease-out group-hover/image:scale-[1.035]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/[0.35]" />
          <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
        </div>
    </motion.article>
  );
}

function MobileServiceCard({ service }) {
  const Icon = service.icon;
  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="grid overflow-hidden rounded-[30px] border border-white/[0.08] bg-[#151515] shadow-chrome"
    >
      <div className="p-8">
        <div className="mb-8 h-px w-14 bg-white/70" />
        <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.05] text-white">
          <Icon size={22} />
        </div>
        <h3 className="text-3xl font900 uppercase leading-none text-white">{service.title}</h3>
        <p className="mt-6 text-base leading-8 text-studio-muted">{service.text}</p>
      </div>
      <div className="min-h-[300px] overflow-hidden bg-black">
        <img src={service.image} alt={service.title} className="h-full w-full object-cover grayscale" />
      </div>
    </motion.article>
  );
}

function Services() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 42,
    damping: 34,
    mass: 1.15
  });

  return (
    <section id="services" className="relative px-5 pt-24 md:px-5 md:pt-0">
      <div className="absolute inset-x-0 top-10 -z-10 h-[520px] bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_45%)]" />
      <div className="mx-auto max-w-6xl pb-10 md:hidden">
        <SectionIntro eyebrow="სერვისები" title="რას გთავაზობთ" text="DJ პრაქტიკა, სეტის ჩაწერა, ტრენინგი და პროფესიონალური setup ერთ სივრცეში." />
      </div>
      <div ref={sectionRef} className="services-scroll-stage relative mx-auto max-w-6xl">
        <div className="services-sticky-viewport">
          <div className="services-sticky-heading hidden md:block">
            <div className="mx-auto mb-5 h-px w-12 bg-white/70" />
            <p className="mb-4 text-xs font800 uppercase tracking-[0.28em] text-white/[0.45]">სერვისები</p>
            <h2 className="chrome-text text-balance text-4xl font900 uppercase leading-[0.94] md:text-6xl">რას გთავაზობთ</h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-studio-muted md:text-lg">DJ პრაქტიკა, სეტის ჩაწერა, ტრენინგი და პროფესიონალური setup ერთ სივრცეში.</p>
          </div>
          <div className="services-card-layer">
            {services.map((service, index) => (
              <ServiceCardShell
                key={service.title}
                service={service}
                index={index}
                total={services.length}
                progress={smoothProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  const points = [
    ["1", "ფოკუსი", "მინიმალური, მშვიდი გარემო, სადაც მთელი ყურადღება მუსიკაზე, მიქსზე და მოძრაობაზე გადადის."],
    ["2", "კონტროლი", "სივრცე გაძლევს რეალურ კონტროლს ხმაზე, ტრანზიციებზე და სეტის ენერგიაზე."],
    ["3", "პრაქტიკა", "ყოველი სესია პრაქტიკულია: მუშაობ ტექნიკაზე, timing-ზე და იმ დეტალებზე, რომლებიც სცენაზე იგრძნობა."],
    ["4", "ხმა", "ხმა არის სუფთა, ძლიერი და გასაგები, რომ სწორად გაიგო რას აკეთებს შენი მიქსი."]
  ];
  return (
    <section id="about" className="px-5 py-24 md:py-32">
      <SectionIntro eyebrow="ჩვენ შესახებ" title="პრაქტიკისთვის შექმნილი სივრცე" />
      <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1fr_420px_1fr]">
        <div className="grid gap-8">{points.slice(0, 2).map(([num, title, text]) => <InfoBlock key={title} num={num} title={title} text={text} />)}</div>
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="group mx-auto w-full max-w-[420px] overflow-hidden rounded-[30px] border border-white/10 bg-studio-panel shadow-chrome">
          <img className="aspect-[4/5] w-full object-cover grayscale transition-transform duration-[2400ms] group-hover:scale-[1.035]" src={djImages.booth} alt="Dark DJ booth" />
        </motion.div>
        <div className="grid gap-8">{points.slice(2).map(([num, title, text]) => <InfoBlock key={title} num={num} title={title} text={text} />)}</div>
      </div>
    </section>
  );
}

function InfoBlock({ num, title, text }) {
  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="text-center lg:text-left">
      <p className="text-8xl font900 leading-none text-white/[0.07]">{num}</p>
      <h3 className="-mt-8 text-3xl font900 uppercase text-white">{title}</h3>
      <p className="mt-6 text-base leading-8 text-studio-muted">{text}</p>
    </motion.div>
  );
}

function Equipment() {
  return (
    <section id="equipment" className="px-5 py-24 md:py-32">
      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mx-auto grid max-w-6xl overflow-hidden rounded-[34px] border border-white/10 bg-[#141414] shadow-chrome lg:grid-cols-[0.95fr_1.05fr]">
        <div className="group min-h-[390px] overflow-hidden bg-black">
          <img className="h-full w-full object-cover grayscale transition-transform duration-[2400ms] group-hover:scale-[1.035]" src={djImages.mixer} alt="DJ mixer and player setup" />
        </div>
        <div className="p-8 md:p-14 lg:p-16">
          <div className="mb-8 h-px w-14 bg-white/70" />
          <p className="mb-4 text-xs font800 uppercase tracking-[0.28em] text-white/[0.45]">აპარატურა</p>
          <h2 className="chrome-text text-4xl font900 uppercase leading-none md:text-6xl">Technical Setup</h2>
          <p className="mt-7 text-lg leading-8 text-studio-muted">პროფესიონალური DJ setup პრაქტიკისთვის, ჩაწერისთვის და ინდივიდუალური სესიებისთვის.</p>
          <div className="mt-9 grid gap-3 sm:grid-cols-2">
            {equipment.map((item) => (
              <motion.div whileHover={{ y: -3, borderColor: "rgba(255,255,255,0.22)" }} key={item} className="rounded-2xl border border-white/[0.08] bg-black/25 px-5 py-4 text-sm font800 text-white/[0.82] transition-colors duration-300">
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div layout className="overflow-hidden rounded-2xl border border-white/[0.06] bg-[#151515]">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between gap-4 px-5 py-6 text-left text-base font900 uppercase text-white md:px-7">
        {question}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.46, ease: [0.16, 1, 0.3, 1] }} className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/[0.12]">
          <ChevronDown size={18} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}>
            <p className="px-5 pb-6 text-base leading-8 text-studio-muted md:px-7">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function FAQ() {
  return (
    <section id="faq" className="px-5 py-24 md:py-32">
      <SectionIntro eyebrow="FAQ" title="გაქვს კითხვები?" />
      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mx-auto grid max-w-3xl gap-3">
        {faqs.map(([q, a]) => <FAQItem key={q} question={q} answer={a} />)}
      </motion.div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative isolate overflow-hidden px-5 py-28 md:py-44">
      <div className="absolute inset-0 -z-20 bg-[#020202]" />
      <div className="cta-spotlight absolute inset-0 -z-10" />
      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mx-auto max-w-3xl text-center">
        <div className="mx-auto mb-8 h-px w-12 bg-white/70" />
        <h2 className="chrome-text text-5xl font900 uppercase leading-none md:text-7xl">დაჯავშნე შენი შემდეგი სესია</h2>
        <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-studio-muted">დაჯავშნე დრო და გამოიყენე პროფესიონალურად მოწყობილი DJ სივრცე პრაქტიკისთვის, სეტის ჩასაწერად ან ინდივიდუალური ტრენინგისთვის.</p>
        <div className="mt-10">
          <Button>დაჯავშნა</Button>
        </div>
        <div className="mx-auto mt-12 grid max-w-xl gap-3 text-sm font800 text-white/[0.62] sm:grid-cols-2">
          <a href="https://maps.google.com/?q=9%20Sulkhan%20Tsintsadze%20St" className="rounded-2xl border border-white/[0.08] bg-white/[0.04] px-5 py-4 transition-colors hover:text-white">9 Sulkhan Tsintsadze St.</a>
          <a href="tel:+995598980723" className="rounded-2xl border border-white/[0.08] bg-white/[0.04] px-5 py-4 transition-colors hover:text-white">+995 598 98 07 23</a>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/[0.08] px-5 py-14">
      <div className="mx-auto grid max-w-6xl gap-10 text-sm text-studio-muted md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="mb-5 flex items-center gap-2 text-lg font900 uppercase text-white">
            <span className="flex h-5 items-end gap-[2px]" aria-hidden="true">
              {[9, 15, 7, 18].map((h, i) => <span key={i} style={{ height: h }} className="w-[3px] rounded-full bg-white" />)}
            </span>
            Groover Studio
          </p>
          <p className="max-w-sm leading-7">პრემიუმ DJ პრაქტიკის ოთახი, სეტის ჩაწერა, ინდივიდუალური ტრენინგი და პროფესიონალური საკლუბო აპარატურა.</p>
        </div>
        <div className="grid gap-3">
          <p className="font800 text-white">კონტაქტი</p>
          <a href="https://maps.google.com/?q=9%20Sulkhan%20Tsintsadze%20St" className="hover:text-white">9 Sulkhan Tsintsadze St.</a>
          <a href="tel:+995598980723" className="hover:text-white">+995 598 98 07 23</a>
        </div>
        <div className="grid content-start gap-4">
          <p className="font800 text-white">სოციალური ქსელები</p>
          <div className="flex gap-3">
            <a href="#contact" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-xs font900 text-white/70 transition-colors hover:border-white/[0.35] hover:text-white">IG</a>
            <a href="#contact" aria-label="YouTube" className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-xs font900 text-white/70 transition-colors hover:border-white/[0.35] hover:text-white">YT</a>
            <a href="#contact" aria-label="Music" className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white/70 transition-colors hover:border-white/[0.35] hover:text-white"><Music2 size={17} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

const bookingDays = Array.from({ length: 31 }, (_, index) => index + 1);
const bookingTimes = ["15:00-16:00", "16:00-17:00", "17:00-18:00", "18:00-19:00", "19:00-20:00", "20:00-21:00", "21:00-22:00"];
const weekDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

function BookingModal({ open, onClose }) {
  const [step, setStep] = useState("calendar");
  const [selectedDay, setSelectedDay] = useState(13);
  const [selectedTime, setSelectedTime] = useState(bookingTimes[2]);
  const [form, setForm] = useState({ name: "", phone: "", service: "DJ Practice Room", comment: "" });

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setStep("calendar");
      setSelectedDay(13);
      setSelectedTime(bookingTimes[2]);
    }
  }, [open]);

  const updateForm = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-y-auto bg-black/[0.92] px-4 py-5 backdrop-blur-sm md:px-8 md:py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative mx-auto min-h-[calc(100vh-40px)] max-w-5xl rounded-[34px] border border-white/[0.1] bg-[#0b0b0b] p-4 shadow-[0_40px_140px_rgba(0,0,0,0.72)] md:min-h-0 md:p-6"
            initial={{ y: 28, scale: 0.985 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 18, scale: 0.985 }}
            transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close booking modal"
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.05] text-white/70 transition-colors hover:border-white/30 hover:text-white"
            >
              <X size={18} />
            </button>

            {step === "calendar" && (
              <div className="grid gap-5 md:grid-cols-[1fr_360px]">
                <div className="rounded-[28px] border border-white/[0.08] bg-[#121212] p-5 md:p-7">
                  <div className="mb-7 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font800 uppercase tracking-[0.24em] text-white/42">DJ Studio</p>
                      <h2 className="mt-2 text-3xl font900 uppercase text-white md:text-5xl">MAY 2026</h2>
                    </div>
                    <div className="flex gap-2">
                      <button className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/70"><ChevronLeft size={18} /></button>
                      <button className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/70"><ChevronRight size={18} /></button>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-2 text-center text-[11px] font900 text-white/42">
                    {weekDays.map((day) => <div key={day}>{day}</div>)}
                  </div>
                  <div className="mt-3 grid grid-cols-7 gap-2">
                    {Array.from({ length: 4 }).map((_, index) => <div key={`blank-${index}`} />)}
                    {bookingDays.map((day) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => setSelectedDay(day)}
                        className={`aspect-square rounded-2xl border text-sm font900 transition-all duration-300 ${
                          selectedDay === day
                            ? "border-white bg-white text-black shadow-[0_0_40px_rgba(255,255,255,0.18)]"
                            : "border-white/[0.07] bg-white/[0.035] text-white/70 hover:border-white/25 hover:text-white"
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-[28px] border border-white/[0.08] bg-[#101010] p-5 md:p-7">
                  <p className="text-xs font900 uppercase tracking-[0.24em] text-white/42">Available Times</p>
                  <h3 className="mt-2 text-2xl font900 text-white">May {selectedDay}</h3>
                  <div className="mt-6 grid gap-2">
                    {bookingTimes.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`rounded-2xl border px-4 py-3 text-left text-sm font800 transition-all duration-300 ${
                          selectedTime === time
                            ? "border-white bg-white text-black"
                            : "border-white/[0.08] bg-white/[0.035] text-white/72 hover:border-white/25 hover:text-white"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                  <div className="mt-6 rounded-2xl border border-white/[0.08] bg-black/30 p-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/55">Booking Price</span>
                      <span className="font900 text-white">0 GEL</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep("form")}
                    className="mt-5 w-full rounded-full bg-white px-6 py-4 text-sm font900 text-black transition-transform hover:scale-[1.015]"
                  >
                    Next
                  </button>
                  <p className="mt-5 text-xs leading-6 text-white/42">You can cancel or update your visual preview booking before confirmation. No payment is processed.</p>
                </div>
              </div>
            )}

            {step === "form" && (
              <form
                className="mx-auto max-w-2xl rounded-[28px] border border-white/[0.08] bg-[#121212] p-5 md:p-8"
                onSubmit={(event) => {
                  event.preventDefault();
                  setStep("success");
                }}
              >
                <p className="text-sm font800 uppercase tracking-[0.24em] text-white/42">DJ Studio</p>
                <h2 className="mt-2 text-3xl font900 uppercase text-white">Booking Details</h2>
                <p className="mt-3 text-sm text-white/55">May {selectedDay}, 2026 • {selectedTime} • 0 GEL</p>
                <div className="mt-7 grid gap-4">
                  <input value={form.name} onChange={(event) => updateForm("name", event.target.value)} placeholder="Name" className="rounded-2xl border border-white/[0.08] bg-black/30 px-5 py-4 text-white outline-none transition-colors placeholder:text-white/35 focus:border-white/35" />
                  <input value={form.phone} onChange={(event) => updateForm("phone", event.target.value)} placeholder="Phone" className="rounded-2xl border border-white/[0.08] bg-black/30 px-5 py-4 text-white outline-none transition-colors placeholder:text-white/35 focus:border-white/35" />
                  <select value={form.service} onChange={(event) => updateForm("service", event.target.value)} className="rounded-2xl border border-white/[0.08] bg-black/30 px-5 py-4 text-white outline-none transition-colors focus:border-white/35">
                    {services.map((service) => <option key={service.title}>{service.title}</option>)}
                  </select>
                  <textarea value={form.comment} onChange={(event) => updateForm("comment", event.target.value)} placeholder="Comment" rows={4} className="resize-none rounded-2xl border border-white/[0.08] bg-black/30 px-5 py-4 text-white outline-none transition-colors placeholder:text-white/35 focus:border-white/35" />
                </div>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <button type="button" onClick={() => setStep("calendar")} className="rounded-full border border-white/10 px-6 py-4 text-sm font900 text-white/70 transition-colors hover:border-white/30 hover:text-white">Back</button>
                  <button type="submit" className="rounded-full bg-white px-6 py-4 text-sm font900 text-black transition-transform hover:scale-[1.015] sm:flex-1">Submit</button>
                </div>
              </form>
            )}

            {step === "success" && (
              <div className="mx-auto grid min-h-[420px] max-w-2xl place-items-center rounded-[28px] border border-white/[0.08] bg-[#121212] p-8 text-center">
                <div>
                  <div className="mx-auto mb-7 grid h-16 w-16 place-items-center rounded-full bg-white text-black"><CalendarDays size={26} /></div>
                  <h2 className="text-3xl font900 uppercase text-white">Booked</h2>
                  <p className="mt-4 text-lg leading-8 text-white/70">თქვენი ჯავშანი მიღებულია. მალე დაგიკავშირდებით.</p>
                  <button type="button" onClick={onClose} className="mt-8 rounded-full bg-white px-8 py-4 text-sm font900 text-black transition-transform hover:scale-[1.015]">Close</button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function App() {
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    const openBooking = () => setBookingOpen(true);
    window.addEventListener("open-booking", openBooking);
    return () => window.removeEventListener("open-booking", openBooking);
  }, []);

  return (
    <>
      <main className="min-h-screen bg-studio-black text-white">
        <Navbar />
        <Hero />
        <Services />
        <About />
        <Equipment />
        <FAQ />
        <Contact />
        <Footer />
      </main>
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}

const rootElement = document.getElementById("root");
const root = window.__grooverRoot ?? createRoot(rootElement);
window.__grooverRoot = root;
root.render(<App />);
