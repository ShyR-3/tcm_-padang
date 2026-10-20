import { Head, Link } from '@inertiajs/react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { MessageCircle, ArrowLeft, CheckCircle, Shield, Truck, Award, Clock, Pill, Heart, Brain, Sparkles, ExternalLink, ChevronRight, AlertCircle } from 'lucide-react';
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

function Hero() {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 100]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-[#1a3d2e] pt-20">
            <motion.div style={{ y: y1, opacity }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] md:text-[30rem] font-serif text-white/[0.03] select-none pointer-events-none">
                藥
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#1a3d2e] to-[#0f2419]" />
            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center w-full">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="inline-flex items-center gap-2 mb-6">
                    <Link href="/" className="text-[#c9a961] hover:text-[#faf8f3] transition-colors flex items-center gap-2 text-sm font-semibold">
                        <ArrowLeft className="w-4 h-4" /> Kembali ke Home
                    </Link>
                    <span className="text-[#c9a961]/30">•</span>
                    <span className="text-xs tracking-[0.3em] uppercase text-[#c9a961]">Produk Unggulan</span>
                </motion.div>
                <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="font-serif text-5xl md:text-7xl text-[#faf8f3] mb-6" style={{ fontFamily: '"Playfair Display", serif' }}>
                    Produk <span className="italic text-[#c9a961]">Premium</span> Kami
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-lg md:text-xl text-[#faf8f3]/70 max-w-3xl mx-auto">
                    Formula Traditional Tiongkok Terpercaya untuk Pemulihan Kesehatan Optimal
                </motion.p>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex flex-wrap items-center justify-center gap-6 mt-10">
                    <div className="flex items-center gap-2 text-[#faf8f3]/60 text-sm">
                        <CheckCircle className="w-5 h-5 text-[#c9a961]" />
                        <span>100% Original</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#faf8f3]/60 text-sm">
                        <Shield className="w-5 h-5 text-[#c9a961]" />
                        <span>BPOM Certified</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#faf8f3]/60 text-sm">
                        <Truck className="w-5 h-5 text-[#c9a961]" />
                        <span>Fast Delivery</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function ProductDetailCard({ product, index }: { product: any; index: number }) {
    const [activeTab, setActiveTab] = useState<'benefits' | 'ingredients' | 'usage'>('benefits');

    return (
        <motion.div initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: index * 0.2 }} className="mb-32" id={product.title.toLowerCase().replace(/\s+/g, '-')}>
            <TiltCard className="enterprise-card group relative bg-[#faf8f3] rounded-3xl overflow-hidden shadow-2xl">
                <div className="grid lg:grid-cols-2 gap-0 w-full">
                    <div className={`relative h-96 lg:h-auto ${product.color} overflow-hidden`}>
                        <motion.img src={product.image} alt={product.title} className="w-full h-full object-cover" whileHover={{ scale: 1.1 }} transition={{ duration: 0.6 }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        <motion.div className="absolute top-6 right-6 px-4 py-2 bg-[#c9a961]/90 rounded-full backdrop-blur-sm" whileHover={{ scale: 1.1, rotate: 5 }}>
                            <span className="text-xs font-bold text-[#1a3d2e]">{product.badge}</span>
                        </motion.div>
                        <div className="absolute bottom-6 left-6">
                            <span className="text-8xl font-serif text-white/10" style={{ fontFamily: '"Playfair Display", serif' }}>{product.num}</span>
                        </div>
                    </div>
                    <div className="p-8 md:p-12">
                        <motion.p className="text-xs text-[#c9a961] font-medium tracking-wider mb-2">{product.hanzi}</motion.p>
                        <motion.h2 className="font-serif text-3xl md:text-4xl text-[#1a3d2e] mb-3" style={{ fontFamily: '"Playfair Display", serif' }}>{product.title}</motion.h2>
                        <motion.h3 className="text-lg font-serif font-semibold text-[#1a3d2e]/80 mb-6 italic">{product.headline}</motion.h3>
                        <div className="w-16 h-px bg-[#c9a961] mb-6" />
                        <motion.p className="text-sm text-[#1a3d2e]/70 leading-relaxed mb-8">{product.desc}</motion.p>

                        <div className="flex gap-2 mb-6 border-b border-[#1a3d2e]/10">
                            {(['benefits', 'ingredients', 'usage'] as const).map((tab) => (
                                <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 text-sm font-medium transition-all ${activeTab === tab ? 'text-[#1a3d2e] border-b-2 border-[#c9a961]' : 'text-[#1a3d2e]/50 hover:text-[#1a3d2e]'}`}>
                                    {tab === 'benefits' ? 'Manfaat' : tab === 'ingredients' ? 'Komposisi' : 'Cara Pakai'}
                                </button>
                            ))}
                        </div>

                        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mb-8">
                            {activeTab === 'benefits' && (
                                <div className="grid grid-cols-1 gap-3">
                                    {product.benefits.map((benefit: string, i: number) => (
                                        <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex items-center gap-3 p-3 bg-[#1a3d2e]/5 rounded-lg">
                                            <CheckCircle className="w-5 h-5 text-[#059669] flex-shrink-0" />
                                            <span className="text-sm text-[#1a3d2e]">{benefit}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                            {activeTab === 'ingredients' && (
                                <div className="space-y-3">
                                    {product.ingredients.map((ing: string, i: number) => (
                                        <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} className="flex items-center gap-3">
                                            <Pill className="w-4 h-4 text-[#c9a961]" />
                                            <span className="text-sm text-[#1a3d2e]">{ing}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                            {activeTab === 'usage' && (
                                <div className="space-y-4">
                                    <div className="flex gap-3">
                                        <Clock className="w-5 h-5 text-[#c9a961] flex-shrink-0" />
                                        <div>
                                            <h4 className="font-semibold text-[#1a3d2e] text-sm mb-1">Dosis & Cara Pakai</h4>
                                            <p className="text-sm text-[#1a3d2e]/70">{product.howToUse}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 p-4 bg-[#c9a961]/10 rounded-lg border border-[#c9a961]/20">
                                        <AlertCircle className="w-5 h-5 text-[#c9a961] flex-shrink-0" />
                                        <div>
                                            <h4 className="font-semibold text-[#1a3d2e] text-sm mb-1">Perhatian</h4>
                                            <p className="text-sm text-[#1a3d2e]/70">{product.caution}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link
                                href={`/products/${product.title.toLowerCase().replace(/\s+/g, '-')}`}
                                className="inline-flex flex-1 items-center justify-center gap-2 px-6 py-4 border-2 border-[#1a3d2e] text-[#1a3d2e] font-bold rounded-full hover:bg-[#1a3d2e] hover:text-[#faf8f3] transition-all duration-300"
                            >
                                Lihat Detail <ChevronRight className="w-4 h-4" />
                            </Link>
                            <motion.a
                                href="https://wa.me/6285165755551"
                                className="inline-flex flex-1 items-center justify-center gap-2 px-6 py-4 bg-[#059669] text-white font-bold rounded-full hover:bg-[#047857] transition-all duration-300 shadow-lg hover:shadow-xl"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <MessageCircle className="w-5 h-5" /> Pesan Sekarang <ExternalLink className="w-4 h-4" />
                            </motion.a>
                        </div>
                    </div>
                </div>
            </TiltCard>
        </motion.div>
    );
}

function ComparisonSection() {
    return (
        <section className="py-20 md:py-32 bg-[#faf8f3]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                    <h2 className="font-serif text-4xl md:text-5xl text-[#1a3d2e] mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
                        Perbandingan <span className="italic text-[#c9a961]">Produk</span>
                    </h2>
                    <p className="text-[#1a3d2e]/70 max-w-2xl mx-auto">Pilih produk yang sesuai dengan kebutuhan kesehatan Anda</p>
                </motion.div>
                <div className="grid md:grid-cols-2 gap-6 px-4">
                    <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="p-8 bg-white rounded-2xl border border-[#1a3d2e]/10 shadow-lg">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-full bg-[#2d5a47] flex items-center justify-center">
                                <Heart className="w-6 h-6 text-[#c9a961]" />
                            </div>
                            <h3 className="font-serif text-2xl text-[#1a3d2e]">Pien Tze Huang</h3>
                        </div>
                        <ul className="space-y-3 mb-6">
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-[#059669] flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-[#1a3d2e]/70">Fokus pemulihan luka pasca operasi</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-[#059669] flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-[#1a3d2e]/70">Melindungi fungsi hati</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-[#059669] flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-[#1a3d2e]/70">Anti peradangan & detoksifikasi</span>
                            </li>
                        </ul>
                        <Link href="/products/pien-tze-huang" className="inline-flex items-center gap-2 text-[#059669] font-semibold hover:gap-3 transition-all">
                            Lihat Detail <ChevronRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="p-8 bg-white rounded-2xl border border-[#1a3d2e]/10 shadow-lg">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-full bg-[#1a3d2e] flex items-center justify-center">
                                <Brain className="w-6 h-6 text-[#c9a961]" />
                            </div>
                            <h3 className="font-serif text-2xl text-[#1a3d2e]">Angong Niuhuang Wan</h3>
                        </div>
                        <ul className="space-y-3 mb-6">
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-[#059669] flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-[#1a3d2e]/70">Pendampingan pemulihan stroke</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-[#059669] flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-[#1a3d2e]/70">Menjaga fungsi saraf otak</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-[#059669] flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-[#1a3d2e]/70">Melancarkan sirkulasi darah</span>
                            </li>
                        </ul>
                        <Link href="/products/angong-niuhuang-wan" className="inline-flex items-center gap-2 text-[#059669] font-semibold hover:gap-3 transition-all">
                            Lihat Detail <ChevronRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function WhyChooseUs() {
    const reasons = [
        { icon: Award, title: '100% Original', desc: 'Garansi uang kembali jika terbukti palsu' },
        { icon: Shield, title: 'BPOM Certified', desc: 'Semua produk tersertifikasi resmi' },
        { icon: Truck, title: 'Fast Delivery', desc: 'Pengiriman instan ke RS & rumah' },
        { icon: Sparkles, title: 'Premium Quality', desc: 'Formula terbaik dari Tiongkok' }
    ];

    return (
        <section className="py-20 md:py-32 bg-[#1a3d2e]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                    <h2 className="font-serif text-4xl md:text-5xl text-[#faf8f3] mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
                        Mengapa Memilih <span className="italic text-[#c9a961]">Produk Kami?</span>
                    </h2>
                </motion.div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                    {reasons.map((reason, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -10 }} className="text-center p-6">
                            <motion.div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#c9a961]/10 flex items-center justify-center border border-[#c9a961]/20" whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.6 }}>
                                <reason.icon className="w-8 h-8 text-[#c9a961]" />
                            </motion.div>
                            <h3 className="font-serif text-lg text-[#faf8f3] mb-2">{reason.title}</h3>
                            <p className="text-sm text-[#faf8f3]/60">{reason.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function CTASection() {
    return (
        <section className="py-20 md:py-32 bg-[#faf8f3]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <h2 className="font-serif text-4xl md:text-6xl text-[#1a3d2e] mb-6" style={{ fontFamily: '"Playfair Display", serif' }}>
                        Masih Bingung Pilih <span className="italic text-[#c9a961]">Produk?</span>
                    </h2>
                    <p className="text-lg text-[#1a3d2e]/70 mb-10 max-w-2xl mx-auto">
                        Konsultasikan gratis dengan praktisi TCM kami untuk mendapatkan rekomendasi yang tepat.
                    </p>
                    <motion.a href="https://wa.me/6285165755551" className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-[#059669] text-white font-bold rounded-full hover:bg-[#047857] transition-all duration-300 shadow-lg hover:shadow-xl text-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <MessageCircle className="w-6 h-6" /> konsultasi sekarang
                    </motion.a>
                    <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-[#1a3d2e]/60">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-[#059669]" />
                            <span>Respons Cepat</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-[#059669]" />
                            <span>Tanpa Biaya</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-[#059669]" />
                            <span>Praktisi Berpengalaman</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

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
                        <Link href="#" className="hover:text-[#c9a961] transition-colors">Privasi</Link>
                        <Link href="#" className="hover:text-[#c9a961] transition-colors">Ketentuan</Link>
                        <Link href="#" className="hover:text-[#c9a961] transition-colors">Kontak</Link>
                    </div>
                </div>
                <div className="pt-8 border-t border-[#1a3d2e] text-center text-xs">
                    <p>© 2026 TCM Padang · Traditional Chinese Medicine · Sumatera Barat</p>
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

export default function ProductsIndex() {
    const products = [
        {
            num: '01', badge: 'Best Seller', hanzi: '片仔癀 · Pien Tze Huang', title: 'Pien Tze Huang',
            headline: 'Percepat Pemulihan Luka Operasi & Lindungi Fungsi Hati',
            desc: 'Formula rahasia kekaisaran Tiongkok yang telah digunakan selama ratusan tahun. Pien Tze Huang membantu mempercepat pengeringan luka pasca operasi, meredakan nyeri, dan melindungi fungsi hati.',
            benefits: ['Mempercepat pengeringan luka operasi', 'Meredakan peradangan & nyeri', 'Melindungi fungsi hati', 'Detoksifikasi tubuh'],
            ingredients: ['Moschus (Musk)', 'Calculus Bovis', 'Notoginseng Radix', 'Snake Gall'],
            howToUse: '2-3 kapsul per hari, diminum setelah makan. Untuk kondisi serius bisa ditingkatkan sesuai anjuran praktisi.',
            caution: 'Ibu hamil dan menyusui harus konsultasi dulu. Tidak untuk anak di bawah 12 tahun tanpa pengawasan dokter.',
            image: '/images/2.webp', color: 'bg-[#2d5a47]'
        },
        {
            num: '02', badge: 'Herbal Premium', hanzi: '安宫牛黄丸 · Angong Niuhuang Wan', title: 'Angong Niuhuang Wan',
            headline: 'terapi pendamping pasca-stroke & Kerusakan saraf',
            desc: 'Angong Niuhuang Wan adalah formula emergency terbaik untuk stroke dan gangguan neurologis. Sangat efektif pada fase golden period pemulihan stroke.',
            benefits: ['pemulihan stroke', 'Melancarkan sirkulasi darah otak', 'Menjaga fungsi saraf', 'Golden period support'],
            ingredients: ['Calculus Bovis', 'Moschus', 'Cornu Bubali', 'Cinnabaris', 'Borneolum'],
            howToUse: '1 pil per hari, dilarutkan dalam air hangat. Untuk kondisi emergency bisa 2x sehari. Maksimal 7 hari berturut-turut.',
            caution: 'Hanya untuk dewasa. Ibu hamil dilarang. Tidak untuk penggunaan jangka panjang tanpa pengawasan praktisi.',
            image: '/images/1.webp', color: 'bg-[#1a3d2e]'
        }
    ];

    return (
        <>
            <Head title="Jual Obat China Asli & Herbal Ber-BPOM di Padang | TCM Padang">
    <meta name="description" content="Jual obat china asli & herbal Tiongkok ber-BPOM di Padang: Pien Tze Huang dll. Garansi keaslian hologram, bisa pesan via WhatsApp. Cek katalog produk kami." />
</Head>
            <GrainOverlay />
            <ScrollProgress />
            <Navbar />
            <main>
                <Hero />
                <section className="py-20 md:py-32 bg-[#faf8f3]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6">
                        {products.map((product, index) => (
                            <ProductDetailCard key={index} product={product} index={index} />
                        ))}
                    </div>
                </section>
                <ComparisonSection />
                <WhyChooseUs />
                <CTASection />
            </main>
            <Footer />
            <FloatingWhatsApp />
        </>
    );
}