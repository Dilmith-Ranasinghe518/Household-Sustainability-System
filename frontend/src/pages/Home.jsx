import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Zap,
  Recycle,
  Globe,
  Users,
  Quote,
  BadgeCheck,
  Award,
  ShieldCheck,
  Plane,
  Star,
  Leaf,
} from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  // ✅ Add as many hero images as you want (slideshow)
  const HERO_IMAGES = useMemo(
    () => [
      "https://i.pinimg.com/1200x/ea/42/7a/ea427a16cd68490ef9687dc8fd5487ce.jpg",
      "https://i.pinimg.com/736x/bd/cf/b6/bdcfb6b5440eb13f398e7c324680b861.jpg",
      // "https://your-third-image.jpg",
    ],
    []
  );

  const SLIDE_INTERVAL_MS = 4500;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!HERO_IMAGES?.length) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [HERO_IMAGES]);

  const features = [
    { icon: <Zap />, title: "Energy Tracking", desc: "Monitor your electricity and gas usage in real-time." },
    { icon: <Recycle />, title: "Waste Management", desc: "Get smart tips on composting and recycling effectively." },
    { icon: <Globe />, title: "Carbon Footprint", desc: "Calculate and offset your household emissions." },
    { icon: <Users />, title: "Community Impact", desc: "See how your neighborhood is making a difference." },
  ];

  const stats = [
    { label: "Active Households", value: "12,500+" },
    { label: "CO₂ Reduced", value: "84,200 kg" },
    { label: "Avg. Score Boost", value: "+23%" },
    { label: "Community Challenges", value: "320+" },
  ];

  // ✅ Testimonials now include avatar images (replace URLs if you want)
  const testimonials = [
    {
      name: "Nethmi Perera",
      role: "Homeowner • Colombo",
      quote:
        "Sustaincity made it easy to understand my electricity usage. We reduced our bill and feel proud about our CO₂ savings.",
      score: "Saved 18.2 kg CO₂",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
      rating: 5,
    },
    {
      name: "Ayaan Silva",
      role: "Apartment Resident • Kandy",
      quote:
        "The recycling tips are super practical. The weekly goals keep my family motivated without feeling forced.",
      score: "Recycling +35%",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      rating: 5,
    },
    {
      name: "Ishani Fernando",
      role: "Community Member • Galle",
      quote:
        "I love the community challenges! Seeing neighbors improve together makes sustainability feel fun, not stressful.",
      score: "Score 92/100",
      avatar:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
      rating: 5,
    },
  ];

  const certificates = [
    { icon: <BadgeCheck />, title: "Verified Data Insights", desc: "Track usage with clear, transparent metrics." },
    { icon: <ShieldCheck />, title: "Privacy-first Design", desc: "Your household data stays protected." },
    { icon: <Award />, title: "Sustainability Badges", desc: "Earn certificates for milestones & challenges." },
  ];

  // ✅ Extra section: simple "How it works" (nice filler + value)
  const steps = [
    {
      icon: <Leaf />,
      title: "Connect your home",
      desc: "Add your usage details and goals in minutes.",
    },
    {
      icon: <Globe />,
      title: "Track & improve",
      desc: "See your footprint, savings, and progress weekly.",
    },
    {
      icon: <Users />,
      title: "Join challenges",
      desc: "Compete with friends & neighborhoods and earn badges.",
    },
  ];

  return (
    <div className="overflow-x-hidden bg-off-white">
      <Navbar />

      {/* ✅ HERO SECTION (background slideshow, no interval text) */}
      <section className="relative min-h-screen pt-[90px]">
        {/* Background slideshow */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeIndex}
              src={HERO_IMAGES[activeIndex]}
              alt="Hero background"
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 1.0, ease: "easeInOut" }}
              draggable={false}
            />
          </AnimatePresence>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-forest-dark/75 via-forest-dark/45 to-forest-dark/15" />
          <div className="absolute -top-24 -right-24 w-[520px] h-[520px] rounded-full bg-primary-teal/20 blur-[90px]" />
          <div className="absolute -bottom-28 -left-28 w-[520px] h-[520px] rounded-full bg-warm-yellow/15 blur-[100px]" />

          {/* Slide dots */}
          <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {HERO_IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  i === activeIndex ? "w-8 bg-white" : "w-2.5 bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 min-h-[calc(100vh-90px)] flex items-center">
          <div className="max-w-[720px]">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/15 border border-white/20 text-white font-semibold text-sm uppercase tracking-wide mb-6 backdrop-blur">
                <Plane size={16} className="text-warm-yellow" />
                Welcome to Sustaincity
              </span>

              <h1 className="text-[3.6rem] leading-[1.05] mb-5 text-white font-extrabold">
                Live <span className="text-warm-yellow">Greener</span> without limits
              </h1>

              <p className="text-xl text-white/90 mb-9 leading-relaxed max-w-[640px]">
                Track energy, reduce waste, calculate carbon footprint, and join community challenges — all in one smart dashboard.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <Link
                  to="/register"
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-lg transition-all bg-warm-yellow text-forest-dark shadow-[0_12px_28px_rgba(250,204,21,0.28)] hover:bg-golden-accent hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(250,204,21,0.38)]"
                >
                  Start Free Trial
                  <ArrowRight size={20} className="transition-transform group-hover:translate-x-0.5" />
                </Link>

                <Link
                  to="/login"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-lg transition-all bg-white/10 text-white border border-white/20 backdrop-blur hover:bg-white/15 hover:-translate-y-0.5"
                >
                  View Demo
                </Link>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map((s, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl bg-white/10 border border-white/15 backdrop-blur px-4 py-4"
                  >
                    <div className="text-2xl font-extrabold text-white">{s.value}</div>
                    <div className="text-sm text-white/80 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-[110px] bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-[760px] mx-auto mb-16">
            <h2 className="text-[2.6rem] font-extrabold mb-4 text-forest-dark">
              Everything you need for a <span className="text-primary-teal">Sustainable Home</span>
            </h2>
            <p className="text-lg text-text-muted">
              Powerful tools designed to make environmental responsibility easy and rewarding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group p-10 rounded-[2rem] bg-off-white transition-all border border-transparent hover:bg-white hover:border-teal-soft-bg hover:-translate-y-2 hover:shadow-[0_18px_45px_rgba(0,0,0,0.10)]"
              >
                <div className="w-14 h-14 bg-teal-soft-bg text-primary-teal rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                  {React.cloneElement(feature.icon, { size: 28 })}
                </div>
                <h3 className="mb-4 text-xl font-extrabold text-forest-dark">{feature.title}</h3>
                <p className="text-text-muted leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ HOW IT WORKS (extra nice section) */}
      <section className="py-[105px] bg-off-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-[760px] mx-auto mb-14">
            <h2 className="text-[2.4rem] font-extrabold mb-3 text-forest-dark">
              Simple steps. <span className="text-primary-teal">Big impact.</span>
            </h2>
            <p className="text-lg text-text-muted">
              Start tracking in minutes and improve continuously.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-[2rem] bg-white border border-border p-9 shadow-sm hover:shadow-[0_18px_45px_rgba(0,0,0,0.10)] transition-all hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-2xl bg-teal-soft-bg text-primary-teal flex items-center justify-center mb-5">
                  {React.cloneElement(s.icon, { size: 22 })}
                </div>
                <h3 className="text-lg font-extrabold text-forest-dark mb-2">{s.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATES / TRUST */}
      <section className="py-[100px] bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-teal-soft-bg text-forest-dark font-semibold text-sm mb-5">
                Trust & Recognition
              </span>

              <h2 className="text-[2.5rem] leading-tight font-extrabold text-forest-dark mb-4">
                Earn <span className="text-primary-teal">Certificates</span> for real progress
              </h2>

              <p className="text-lg text-text-muted leading-relaxed mb-8">
                Complete challenges, improve your sustainability score, and unlock certificates you can proudly share.
              </p>

              <div className="flex flex-wrap gap-4">
                {["Monthly Eco Badge", "Energy Saver Certificate", "Community Champion"].map((b, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-full bg-off-white border border-border text-forest-dark font-semibold shadow-sm"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {certificates.map((c, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="rounded-[2rem] bg-off-white border border-border p-8 shadow-sm hover:shadow-[0_18px_45px_rgba(0,0,0,0.10)] transition-all hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-2xl bg-teal-soft-bg text-primary-teal flex items-center justify-center mb-5">
                    {React.cloneElement(c.icon, { size: 22 })}
                  </div>
                  <h3 className="text-lg font-extrabold text-forest-dark mb-2">{c.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{c.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ✅ CUSTOMER FEEDBACK (with avatars + rating) */}
      <section className="py-[110px] bg-off-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-[760px] mx-auto mb-16">
            <h2 className="text-[2.6rem] font-extrabold mb-4 text-forest-dark">
              Loved by households improving <span className="text-primary-teal">every week</span>
            </h2>
            <p className="text-lg text-text-muted">
              Real feedback from people using Sustaincity to reduce waste and emissions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="rounded-[2rem] border border-border bg-white p-8 shadow-sm hover:shadow-[0_18px_45px_rgba(0,0,0,0.10)] transition-all hover:-translate-y-1"
              >
                {/* Top header with avatar */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden border border-border shadow-sm">
                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1">
                    <div className="font-extrabold text-forest-dark leading-tight">{t.name}</div>
                    <div className="text-sm text-text-muted">{t.role}</div>

                    {/* rating */}
                    <div className="flex items-center gap-1 mt-2">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} size={16} className="text-warm-yellow fill-warm-yellow" />
                      ))}
                    </div>
                  </div>

                  <div className="w-11 h-11 rounded-2xl bg-teal-soft-bg text-primary-teal flex items-center justify-center">
                    <Quote size={20} />
                  </div>
                </div>

                <p className="text-forest-dark leading-relaxed mb-7">“{t.quote}”</p>

                <div className="pt-5 border-t border-border flex items-center justify-between gap-4">
                  <span className="px-4 py-2 rounded-full bg-off-white border border-border text-forest-dark font-semibold text-sm">
                    {t.score}
                  </span>

                  <span className="text-sm text-text-muted">
                    Verified feedback
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[110px] bg-off-white">
        <div className="container mx-auto px-6">
          <div className="relative overflow-hidden bg-gradient-to-br from-forest-dark to-deep-eco py-20 px-8 rounded-[2.2rem] text-center text-white shadow-[0_25px_60px_rgba(0,0,0,0.18)] border border-white/10">
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary-teal/25 blur-[70px]" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-warm-yellow/20 blur-[70px]" />

            <h2 className="text-white text-5xl font-extrabold mb-6">Ready to make an impact?</h2>
            <p className="text-xl mb-10 opacity-90 max-w-[680px] mx-auto leading-relaxed">
              Join thousands of households making the world better—one small step at a time.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/register"
                className="inline-flex items-center gap-3 px-9 py-4 rounded-full font-semibold text-lg transition-all bg-warm-yellow text-forest-dark shadow-[0_10px_25px_rgba(250,204,21,0.28)] hover:bg-golden-accent hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(250,204,21,0.40)]"
              >
                Join the Community <ArrowRight size={20} />
              </Link>

              <Link
                to="/login"
                className="inline-flex items-center gap-3 px-9 py-4 rounded-full font-semibold text-lg transition-all bg-white/10 border border-white/20 text-white hover:bg-white/15 hover:-translate-y-0.5"
              >
                Explore Dashboard
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-3 opacity-95">
              {["No credit card", "Cancel anytime", "Fast setup"].map((x, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-full bg-white/10 border border-white/15 text-sm font-semibold"
                >
                  {x}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
