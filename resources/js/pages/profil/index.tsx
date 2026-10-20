import { Head, Link } from '@inertiajs/react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import {
    MessageCircle, ArrowLeft, Shield, Truck, Stethoscope, Sparkles,
    Eye, Target, Award, Users, Building2, CheckCircle, HeartHandshake, Gem
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Navbar from '@/Components/Navbar';

function GrainOverlay() {
    return <div className="grain-overlay hidden md:block" />;
}

function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
    return <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#c9a961] to-[#059669] origin-left z-50" style={{ scaleX }} />;
}

function AnimatedCounter({ end, suffix = '', duration = 2 }: { end: number; suffix?: string; duration?: number }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) setIsVisible(true);
        }, { threshold: 0.5 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;
        let startTime: number;
        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }, [isVisible, end, duration]);

    return <div ref={ref}>{count}{suffix}</div>;
}

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-100, 100], [5, -5]), { stiffness: 100, damping: 30 });
    const rotateY = useSpring(useTransform(x, [-100, 100], [-5, 5]), { stiffness: 100, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set(e.clientX - (rect.left + rect.width / 2));
        y.set(e.clientY - (rect.top + rect.height / 2));
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// ==========================================
// PAGE HERO
// ==========================================
function PageHero() {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 100]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-[#1a3d2e] pt-20">
            <motion.div style={{ y: y1, opacity }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] md:text-[30rem] font-serif text-white/[0.03] select-none pointer-events-none">
                道
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#1a3d2e] to-[#0f2419]" />
            <motion.div className="animate-float-slow absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-[#c9a961]/10 to-transparent blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center w-full">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="inline-flex items-center gap-2 mb-6">
                    <Link href="/" className="text-[#c9a961] hover:text-[#faf8f3] transition-colors flex items-center gap-2 text-sm font-semibold">
                        <ArrowLeft className="w-4 h-4" /> Kembali ke Home
                    </Link>
                    <span className="text-[#c9a961]/30">•</span>
                    <span className="text-xs tracking-[0.3em] uppercase text-[#c9a961]">Tentang Kami · 关于我们</span>
                </motion.div>

                <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="font-serif text-4xl md:text-6xl lg:text-7xl text-[#faf8f3] mb-6 leading-tight" style={{ fontFamily: '"Playfair Display", serif' }}>
                    Perjalanan Kami dalam <span className="italic text-[#c9a961]">Pengobatan Traditional Tiongkok</span>
                </motion.h1>

                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-base md:text-xl text-[#faf8f3]/70 max-w-3xl mx-auto">
                    TCM Padang hadir untuk mendampingi pemulihan orang terkasih Anda dengan produk 100% original dan pendampingan praktisi berpengalaman.
                </motion.p>
            </div>
        </section>
    );
}

// ==========================================
// STORY SECTION
// ==========================================
function StorySection() {
    return (
        <section className="bg-[#faf8f3] py-20 md:py-32 overflow-x-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="relative">
                        <div className="aspect-[4/5] rounded-2xl overflow-hidden relative bg-[#2d5a47]">
                            <motion.img src="/images/bangunan_tcm.jpeg" alt="Klinik TCM Padang" className="w-full h-full object-cover" whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                            <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#c9a961]/60" />
                            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#c9a961]/60" />
                        </div>
                        <motion.div initial={{ opacity: 0, scale: 0.8, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="absolute -bottom-6 -right-2 md:-right-8 bg-[#faf8f3] p-4 md:p-6 rounded-xl shadow-2xl border border-[#c9a961]/20 hidden sm:block">
                            <div className="flex items-center gap-3 mb-2">
                                <Sparkles className="w-5 h-5 text-[#c9a961]" />
                                <span className="text-xs tracking-widest uppercase text-[#c9a961] font-medium">Sejak 2010</span>
                            </div>
                            <div className="text-3xl font-serif font-bold text-[#1a3d2e]" style={{ fontFamily: '"Playfair Display", serif' }}>
                                <AnimatedCounter end={15} />+ Tahun
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
                        <div className="inline-flex items-center gap-3 mb-6">
                            <span className="w-8 h-px bg-[#c9a961]" />
                            <span className="text-xs tracking-[0.3em] uppercase text-[#c9a961] font-medium">Cerita Kami · 我们的故事</span>
                            <span className="w-8 h-px bg-[#c9a961]" />
                        </div>
                        <h2 className="font-serif text-3xl md:text-5xl text-[#1a3d2e] mb-6 leading-tight" style={{ fontFamily: '"Playfair Display", serif' }}>
                            Berawal dari Kepedulian, Tumbuh dengan <span className="italic text-[#c9a961]">Kepercayaan</span>
                        </h2>
                        <div className="space-y-4 text-sm md:text-base text-[#1a3d2e]/70 leading-relaxed">
                            <p>
                                TCM Padang berawal dari pengalaman pribadi keluarga kami dalam mendampingi pemulihan pasca-operasi dan stroke. Kami melihat langsung bagaimana Pien Tze Huang dan Angong Niuhuang Wan membantu proses pemulihan orang terkasih.
                            </p>
                            <p>
                                Namun di saat yang sama, kami juga melihat betapa banyaknya produk tiruan dan palsu yang beredar di pasaran — membahayakan pasien yang justru sedang berjuang untuk pulih.
                            </p>
                            <p>
                                Karena itu, kami berkomitmen untuk hanya menyediakan produk 100% original dengan dokumen impor resmi dan stiker hologram, disertai pendampingan konsultasi dari praktisi TCM berpengalaman.
                            </p>
                        </div>
                        <motion.blockquote initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="mt-8 p-6 bg-[#1a3d2e] rounded-2xl border-l-4 border-[#c9a961]">
                            <p className="text-[#faf8f3] font-serif italic text-base md:text-lg leading-relaxed" style={{ fontFamily: '"Playfair Display", serif' }}>
                                "Kami tidak hanya menjual produk — kami mendampingi pemulihan orang terkasih Anda."
                            </p>
                            <footer className="mt-3 text-[#c9a961] text-sm font-medium">— Jul priandi, Founder</footer>
                        </motion.blockquote>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// ==========================================
// STATS SECTION
// ==========================================
function StatsSection() {
    const stats = [
        { icon: Award, end: 15, suffix: '+', label: 'Tahun Pengalaman' },
        { icon: Users, end: 1000, suffix: '+', label: 'Keluarga Terbantu' },
        { icon: Building2, end: 10, suffix: '+', label: 'Rumah Sakit Partner' },
        { icon: Shield, end: 100, suffix: '%', label: 'Produk Original' }
    ];

    return (
        <section className="bg-[#1a3d2e] py-16 md:py-24 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-serif text-white/[0.02] select-none pointer-events-none" style={{ fontFamily: '"Playfair Display", serif' }}>
                信
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {stats.map((stat, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center p-4 md:p-6">
                            <motion.div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 rounded-full bg-[#c9a961]/10 flex items-center justify-center border border-[#c9a961]/20" whileHover={{ scale: 1.15, rotate: 10 }} transition={{ duration: 0.4 }}>
                                <stat.icon className="w-6 h-6 md:w-7 md:h-7 text-[#c9a961]" />
                            </motion.div>
                            <div className="text-3xl md:text-5xl font-serif font-bold text-[#faf8f3] mb-2" style={{ fontFamily: '"Playfair Display", serif' }}>
                                <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                            </div>
                            <p className="text-xs md:text-sm text-[#faf8f3]/60">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ==========================================
// VISI MISI SECTION
// ==========================================
function VisiMisiSection() {
    const misi = [
        'Menyediakan hanya produk 100% original ber-BPOM dengan dokumen impor resmi.',
        'Memberikan konsultasi dan pendampingan penggunaan yang tepat oleh praktisi TCM berpengalaman.',
        'Menghadirkan layanan antar cepat ke rumah sakit dan rumah pasien di seluruh area Padang.',
        'Mengedukasi masyarakat tentang pentingnya produk original dan pemulihan yang tepat.'
    ];

    return (
        <section className="bg-[#faf8f3] py-20 md:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                    <div className="inline-flex items-center gap-3 mb-6">
                        <span className="w-8 h-px bg-[#c9a961]" />
                        <span className="text-xs tracking-[0.3em] uppercase text-[#c9a961] font-medium">Visi & Misi · 愿景使命</span>
                        <span className="w-8 h-px bg-[#c9a961]" />
                    </div>
                    <h2 className="font-serif text-3xl md:text-5xl text-[#1a3d2e]" style={{ fontFamily: '"Playfair Display", serif' }}>
                        Arah & <span className="italic text-[#c9a961]">Tujuan</span> Kami
                    </h2>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
                    <TiltCard className="relative p-8 md:p-10 bg-[#1a3d2e] rounded-2xl overflow-hidden">
                        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <div className="w-14 h-14 rounded-full bg-[#c9a961]/10 flex items-center justify-center border border-[#c9a961]/20 mb-6">
                                <Eye className="w-7 h-7 text-[#c9a961]" />
                            </div>
                            <h3 className="font-serif text-2xl md:text-3xl text-[#faf8f3] mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>Visi Kami</h3>
                            <p className="text-sm md:text-base text-[#faf8f3]/70 leading-relaxed">
                                Menjadi mitra pemulihan terpercaya di Sumatera Barat dengan menghadirkan obat Traditional Tiongkok original beserta pendampingan profesional bagi setiap keluarga.
                            </p>
                        </motion.div>
                    </TiltCard>

                    <TiltCard className="relative p-8 md:p-10 bg-white border border-[#1a3d2e]/10 rounded-2xl overflow-hidden">
                        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <div className="w-14 h-14 rounded-full bg-[#1a3d2e]/5 flex items-center justify-center border border-[#c9a961]/20 mb-6">
                                <Target className="w-7 h-7 text-[#c9a961]" />
                            </div>
                            <h3 className="font-serif text-2xl md:text-3xl text-[#1a3d2e] mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>Misi Kami</h3>
                            <ul className="space-y-3">
                                {misi.map((item, i) => (
                                    <motion.li key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-[#059669] flex-shrink-0 mt-0.5" />
                                        <span className="text-sm text-[#1a3d2e]/70 leading-relaxed">{item}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </TiltCard>
                </div>
            </div>
        </section>
    );
}

// ==========================================
// VALUES SECTION
// ==========================================
function ValuesSection() {
    const values = [
        { icon: Gem, title: 'Keaslian', hanzi: '真', desc: 'Kami hanya menyediakan produk original dengan stiker hologram dan dokumen impor resmi. Tidak ada kompromi.' },
        { icon: HeartHandshake, title: 'Kepedulian', hanzi: '心', desc: 'Setiap pasien kami perlakukan seperti keluarga sendiri — didampingi dari konsultasi hingga pemulihan.' },
        { icon: Award, title: 'Profesionalisme', hanzi: '专', desc: 'Arahan penggunaan diberikan oleh praktisi TCM berpengalaman dengan standar pelayanan terbaik.' }
    ];

    return (
        <section className="bg-[#faf8f3] py-20 md:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                    <div className="inline-flex items-center gap-3 mb-6">
                        <span className="w-8 h-px bg-[#c9a961]" />
                        <span className="text-xs tracking-[0.3em] uppercase text-[#c9a961] font-medium">Nilai Kami · 价值观</span>
                        <span className="w-8 h-px bg-[#c9a961]" />
                    </div>
                    <h2 className="font-serif text-3xl md:text-5xl text-[#1a3d2e]" style={{ fontFamily: '"Playfair Display", serif' }}>
                        Nilai yang Kami <span className="italic text-[#c9a961]">Pegang Teguh</span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {values.map((value, i) => (
                        <TiltCard key={i} className="relative p-8 bg-white border border-[#1a3d2e]/10 rounded-2xl overflow-hidden text-center">
                            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                                <div className="text-6xl font-serif text-[#c9a961]/20 mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>{value.hanzi}</div>
                                <motion.div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#1a3d2e]/5 flex items-center justify-center border border-[#c9a961]/20" whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.6 }}>
                                    <value.icon className="w-6 h-6 text-[#c9a961]" />
                                </motion.div>
                                <h3 className="font-serif text-xl text-[#1a3d2e] mb-3" style={{ fontFamily: '"Playfair Display", serif' }}>{value.title}</h3>
                                <p className="text-sm text-[#1a3d2e]/70 leading-relaxed">{value.desc}</p>
                            </motion.div>
                        </TiltCard>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ==========================================
// TRUST SECTION
// ==========================================
function TrustSection() {
    const points = [
        { icon: Shield, title: '100% Terjamin Asli & Ber-BPOM', desc: 'Kami hanya menyediakan produk dengan stiker hologram dan izin resmi, terhindar dari maraknya produk tiruan/palsu di pasaran.' },
        { icon: Stethoscope, title: 'Dukungan Konsultasi Praktisi TCM', desc: 'Anda tidak sekadar membeli obat, tetapi mendapatkan arahan penggunaan yang tepat langsung dari praktisi TCM berpengalaman.' },
        { icon: Truck, title: 'Layanan Antar Cepat ke RS', desc: 'Kami memahami kondisi darurat pasien. Barang bisa langsung dikirimkan ke area rumah sakit (RSUP Dr. M. Djamil, dll) atau rumah di area Padang.' }
    ];

    return (
        <section className="bg-[#1a3d2e] py-20 md:py-32 overflow-x-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                    <h2 className="font-serif text-3xl md:text-5xl text-[#faf8f3]" style={{ fontFamily: '"Playfair Display", serif' }}>
                        Mengapa Keluarga di Padang <span className="italic text-[#c9a961]">Mempercayai Kami?</span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6">
                    {points.map((point, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} whileHover={{ y: -10 }} className="p-8 bg-[#faf8f3]/5 border border-[#c9a961]/20 rounded-2xl backdrop-blur-sm">
                            <motion.div className="w-14 h-14 rounded-full bg-[#c9a961]/10 flex items-center justify-center border border-[#c9a961]/20 mb-6" whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.6 }}>
                                <point.icon className="w-7 h-7 text-[#c9a961]" />
                            </motion.div>
                            <h3 className="font-serif text-xl text-[#faf8f3] mb-3" style={{ fontFamily: '"Playfair Display", serif' }}>{point.title}</h3>
                            <p className="text-sm text-[#faf8f3]/60 leading-relaxed">{point.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ==========================================
// TEAM SECTION
// ==========================================
function TeamSection() {
    return (
        <section className="bg-[#faf8f3] py-20 md:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                    <div className="inline-flex items-center gap-3 mb-6">
                        <span className="w-8 h-px bg-[#c9a961]" />
                        <span className="text-xs tracking-[0.3em] uppercase text-[#c9a961] font-medium">Di Balik TCM Padang</span>
                        <span className="w-8 h-px bg-[#c9a961]" />
                    </div>
                    <h2 className="font-serif text-3xl md:text-5xl text-[#1a3d2e]" style={{ fontFamily: '"Playfair Display", serif' }}>
                        Orang yang <span className="italic text-[#c9a961]">Mendampingi Anda</span>
                    </h2>
                </motion.div>

                <div className="flex justify-center px-4">
                    <TiltCard className="relative bg-white rounded-2xl overflow-hidden w-full max-w-sm shadow-xl border border-[#1a3d2e]/10">
                        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                            <div className="relative h-80 overflow-hidden bg-[#2d5a47]">
                                <motion.img src="/images/praktisi_jul.png" alt="Jul priandi" className="w-full h-full object-cover object-top" whileHover={{ scale: 1.1 }} transition={{ duration: 0.6 }} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            </div>
                            <div className="p-6 text-center">
                                <h3 className="font-serif text-xl text-[#1a3d2e] mb-1" style={{ fontFamily: '"Playfair Display", serif' }}>Jul priandi</h3>
                                <p className="text-xs text-[#c9a961] font-medium tracking-wider mb-3">七月普里亞迪</p>
                                <p className="text-sm text-[#1a3d2e]/70 mb-4">Praktisi TCM & Founder</p>
                                <p className="text-xs text-[#1a3d2e]/60 leading-relaxed">
                                    Lebih dari 15 tahun mendampingi pemulihan pasien pasca-operasi dan stroke di Padang dengan pendekatan TCM yang aman dan terukur.
                                </p>
                            </div>
                        </motion.div>
                    </TiltCard>
                </div>
            </div>
        </section>
    );
}

// ==========================================
// CTA SECTION
// ==========================================
function CTASection() {
    return (
        <section className="bg-[#1a3d2e] py-20 md:py-32 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25rem] font-serif text-white/[0.02] select-none pointer-events-none" style={{ fontFamily: '"Playfair Display", serif' }}>
                藥
            </div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#c9a961]/5 rounded-full blur-3xl animate-pulse-glow" />

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <h2 className="font-serif text-3xl md:text-6xl text-[#faf8f3] mb-6 leading-tight" style={{ fontFamily: '"Playfair Display", serif' }}>
                        Kenali Kami Lebih Dekat, <span className="italic text-[#c9a961]">Konsultasikan Kebutuhan Anda</span>
                    </h2>
                    <p className="text-base md:text-lg text-[#faf8f3]/70 mb-10 max-w-2xl mx-auto">
                        Ceritakan kondisi orang terkasih Anda — praktisi kami akan merekomendasikan produk dan pendampingan yang paling sesuai.
                    </p>
                    <motion.a href="https://wa.me/6285165755551" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#059669] text-white font-semibold rounded-full hover:bg-[#047857] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm md:text-base" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                        konsultasi sekarang
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}

// ==========================================
// FOOTER & FLOATING WA
// ==========================================
function Footer() {
    return (
        <footer className="bg-[#0f2419] text-[#faf8f3]/60 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <img src="/images/logo-tcm.webp" alt="TCM Padang" className="w-10 h-10 object-contain" />
                        <div className="flex flex-col leading-tight">
                            <span className="text-sm font-semibold text-[#faf8f3]">TCM Padang</span>
                            <span className="text-[10px] tracking-[0.2em] text-[#c9a961] uppercase">Traditional care</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-6 text-xs">
                        <Link href="/" className="hover:text-[#c9a961] transition-colors">Home</Link>
                        <Link href="/products" className="hover:text-[#c9a961] transition-colors">Produk</Link>
                        <Link href="/profil" className="hover:text-[#c9a961] transition-colors">Profil</Link>
                    </div>
                </div>
                <div className="pt-8 border-t border-[#1a3d2e] text-center text-xs mt-8">
                    <p>© 2026 TCM Padang · 传统中医 · Sumatera Barat. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

function FloatingWhatsApp() {
    return (
        <motion.a href="https://wa.me/6285165755551" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1, duration: 0.5 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="fixed bottom-6 right-6 w-14 h-14 bg-[#25d366] rounded-full flex items-center justify-center shadow-2xl z-40">
            <MessageCircle className="w-6 h-6 text-white" />
        </motion.a>
    );
}

// ==========================================
// MAIN PAGE
// ==========================================
export default function ProfilIndex() {
    return (
        <>
            <Head title="Klinik TCM Padang & Praktisi Berpengalaman | TCM Padang">
    <meta name="description" content="Kenali TCM Padang: klinik pengobatan tradisional Tiongkok di Padang dengan praktisi berpengalaman. Dampingi pemulihan orang terkasih dengan obat asli ber-BPOM." />
</Head>
            <GrainOverlay />
            <ScrollProgress />
            <Navbar />
            <main>
                <PageHero />
                <StorySection />
                <StatsSection />
                <VisiMisiSection />
                <ValuesSection />
                <TrustSection />
                <TeamSection />
                <CTASection />
            </main>
            <Footer />
            <FloatingWhatsApp />
        </>
    );
}