import { Head, Link } from '@inertiajs/react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import {
    MessageCircle, ArrowLeft, MapPin, Phone, Clock, Send,
    Building2, CheckCircle, Zap, User, FileText
} from 'lucide-react';
import { useState, useRef } from 'react';
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
                联
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#1a3d2e] to-[#0f2419]" />
            <motion.div className="animate-float-slow absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-[#c9a961]/10 to-transparent blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center w-full">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="inline-flex items-center gap-2 mb-6">
                    <Link href="/" className="text-[#c9a961] hover:text-[#faf8f3] transition-colors flex items-center gap-2 text-sm font-semibold">
                        <ArrowLeft className="w-4 h-4" /> Kembali ke Home
                    </Link>
                    <span className="text-[#c9a961]/30">•</span>
                    <span className="text-xs tracking-[0.3em] uppercase text-[#c9a961]">Hubungi Kami · 联系</span>
                </motion.div>

                <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="font-serif text-4xl md:text-6xl lg:text-7xl text-[#faf8f3] mb-6 leading-tight" style={{ fontFamily: '"Playfair Display", serif' }}>
                    Kami Siap <span className="italic text-[#c9a961]">Mendampingi Anda</span>
                </motion.h1>

                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-base md:text-xl text-[#faf8f3]/70 max-w-3xl mx-auto">
                    Kunjungi klinik kami, hubungi via WhatsApp, atau kirim pesan — tim kami merespons dalam waktu kurang dari 1 jam pada jam layanan.
                </motion.p>
            </div>
        </section>
    );
}

// ==========================================
// CONTACT INFO CARDS
// ==========================================
function ContactCards() {
    const cards = [
        {
            icon: Building2,
            title: 'Kunjungi Klinik',
            hanzi: '地址',
            lines: ['Jl. Tampat Durian, RT.001/RW.004, Korong Gadang, Kec. Kuranji, Kota Padang, Sumatera Barat 25156']
        },
        {
            icon: Phone,
            title: 'Telepon & WhatsApp',
            hanzi: '电话',
            lines: ['WhatsApp: +62 851-6575-5551', 'Telp: +62 851-6575-5551', 'Respons < 1 jam pada jam layanan']
        },
        {
            icon: Clock,
            title: 'Jam Layanan',
            hanzi: '时间',
            lines: ['Senin – Sabtu: 08.00 – 17.00 WIB', 'Minggu & Hari Besar:', '09.00 – 15.00 WIB (By Appointment)']
        }
    ];

    return (
        <section className="bg-[#faf8f3] py-20 md:py-32 overflow-x-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                    <div className="inline-flex items-center gap-3 mb-6">
                        <span className="w-8 h-px bg-[#c9a961]" />
                        <span className="text-xs tracking-[0.3em] uppercase text-[#c9a961] font-medium">Informasi Kontak</span>
                        <span className="w-8 h-px bg-[#c9a961]" />
                    </div>
                    <h2 className="font-serif text-3xl md:text-5xl text-[#1a3d2e]" style={{ fontFamily: '"Playfair Display", serif' }}>
                        Tiga Cara <span className="italic text-[#c9a961]">Menghubungi Kami</span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {cards.map((card, i) => (
                        <TiltCard key={i} className="enterprise-card relative p-8 bg-white border border-[#1a3d2e]/10 rounded-2xl overflow-hidden text-center">
                            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                                <motion.div className="w-14 h-14 mx-auto mb-5 rounded-full bg-[#1a3d2e]/5 flex items-center justify-center border border-[#c9a961]/20" whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.6 }}>
                                    <card.icon className="w-7 h-7 text-[#c9a961]" />
                                </motion.div>
                                <p className="text-xs text-[#c9a961] font-medium tracking-wider mb-2">{card.hanzi}</p>
                                <h3 className="font-serif text-xl text-[#1a3d2e] mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>{card.title}</h3>
                                <div className="w-12 h-px bg-[#c9a961] mx-auto mb-4" />
                                {card.lines.map((line, idx) => (
                                    <p key={idx} className="text-sm text-[#1a3d2e]/70 leading-relaxed">{line}</p>
                                ))}
                            </motion.div>
                        </TiltCard>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ==========================================
// MAP + WHATSAPP FORM
// ==========================================
function MapFormSection() {
    const [nama, setNama] = useState('');
    const [topik, setTopik] = useState('Konsultasi Produk');
    const [pesan, setPesan] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const message = `Halo TCM Padang,\n\nNama: ${nama}\nKebutuhan: ${topik}\n\nPesan:\n${pesan}`;
        window.open(`https://wa.me/6285165755551?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <section className="bg-[#1a3d2e] py-20 md:py-32 overflow-x-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                    <div className="inline-flex items-center gap-3 mb-6">
                        <span className="w-8 h-px bg-[#c9a961]" />
                        <span className="text-xs tracking-[0.3em] uppercase text-[#c9a961] font-medium">Lokasi & Pesan · 地图</span>
                        <span className="w-8 h-px bg-[#c9a961]" />
                    </div>
                    <h2 className="font-serif text-3xl md:text-5xl text-[#faf8f3]" style={{ fontFamily: '"Playfair Display", serif' }}>
                        Temukan Kami atau <span className="italic text-[#c9a961]">Kirim Pesan</span>
                    </h2>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
                    {/* Google Maps */}
                    <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="flex flex-col gap-4">
                        <div className="rounded-2xl overflow-hidden border border-[#c9a961]/20 h-80 lg:h-96 shadow-2xl">
                            <iframe
                                title="Lokasi TCM Padang"
                                src="https://www.google.com/maps?q=TCM+PADANG,+Jl.+Tampat+Durian,+RT.001/RW.004,+Korong+Gadang,+Kec.+Kuranji,+Kota+Padang,+Sumatera+Barat+25156&output=embed"
                                className="w-full h-full border-0"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                        <motion.a
                            href="https://maps.app.goo.gl/n3sS9LbGUucVCumd9"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#c9a961] text-[#0f2419] font-semibold rounded-full hover:bg-[#faf8f3] transition-all duration-300 text-sm"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <MapPin className="w-4 h-4" /> Buka Rute di Google Maps
                        </motion.a>
                    </motion.div>

                    {/* WhatsApp Form */}
                    <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
                        <form onSubmit={handleSubmit} className="p-6 md:p-8 bg-[#faf8f3] rounded-2xl shadow-2xl h-full flex flex-col gap-5">
                            <div>
                                <h3 className="font-serif text-2xl text-[#1a3d2e] mb-1" style={{ fontFamily: '"Playfair Display", serif' }}>Kirim Pesan</h3>
                                <p className="text-xs text-[#1a3d2e]/60">Pesan Anda akan langsung terkirim ke WhatsApp kami.</p>
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-xs font-semibold text-[#1a3d2e] mb-2">
                                    <User className="w-3.5 h-3.5 text-[#c9a961]" /> Nama Anda
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={nama}
                                    onChange={(e) => setNama(e.target.value)}
                                    placeholder="Contoh: Budi Santoso"
                                    className="w-full px-4 py-3 rounded-xl border border-[#1a3d2e]/15 bg-white text-sm text-[#1a3d2e] placeholder:text-[#1a3d2e]/40 focus:outline-none focus:ring-2 focus:ring-[#c9a961] focus:border-transparent transition-all"
                                />
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-xs font-semibold text-[#1a3d2e] mb-2">
                                    <FileText className="w-3.5 h-3.5 text-[#c9a961]" /> Kebutuhan
                                </label>
                                <select
                                    value={topik}
                                    onChange={(e) => setTopik(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-[#1a3d2e]/15 bg-white text-sm text-[#1a3d2e] focus:outline-none focus:ring-2 focus:ring-[#c9a961] focus:border-transparent transition-all"
                                >
                                    <option>Konsultasi Produk</option>
                                    <option>Pemesanan Produk</option>
                                    <option>Pengiriman ke Rumah Sakit</option>
                                    <option>Kunjungan Klinik</option>
                                    <option>Lainnya</option>
                                </select>
                            </div>

                            <div className="flex-1">
                                <label className="flex items-center gap-2 text-xs font-semibold text-[#1a3d2e] mb-2">
                                    <MessageCircle className="w-3.5 h-3.5 text-[#c9a961]" /> Pesan
                                </label>
                                <textarea
                                    required
                                    value={pesan}
                                    onChange={(e) => setPesan(e.target.value)}
                                    placeholder="Ceritakan kebutuhan Anda, contoh: Saya butuh Pien Tze Huang untuk ibu saya yang baru operasi di RSUP Dr. M. Djamil..."
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl border border-[#1a3d2e]/15 bg-white text-sm text-[#1a3d2e] placeholder:text-[#1a3d2e]/40 focus:outline-none focus:ring-2 focus:ring-[#c9a961] focus:border-transparent transition-all resize-none"
                                />
                            </div>

                            <motion.button
                                type="submit"
                                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#059669] text-white font-bold rounded-full hover:bg-[#047857] transition-all duration-300 shadow-lg text-sm"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Send className="w-4 h-4" /> Kirim via WhatsApp
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// ==========================================
// EMERGENCY BANNER
// ==========================================
function EmergencyBanner() {
    return (
        <section className="bg-[#faf8f3] py-16 md:py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative p-8 md:p-12 bg-[#1a3d2e] rounded-3xl overflow-hidden text-center"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#c9a961]/10 rounded-full blur-3xl" />
                    <div className="relative z-10">
                        <motion.div
                            className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#c9a961] flex items-center justify-center"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Zap className="w-8 h-8 text-[#0f2419]" />
                        </motion.div>
                        <h2 className="font-serif text-2xl md:text-4xl text-[#faf8f3] mb-4 leading-tight" style={{ fontFamily: '"Playfair Display", serif' }}>
                            Kondisi Darurat? Butuh Antar <span className="italic text-[#c9a961]">Sekarang Juga?</span>
                        </h2>
                        <p className="text-sm md:text-base text-[#faf8f3]/70 mb-8 max-w-xl mx-auto">
                            Kami memahami situasi darurat pasien. Hubungi kami langsung — pesanan dapat segera diantar ke area rumah sakit rumah sakit di Padang.
                        </p>
                        <motion.a
                            href="tel:+6285165755551"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#c9a961] text-[#0f2419] font-bold rounded-full hover:bg-[#faf8f3] transition-all duration-300 text-sm md:text-base"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Phone className="w-5 h-5" /> Telepon Sekarang
                        </motion.a>
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
                        <Link href="/kontak" className="hover:text-[#c9a961] transition-colors">Kontak</Link>
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
export default function KontakIndex() {
    return (
        <>
            <Head title="Alamat Toko Obat China Kuranji Padang | TCM Padang">
    <meta name="description" content="Kunjungi toko obat china TCM Padang di Jl. Tampat Durian, Korong Gadang, Kuranji, Kota Padang. Lihat alamat, jam buka, peta lokasi, dan chat WhatsApp kami." />
</Head>
            <GrainOverlay />
            <ScrollProgress />
            <Navbar />
            <main>
                <PageHero />
                <ContactCards />
                <MapFormSection />
                <EmergencyBanner />
            </main>
            <Footer />
            <FloatingWhatsApp />
        </>
    );
}