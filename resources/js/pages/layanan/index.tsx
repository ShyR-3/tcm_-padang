import { Head, Link } from '@inertiajs/react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import {
    MessageCircle, ArrowLeft, Stethoscope, Truck, Shield, CheckCircle,
    MapPin, Building2, Clock, ClipboardList, PackageCheck, HeartHandshake, BadgeCheck
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
                医
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#1a3d2e] to-[#0f2419]" />
            <motion.div className="animate-float-slow absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-[#c9a961]/10 to-transparent blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center w-full">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="inline-flex items-center gap-2 mb-6">
                    <Link href="/" className="text-[#c9a961] hover:text-[#faf8f3] transition-colors flex items-center gap-2 text-sm font-semibold">
                        <ArrowLeft className="w-4 h-4" /> Kembali ke Home
                    </Link>
                    <span className="text-[#c9a961]/30">•</span>
                    <span className="text-xs tracking-[0.3em] uppercase text-[#c9a961]">Layanan Kami · 服务</span>
                </motion.div>

                <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="font-serif text-4xl md:text-6xl lg:text-7xl text-[#faf8f3] mb-6 leading-tight" style={{ fontFamily: '"Playfair Display", serif' }}>
                    Layanan <span className="italic text-[#c9a961]">Profesional</span> untuk Pemulihan Orang Terkasih
                </motion.h1>

                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-base md:text-xl text-[#faf8f3]/70 max-w-3xl mx-auto">
                    Dari konsultasi hingga pendampingan pemulihan — kami hadir di setiap langkah, dengan layanan antar cepat ke rumah sakit dan rumah Anda.
                </motion.p>
            </div>
        </section>
    );
}

// ==========================================
// SERVICES DETAIL SECTION
// ==========================================
function ServicesSection() {
    const services = [
        {
            num: '01',
            icon: Stethoscope,
            hanzi: '中医咨询',
            title: 'Konsultasi TCM',
            desc: 'Konsultasi langsung dengan praktisi TCM berpengalaman untuk menentukan produk dan dosis yang tepat sesuai kondisi pasien.',
            features: [
                'Analisis kondisi pasien (pasca-operasi, stroke, kronis)',
                'Rekomendasi produk & dosis personal',
                'Gratis via WhatsApp atau tatap muka di klinik'
            ]
        },
        {
            num: '02',
            icon: Truck,
            hanzi: '医院速递',
            title: 'Pengiriman Instan RS',
            desc: 'Layanan kurir cepat khusus pengiriman ke area rumah sakit di seluruh area Padang.',
            features: [
                'Antar langsung ke area rumah sakit',
                'Same-day delivery untuk pesanan sebelum 15.00 WIB',
                'Jangkauan seluruh kota Padang & sekitarnya'
            ]
        },
        {
            num: '03',
            icon: HeartHandshake,
            hanzi: '患者陪护',
            title: 'Pendampingan Pasien',
            desc: 'Panduan lengkap cara konsumsi, pantangan, dan monitoring pemulihan pasca-operasi atau pasca-stroke bersama keluarga.',
            features: [
                'Panduan cara konsumsi & pantangan makanan',
                'Monitoring progres pemulihan secara berkala',
                'Dukungan edukasi untuk keluarga pasien'
            ]
        },
        {
            num: '04',
            icon: Shield,
            hanzi: '正品保证',
            title: 'Garansi Keaslian Produk',
            desc: 'Jaminan 100% produk original dengan stiker hologram dan dokumen impor resmi. Uang kembali jika terbukti palsu.',
            features: [
                'Stiker hologram resmi di setiap produk',
                'Dokumen impor resmi & terdaftar BPOM',
                'Garansi uang kembali jika terbukti palsu'
            ]
        }
    ];

    return (
        <section className="bg-[#faf8f3] py-20 md:py-32 overflow-x-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                    <div className="inline-flex items-center gap-3 mb-6">
                        <span className="w-8 h-px bg-[#c9a961]" />
                        <span className="text-xs tracking-[0.3em] uppercase text-[#c9a961] font-medium">Apa yang Kami Berikan</span>
                        <span className="w-8 h-px bg-[#c9a961]" />
                    </div>
                    <h2 className="font-serif text-3xl md:text-5xl text-[#1a3d2e]" style={{ fontFamily: '"Playfair Display", serif' }}>
                        Empat Pilar <span className="italic text-[#c9a961]">Layanan Kami</span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
                    {services.map((service, i) => (
                        <TiltCard key={i} className="enterprise-card group relative bg-white border border-[#1a3d2e]/10 rounded-2xl overflow-hidden">
                            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1 }} className="p-6 md:p-8 h-full">
                                <div className="flex items-start justify-between mb-6">
                                    <motion.div className="w-14 h-14 rounded-full bg-[#1a3d2e]/5 flex items-center justify-center border border-[#c9a961]/20" whileHover={{ scale: 1.15, rotate: 10 }} transition={{ duration: 0.4 }}>
                                        <service.icon className="w-7 h-7 text-[#c9a961]" />
                                    </motion.div>
                                    <span className="text-5xl font-serif text-[#1a3d2e]/10" style={{ fontFamily: '"Playfair Display", serif' }}>{service.num}</span>
                                </div>

                                <p className="text-xs text-[#c9a961] font-medium tracking-wider mb-2">{service.hanzi}</p>
                                <h3 className="font-serif text-xl md:text-2xl text-[#1a3d2e] mb-3" style={{ fontFamily: '"Playfair Display", serif' }}>{service.title}</h3>
                                <p className="text-sm text-[#1a3d2e]/70 leading-relaxed mb-6">{service.desc}</p>

                                <div className="w-12 h-px bg-[#c9a961] mb-5" />

                                <ul className="space-y-3">
                                    {service.features.map((feature, idx) => (
                                        <motion.li key={idx} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + idx * 0.1 }} className="flex items-start gap-3">
                                            <CheckCircle className="w-4 h-4 text-[#059669] flex-shrink-0 mt-0.5" />
                                            <span className="text-xs md:text-sm text-[#1a3d2e]/70">{feature}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        </TiltCard>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ==========================================
// PROCESS / ALUR PEMESANAN
// ==========================================
function ProcessSection() {
    const steps = [
        { icon: MessageCircle, title: 'Konsultasi', desc: 'Hubungi kami via WhatsApp dan ceritakan kondisi pasien' },
        { icon: ClipboardList, title: 'Rekomendasi', desc: 'Praktisi merekomendasikan produk & dosis yang paling sesuai.' },
        { icon: PackageCheck, title: 'Pengiriman', desc: 'Produk diantar cepat ke rumah sakit atau rumah Anda.' },
        { icon: HeartHandshake, title: 'Pendampingan', desc: 'Kami dampingi dan monitor progres hingga pemulihan.' }
    ];

    return (
        <section className="bg-[#1a3d2e] py-20 md:py-32 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-serif text-white/[0.02] select-none pointer-events-none" style={{ fontFamily: '"Playfair Display", serif' }}>
                程
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                    <div className="inline-flex items-center gap-3 mb-6">
                        <span className="w-8 h-px bg-[#c9a961]" />
                        <span className="text-xs tracking-[0.3em] uppercase text-[#c9a961] font-medium">Alur Pemesanan · 流程</span>
                        <span className="w-8 h-px bg-[#c9a961]" />
                    </div>
                    <h2 className="font-serif text-3xl md:text-5xl text-[#faf8f3]" style={{ fontFamily: '"Playfair Display", serif' }}>
                        Empat Langkah <span className="italic text-[#c9a961]">Mudah</span>
                    </h2>
                </motion.div>

                <div className="relative">
                    {/* Garis penghubung (desktop) */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: [0.22, 0.84, 0.38, 1] }}
                        className="hidden lg:block absolute top-8 left-[12%] right-[12%] h-px bg-[#c9a961]/40 origin-left"
                    />

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
                        {steps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="relative text-center"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.15, rotate: 10 }}
                                    transition={{ duration: 0.4 }}
                                    className="relative w-16 h-16 mx-auto mb-6 rounded-full bg-[#c9a961] flex items-center justify-center shadow-lg shadow-[#c9a961]/20"
                                >
                                    <step.icon className="w-7 h-7 text-[#0f2419]" />
                                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#0f2419] border border-[#c9a961] text-[#c9a961] text-xs font-bold flex items-center justify-center">
                                        {i + 1}
                                    </span>
                                </motion.div>
                                <h3 className="font-serif text-xl text-[#faf8f3] mb-3" style={{ fontFamily: '"Playfair Display", serif' }}>{step.title}</h3>
                                <p className="text-sm text-[#faf8f3]/60 leading-relaxed max-w-xs mx-auto">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

// ==========================================
// COVERAGE / AREA JANGKAUAN
// ==========================================
function CoverageSection() {
    const hospitals = [
        'RSUP Dr. M. Djamil',
        'RS Yos Sudarso',
        'RS Tentara Reksodiwiryo',
        'RS Bhayangkara Polda Sumbar',
        'RS Siti Rahmah',
        'RS Hermina Padang',
        'RSIA Restu Bunda',
        'Seluruh Area Padang'
    ];

    return (
        <section className="bg-[#faf8f3] py-20 md:py-32 overflow-x-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
                        <div className="inline-flex items-center gap-3 mb-6">
                            <span className="w-8 h-px bg-[#c9a961]" />
                            <span className="text-xs tracking-[0.3em] uppercase text-[#c9a961] font-medium">Area Jangkauan · 范围</span>
                            <span className="w-8 h-px bg-[#c9a961]" />
                        </div>
                        <h2 className="font-serif text-3xl md:text-5xl text-[#1a3d2e] mb-6 leading-tight" style={{ fontFamily: '"Playfair Display", serif' }}>
                            Kami Mengantar Langsung ke <span className="italic text-[#c9a961]">area rumah sakit</span>
                        </h2>
                        <p className="text-sm md:text-base text-[#1a3d2e]/70 leading-relaxed mb-8">
                            Kami memahami kebutuhan mendesak pasien. Barang bisa langsung dikirimkan via kurir instan ke lobi/area Rumah Sakit (RSUP Dr. M. Djamil, RS Yos Sudarso, dll) atau ke rumah Anda di area Padang.
                        </p>

                        <div className="flex flex-wrap gap-3">
                            {hospitals.map((hospital, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08 }}
                                    whileHover={{ scale: 1.05, y: -3 }}
                                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-[#1a3d2e]/10 rounded-full text-xs md:text-sm font-medium text-[#1a3d2e] shadow-sm"
                                >
                                    <Building2 className="w-4 h-4 text-[#c9a961]" />
                                    {hospital}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="space-y-6">
                        <TiltCard className="p-6 md:p-8 bg-[#1a3d2e] rounded-2xl overflow-hidden">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-[#c9a961]/10 flex items-center justify-center border border-[#c9a961]/20 flex-shrink-0">
                                    <Clock className="w-6 h-6 text-[#c9a961]" />
                                </div>
                                <div>
                                    <h3 className="font-serif text-xl text-[#faf8f3] mb-2" style={{ fontFamily: '"Playfair Display", serif' }}>Jam Layanan</h3>
                                    <p className="text-sm text-[#faf8f3]/70 leading-relaxed">
                                        Senin – Sabtu: 08.00 – 17.00 WIB<br />
                                        Minggu & Hari Besar: 09.00 – 15.00 WIB (By Appointment)<br />
                                        <span className="text-[#c9a961]">Kondisi darurat di luar jam layanan? Hubungi kami — kami usahakan.</span>
                                    </p>
                                </div>
                            </div>
                        </TiltCard>

                        <TiltCard className="p-6 md:p-8 bg-white border border-[#1a3d2e]/10 rounded-2xl overflow-hidden">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-[#1a3d2e]/5 flex items-center justify-center border border-[#c9a961]/20 flex-shrink-0">
                                    <BadgeCheck className="w-6 h-6 text-[#c9a961]" />
                                </div>
                                <div>
                                    <h3 className="font-serif text-xl text-[#1a3d2e] mb-2" style={{ fontFamily: '"Playfair Display", serif' }}>Same-Day Delivery</h3>
                                    <p className="text-sm text-[#1a3d2e]/70 leading-relaxed">
                                        Pesan sebelum pukul 15.00 WIB dan produk sampai di hari yang sama — langsung ke tangan Anda atau keluarga di rumah sakit.
                                    </p>
                                </div>
                            </div>
                        </TiltCard>

                        <TiltCard className="p-6 md:p-8 bg-white border border-[#1a3d2e]/10 rounded-2xl overflow-hidden">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-[#1a3d2e]/5 flex items-center justify-center border border-[#c9a961]/20 flex-shrink-0">
                                    <MapPin className="w-6 h-6 text-[#c9a961]" />
                                </div>
                                <div>
                                    <h3 className="font-serif text-xl text-[#1a3d2e] mb-2" style={{ fontFamily: '"Playfair Display", serif' }}>Kunjungan Klinik</h3>
                                    <p className="text-sm text-[#1a3d2e]/70 leading-relaxed">
                                        Jl. Tampat Durian, RT.001/RW.004, Korong Gadang, Kec. Kuranji, Kota Padang, Sumatera Barat 25156
                                    </p>
                                </div>
                            </div>
                        </TiltCard>
                    </motion.div>
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
                        Butuh Pendampingan? <span className="italic text-[#c9a961]">Mulai dari Konsultasi Gratis.</span>
                    </h2>
                    <p className="text-base md:text-lg text-[#faf8f3]/70 mb-10 max-w-2xl mx-auto">
                        Ceritakan kondisi orang terkasih Anda — tim kami siap merekomendasikan langkah terbaik dan mengantar produk hingga ke area rumah sakit.
                    </p>
                    <motion.a href="https://wa.me/6285165755551" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#059669] text-white font-semibold rounded-full hover:bg-[#047857] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm md:text-base" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                        konsultasi sekarang
                    </motion.a>
                    <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-[#faf8f3]/60">
                        <div className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-[#059669]" /><span>Respons Kurang Dari 1 Jam</span></div>
                        <div className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-[#059669]" /><span>Antar ke RS</span></div>
                        <div className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-[#059669]" /><span>Garansi Original</span></div>
                    </div>
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
                        <Link href="/layanan" className="hover:text-[#c9a961] transition-colors">Layanan</Link>
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
export default function LayananIndex() {
    return (
        <>
            <Head title="Konsultasi TCM & Obat Tradisional Padang | TCM Padang">
    <meta name="description" content="Layanan konsultasi TCM di Padang: pendampingan pemakaian obat tradisional, anjuran pantangan, dan kontrol berkala. Ramah lansia, bisa konsultasi via WhatsApp." />
</Head>
            <GrainOverlay />
            <ScrollProgress />
            <Navbar />
            <main>
                <PageHero />
                <ServicesSection />
                <ProcessSection />
                <CoverageSection />
                <CTASection />
            </main>
            <Footer />
            <FloatingWhatsApp />
        </>
    );
}