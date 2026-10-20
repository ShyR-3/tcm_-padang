import { Head, usePage } from '@inertiajs/react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { MessageCircle, ArrowUpRight, Sparkles, Truck, Shield, Stethoscope, UserCheck, Plus, ExternalLink, Phone, MapPin, Clock, Badge } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useRef, useEffect } from 'react';
import Navbar from '@/Components/Navbar';
import Preloader from '@/Components/Preloader';

function GrainOverlay() {
    return <div className="grain-overlay hidden md:block" />;
}

function AnimatedCounter({ end, duration = 2 }: { end: number; duration?: number }) {
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

    return <div ref={ref}>{count}</div>;
}

function TiltCard({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
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
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d', ...style }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

function ShineEffect() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.8 }}
            />
        </div>
    );
}

function Hero() {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 150]);
    const y2 = useTransform(scrollY, [0, 500], [0, -100]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    const { settings, brand } = usePage().props as any;
    const s = (k: string, fb: string) => settings?.[k] ?? fb;

    const bg = brand?.bg ?? '#faf8f3';
    const primary = brand?.primary ?? '#1a3d2e';
    const accent = brand?.accent ?? '#c9a961';
    const heroImage = s('home_foto_hero', '/images/bangunan_tcm.jpeg');
    const badgeText = s('home_badge_text', 'Traditional Chinese Medicine · Padang');

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" style={{ backgroundColor: bg }}>
            <div className="absolute inset-0">
                <motion.img
                    src={heroImage}
                    alt="Building"
                    className="w-full h-full object-cover opacity-10"
                    style={{ y: useTransform(scrollY, [0, 500], [0, 50]) }}
                />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${bg}, ${bg}cc, ${bg})` }} />
            </div>
            <motion.div style={{ y: y1, background: `radial-gradient(circle, ${accent}1a, ${primary}0d)` }} className="animate-float-slow absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none" />
            <motion.div style={{ y: y2, background: `radial-gradient(circle, ${primary}1a, ${accent}0d)` }} className="animate-float-medium absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none" />
            <motion.div style={{ y: y1, opacity, color: `${primary}05` }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] md:text-[35rem] font-serif select-none pointer-events-none">
                字
            </motion.div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center w-full">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="inline-flex items-center gap-3 mb-8">
                    <span className="w-8 h-px" style={{ backgroundColor: accent }} />
                    <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: accent }}>{badgeText}</span>
                    <span className="w-8 h-px" style={{ backgroundColor: accent }} />
                </motion.div>

                <h1 className="font-serif text-[2.1rem] leading-[1.15] sm:text-5xl md:text-6xl lg:text-7xl mb-6" style={{ fontFamily: '"Playfair Display", serif', color: primary }}>
                    <motion.span initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="block">
                        Pien Tze Huang &
                    </motion.span>
                    <motion.span initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.0 }} className="block italic" style={{ color: accent }}>
                        Angong Niuhuang Wan
                    </motion.span>
                    <motion.span initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.2 }} className="block text-lg sm:text-2xl md:text-4xl mt-4" style={{ color: `${primary}e6` }}>
                        {s('home_judul', 'Original di Padang – Siap Antar Cepat ke RS & Rumah Anda.')}
                    </motion.span>
                </h1>

                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.4 }} className="max-w-3xl mx-auto text-base md:text-lg leading-relaxed mb-10 px-2" style={{ color: `${primary}b3` }}>
                    {s('home_tagline', 'Solusi Pemulihan Pasca-Operasi & Pendampingan Stroke Terpercaya. Dampingi Pemulihan Orang Terkasih Bersama Praktisi TCM Padang.')}
                </motion.p>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.6 }} className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10 px-4 w-full max-w-4xl mx-auto">
                    <motion.div className="flex items-center gap-3 bg-white px-5 py-3.5 rounded-2xl border shadow-sm w-full text-left sm:w-auto sm:justify-center sm:rounded-full sm:shadow-none" style={{ borderColor: `${primary}1a`, backgroundColor: `${primary}0d` }} whileHover={{ scale: 1.05, y: -5 }}>
                        <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${accent}26` }}>
                            <Truck className="w-4 h-4" style={{ color: accent }} />
                        </div>
                        <span className="text-xs sm:text-sm font-medium" style={{ color: primary }}>{s('home_trust_1', 'Antar Instan ke RSUP Dr. M. Djamil & Seluruh Padang')}</span>
                    </motion.div>
                    <motion.div className="flex items-center gap-3 bg-white px-5 py-3.5 rounded-2xl border shadow-sm w-full text-left sm:w-auto sm:justify-center sm:rounded-full sm:shadow-none" style={{ borderColor: `${primary}1a`, backgroundColor: `${primary}0d` }} whileHover={{ scale: 1.05, y: -5 }}>
                        <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${accent}26` }}>
                            <Shield className="w-4 h-4" style={{ color: accent }} />
                        </div>
                        <span className="text-xs sm:text-sm font-medium" style={{ color: primary }}>{s('home_trust_2', 'Garansi 100% Produk Original (BPOM)')}</span>
                    </motion.div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.8 }} className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16 px-4 w-full max-w-2xl mx-auto">
                    <a href="/products" className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 font-semibold rounded-full transition-all duration-300 text-sm w-full sm:w-auto text-center" style={{ borderColor: primary, color: primary }}>
                        {s('home_cta_produk', 'Lihat Produk Unggulan')} <ArrowUpRight className="w-4 h-4" />
                    </a>
                    <a href="https://wa.me/6285165755551" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#059669] text-white font-bold rounded-full hover:bg-[#047857] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm w-full sm:w-auto text-center">
                        <MessageCircle className="w-4 h-4 md:w-5 md:h-5" /> {s('home_cta_wa', 'Pesan via WhatsApp')}
                    </a>
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5, duration: 1 }} className="flex flex-col items-center gap-2" style={{ color: `${primary}66` }}>
                    <span className="text-xs tracking-widest uppercase">Gulir ke Bawah</span>
                    <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-px h-12" style={{ background: `linear-gradient(to bottom, ${accent}, transparent)` }} />
                </motion.div>
            </div>
        </section>
    );
}

function WaveTransition({ from, to }: { from: string; to: string }) {
    return (
        <div className="relative h-24 md:h-32 overflow-hidden -mb-1">
            <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
                <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }} d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,70 L1440,120 L0,120 Z" fill={to} />
                <path d="M0,80 C360,20 720,100 1080,40 C1260,20 1380,30 1440,40 L1440,120 L0,120 Z" fill={from} opacity="0.5" />
            </svg>
        </div>
    );
}

function ProductSection() {
    const { settings, brand } = usePage().props as any;
    const s = (k: string, fb: string) => settings?.[k] ?? fb;
    const primary = brand?.primary ?? '#1a3d2e';
    const accent = brand?.accent ?? '#c9a961';
    const bg = brand?.bg ?? '#faf8f3';

    const products = [
        {
            num: '01', badge: 'Best Seller', hanzi: '片仔癀 · Pien Tze Huang',
            namaIndonesia: 'Kapsul Pemulihan Luka Operasi & Pelindung Hati',
            title: 'Pien Tze Huang Premium',
            headline: 'Percepat Pemulihan Luka Operasi & Lindungi Fungsi Hati',
            desc: 'Formula rahasia kekaisaran Tiongkok. Membantu mempercepat pengeringan luka pasca operasi, meredakan nyeri, dan meminimalkan risiko infeksi.',
            benefits: [' Pengering Luka', ' Anti Peradangan', 'Lindungi Hati', ' Detoksifikasi'],
            image: '/images/2.webp'
        },
        {
            num: '02', badge: 'premium herbal', Badge: 'orignal BPOM', hanzi: '安宫牛黄丸 · Angong Niuhuang Wan',
            namaIndonesia: 'Angkung',
            title: 'Angong Niuhuang Wan',
            headline: 'terapi pendamping pasca-stroke & Kerusakan saraf',
            desc: 'Sangat baik dikonsumsi pada fase krusial pemulihan stroke di bawah arahan praktisi. Membantu melancarkan sirkulasi darah dan mendukung regenerasi fungsi saraf otak',
            benefits: [' Golden Period', 'Fungsi Saraf', ' Sirkulasi Darah'],
            image: '/images/1.webp'
        }
    ];

    return (
        <section id="produk" className="relative py-16 md:py-32 overflow-x-hidden" style={{ backgroundColor: primary }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                    <div className="inline-flex items-center gap-3 mb-6">
                        <span className="w-8 h-px" style={{ backgroundColor: accent }} />
                        <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: accent }}>{s('produk_section_label', 'Produk Unggulan Kami')}</span>
                        <span className="w-8 h-px" style={{ backgroundColor: accent }} />
                    </div>
                    <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl mb-4" style={{ fontFamily: '"Playfair Display", serif', color: bg }}>
                        {s('produk_section_judul', 'Solusi Kesehatan Traditional Terpercaya')}
                    </h2>
                    <div className="w-16 h-px mx-auto my-6" style={{ backgroundColor: accent }} />
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
                    {products.map((product, i) => (
                        <TiltCard key={i} className="enterprise-card group relative rounded-2xl overflow-hidden" style={{ backgroundColor: bg }}>
                            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.15 }}>
                                <div className="card-image relative h-56 sm:h-64 md:h-72 overflow-hidden" style={{ background: `linear-gradient(to bottom right, #0f2419, #2d5a47)` }}>
                                    <motion.img src={product.image} alt={product.title} className="w-full h-full object-contain p-2 sm:p-3" whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                                    <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/30">
                                        <span className="text-xs font-bold text-white">{product.num}</span>
                                    </div>
                                    <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full" style={{ backgroundColor: `${accent}e6` }}>
                                        <span className="text-[10px] font-semibold" style={{ color: primary }}>{product.badge}</span>
                                    </div>
                                </div>

                                <div className="p-4 sm:p-6 md:p-8">
                                    <p className="text-[10px] sm:text-xs font-medium tracking-wider mb-1" style={{ color: accent }}>{product.hanzi}</p>
                                    <p className="text-[10px] sm:text-xs font-medium mb-2" style={{ color: `${primary}99` }}>Nama Indonesia: {product.namaIndonesia}</p>
                                    <h3 className="font-serif text-lg sm:text-xl md:text-2xl mb-2" style={{ fontFamily: '"Playfair Display", serif', color: primary }}>{product.title}</h3>
                                    <h4 className="text-sm sm:text-base font-serif font-semibold mb-4 leading-snug italic" style={{ color: `${primary}cc` }}>{product.headline}</h4>
                                    <div className="w-12 h-px mb-4" style={{ backgroundColor: accent }} />
                                    <p className="text-xs sm:text-sm leading-relaxed mb-6" style={{ color: `${primary}b3` }}>{product.desc}</p>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {product.benefits.map((benefit, idx) => (
                                            <motion.span key={idx} className="px-3 py-1.5 text-xs rounded-full font-medium" style={{ backgroundColor: `${primary}0d`, color: primary }} whileHover={{ scale: 1.1, backgroundColor: accent, color: '#0f2419' }}>
                                                {benefit}
                                            </motion.span>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <motion.a href="https://wa.me/6285165755551" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25d366] text-white rounded-full text-sm font-medium hover:bg-[#20bd5a] transition-colors">
                                            <MessageCircle className="w-3.5 h-3.5" /> Konsultasi Produk
                                        </motion.a>
                                    </div>
                                </div>
                                <ShineEffect />
                            </motion.div>
                        </TiltCard>
                    ))}
                </div>
            </div>
        </section>
    );
}

function ProfilSection() {
    const { settings, brand } = usePage().props as any;
    const s = (k: string, fb: string) => settings?.[k] ?? fb;
    const primary = brand?.primary ?? '#1a3d2e';
    const accent = brand?.accent ?? '#c9a961';
    const bg = brand?.bg ?? '#faf8f3';
    const fotoKlinik = s('home_foto_klinik', '/images/bangunan_tcm.jpeg');

    const trustPoints = [
        { icon: Shield, title: '100% Terjamin Asli & Ber-BPOM', desc: 'Kami hanya menyediakan produk dengan stiker hologram dan izin resmi, terhindar dari maraknya produk tiruan/palsu di pasaran.' },
        { icon: Stethoscope, title: 'Dukungan Konsultasi Praktisi TCM', desc: 'Anda tidak sekadar membeli obat, tetapi mendapatkan arahan penggunaan yang tepat langsung dari praktisi TCM berpengalaman.' },
        { icon: Truck, title: 'Layanan Antar Cepat ke RS', desc: 'Kami memahami kebutuhan mendesak pasien. Barang bisa langsung dikirimkan via kurir instan ke lobi/area Rumah Sakit (RSUP Dr. M. Djamil, RS Yos Sudarso, dll) atau ke rumah Anda di area Padang.' }
    ];

    return (
        <section id="profil" className="py-14 sm:py-20 md:py-32 overflow-x-hidden" style={{ backgroundColor: bg }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="relative">
                        <div className="aspect-[4/5] rounded-2xl overflow-hidden relative bg-[#2d5a47]">
                            <motion.img src={fotoKlinik} alt="TCM Padang Clinic" className="w-full h-full object-cover" whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                            <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2" style={{ borderColor: `${accent}80` }} />
                            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2" style={{ borderColor: `${accent}80` }} />
                        </div>
                        <motion.div initial={{ opacity: 0, scale: 0.8, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} whileHover={{ y: -5, scale: 1.05 }} className="absolute -bottom-8 -right-4 md:-right-8 p-4 md:p-6 rounded-xl shadow-2xl hidden md:block" style={{ backgroundColor: bg, borderColor: `${accent}33`, borderWidth: 1 }}>
                            <div className="flex items-center gap-3 mb-2">
                                <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                                    <Sparkles className="w-5 h-5" style={{ color: accent }} />
                                </motion.div>
                                <span className="text-xs tracking-widest uppercase font-medium" style={{ color: accent }}>Premium</span>
                            </div>
                            <div className="text-3xl font-serif font-bold mb-1" style={{ fontFamily: '"Playfair Display", serif', color: primary }}>
                                <AnimatedCounter end={15} duration={2} />+
                            </div>
                            <div className="text-xs" style={{ color: `${primary}99` }}>Tahun Pengalaman</div>
                        </motion.div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
                        <div className="inline-flex items-center gap-3 mb-6">
                            <span className="w-8 h-px" style={{ backgroundColor: accent }} />
                            <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: accent }}>{s('profil_section_label', 'Mengapa Memilih Kami')}</span>
                            <span className="w-8 h-px" style={{ backgroundColor: accent }} />
                        </div>
                        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl mb-4 leading-tight" style={{ fontFamily: '"Playfair Display", serif', color: primary }}>
                            {s('profil_section_judul', 'Mengapa Harus Membeli Melalui Layanan TCM Kami di Padang?')}
                        </h2>
                        <p className="text-base leading-relaxed mb-8" style={{ color: `${primary}b3` }}>
                            {s('profil_section_desc', 'Dampingi Pemulihan Orang Terkasih Bersama Praktisi TCM Padang.')}
                        </p>

                        <div className="space-y-6">
                            {trustPoints.map((point, i) => (
                                <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} whileHover={{ x: 10 }} className="flex gap-4">
                                    <motion.div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${primary}0d`, borderColor: `${accent}33`, borderWidth: 1 }} whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.6 }}>
                                        <point.icon className="w-5 h-5" style={{ color: accent }} />
                                    </motion.div>
                                    <div>
                                        <h3 className="font-serif text-lg font-bold mb-1" style={{ fontFamily: '"Playfair Display", serif', color: primary }}>{point.title}</h3>
                                        <p className="text-sm leading-relaxed" style={{ color: `${primary}b3` }}>{point.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-3 mt-8">
                            {['Terakreditasi Resmi', 'Bersertifikat BPOM', 'Herbal Alami 100%', 'Rating 5 Bintang'].map((badge, i) => (
                                <motion.span key={i} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ scale: 1.1, y: -5 }} className="px-4 py-2 text-sm rounded-full font-medium" style={{ backgroundColor: `${primary}0d`, color: primary }}>
                                    {badge}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function LayananSection() {
    const { brand } = usePage().props as any;
    const primary = brand?.primary ?? '#1a3d2e';
    const accent = brand?.accent ?? '#c9a961';
    const bg = brand?.bg ?? '#faf8f3';

    const services = [
        { num: '01', icon: <UserCheck className="w-8 h-8" />, title: 'Konsultasi TCM', hanzi: '中医咨询', desc: 'Konsultasi langsung dengan praktisi TCM berpengalaman untuk menentukan produk dan dosis yang tepat sesuai kondisi pasien.' },
        { num: '02', icon: <Truck className="w-8 h-8" />, title: 'Pengiriman Instan RS', hanzi: '医院速递', desc: 'Kami memahami kebutuhan mendesak pasien. Barang bisa langsung dikirimkan via kurir instan ke lobi/area Rumah Sakit (RSUP Dr. M. Djamil, RS Yos Sudarso, dll) atau ke rumah Anda di area Padang.' },
        { num: '03', icon: <Stethoscope className="w-8 h-8" />, title: 'Pendampingan Pasien', hanzi: '患者陪护', desc: 'Panduan lengkap cara konsumsi, pantangan, dan monitoring pemulihan pasca-operasi atau pasca-stroke bersama keluarga.' },
        { num: '04', icon: <Shield className="w-8 h-8" />, title: 'Garansi Keaslian Produk', hanzi: '正品保证', desc: 'Jaminan 100% produk original dengan stiker hologram dan dokumen impor resmi. Uang kembali jika terbukti palsu.' }
    ];

    return (
        <section id="layanan" className="py-14 sm:py-20 md:py-32" style={{ backgroundColor: bg }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                    <div className="inline-flex items-center gap-3 mb-6">
                        <span className="w-8 h-px" style={{ backgroundColor: accent }} />
                        <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: accent }}>Layanan Profesional Kami</span>
                        <span className="w-8 h-px" style={{ backgroundColor: accent }} />
                    </div>
                    <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl mb-4" style={{ fontFamily: '"Playfair Display", serif', color: primary }}>
                        Layanan <span className="italic" style={{ color: accent }}>Profesional</span> Kami
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, i) => (
                        <TiltCard key={i} className="enterprise-card group relative p-5 sm:p-8 bg-white rounded-2xl overflow-hidden" style={{ borderColor: `${primary}1a`, borderWidth: 1 }}>
                            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1 }}>
                                <motion.div className="mb-6" style={{ color: accent }} whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.6, type: 'spring' }}>
                                    {service.icon}
                                </motion.div>
                                <div className="text-xs font-bold tracking-widest mb-2" style={{ color: accent }}>{service.num}</div>
                                <h3 className="font-serif text-xl mb-1" style={{ fontFamily: '"Playfair Display", serif', color: primary }}>{service.title}</h3>
                                <p className="text-xs font-medium tracking-wider mb-4" style={{ color: `${accent}cc` }}>{service.hanzi}</p>
                                <p className="text-sm leading-relaxed" style={{ color: `${primary}b3` }}>{service.desc}</p>
                            </motion.div>
                            <ShineEffect />
                        </TiltCard>
                    ))}
                </div>
            </div>
        </section>
    );
}

function TeamSection() {
    const { brand } = usePage().props as any;
    const primary = brand?.primary ?? '#1a3d2e';
    const accent = brand?.accent ?? '#c9a961';
    const bg = brand?.bg ?? '#faf8f3';

    const team = [
        { name: 'Jul priandi', hanzi: '七月普里亞迪', role: 'Praktisi TCM & Founder TCM Padang', image: '/images/praktisi_jul.png' }
    ];

    return (
        <section id="tim" className="py-14 sm:py-20 md:py-32" style={{ backgroundColor: primary }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                    <div className="inline-flex items-center gap-3 mb-6">
                        <span className="w-8 h-px" style={{ backgroundColor: accent }} />
                        <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: accent }}>Tim Profesional Kami</span>
                        <span className="w-8 h-px" style={{ backgroundColor: accent }} />
                    </div>
                    <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl mb-4" style={{ fontFamily: '"Playfair Display", serif', color: bg }}>
                        Tim <span className="italic" style={{ color: accent }}>Profesional</span> Kami
                    </h2>
                </motion.div>

                <div className="flex justify-center px-4">
                    {team.map((member, i) => (
                        <TiltCard key={i} className="enterprise-card group relative rounded-2xl overflow-hidden w-full max-w-sm mx-auto" style={{ backgroundColor: bg }}>
                            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                                <div className="relative h-80 overflow-hidden bg-[#2d5a47]">
                                    <motion.img src={member.image} alt={member.name} className="w-full h-full object-cover object-top" whileHover={{ scale: 1.1 }} transition={{ duration: 0.6 }} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                </div>
                                <div className="p-6 text-center">
                                    <h3 className="font-serif text-xl mb-1" style={{ fontFamily: '"Playfair Display", serif', color: primary }}>{member.name}</h3>
                                    <p className="text-xs font-medium tracking-wider mb-3" style={{ color: accent }}>{member.hanzi}</p>
                                    <p className="text-sm" style={{ color: `${primary}b3` }}>{member.role}</p>
                                </div>
                            </motion.div>
                            <ShineEffect />
                        </TiltCard>
                    ))}
                </div>
            </div>
        </section>
    );
}

function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const { brand } = usePage().props as any;
    const primary = brand?.primary ?? '#1a3d2e';
    const accent = brand?.accent ?? '#c9a961';
    const bg = brand?.bg ?? '#faf8f3';

    const faqs = [
        { question: 'Apakah produk Pien Tze Huang dan Angong Niuhuang Wan ini original?', answer: 'Ya, 100% original. Kami hanya menyediakan produk dengan stiker hologram resmi dan dokumen impor yang lengkap. Semua produk sudah tersertifikasi BPOM. Kami memberikan garansi uang kembali jika produk terbukti palsu.' },
        { question: 'Bagaimana cara konsumsi yang tepat untuk hasil optimal?', answer: 'Setiap pasien memiliki kondisi yang berbeda. Kami menyediakan konsultasi gratis dengan praktisi TCM berpengalaman yang akan memberikan panduan dosis dan cara konsumsi yang tepat sesuai kondisi kesehatan Anda.' },
        { question: 'Apakah bisa dikirim ke rumah sakit untuk pasien rawat inap?', answer: 'Tentu! Kami menyediakan layanan pengiriman instan ke RSUP Dr. M. Djamil, RS Yos Sudarso, RS Tentara, dan seluruh area Padang. Pengiriman bisa dilakukan pada hari yang sama untuk pesanan sebelum pukul 15.00 WIB.' },
        { question: 'Berapa lama proses pemulihan dengan produk TCM?', answer: 'Setiap pasien memiliki respons yang berbeda. Untuk pemulihan pasca operasi, biasanya terlihat kemajuan dalam 1-2 minggu. Untuk pemulihan stroke, proses lebih bertahap dan memerlukan konsistensi konsumsi serta pendampingan rutin.' }
    ];

    return (
        <section id="faq" className="py-14 sm:py-20 md:py-32" style={{ backgroundColor: primary }}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                    <div className="inline-flex items-center gap-3 mb-6">
                        <span className="w-8 h-px" style={{ backgroundColor: accent }} />
                        <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: accent }}>Pertanyaan Umum</span>
                        <span className="w-8 h-px" style={{ backgroundColor: accent }} />
                    </div>
                    <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl mb-4" style={{ fontFamily: '"Playfair Display", serif', color: bg }}>
                        Pertanyaan yang <span className="italic" style={{ color: accent }}>Sering Ditanyakan</span>
                    </h2>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="rounded-xl overflow-hidden" style={{ backgroundColor: `${bg}0d`, borderColor: `${accent}33`, borderWidth: 1 }} whileHover={{ scale: 1.02 }}>
                            <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full px-4 sm:px-6 py-5 flex items-center justify-between text-left">
                                <span className="text-sm sm:text-base md:text-lg font-medium pr-4" style={{ color: bg }}>{faq.question}</span>
                                <motion.div animate={{ rotate: openIndex === i ? 45 : 0 }} transition={{ duration: 0.3 }}>
                                    <Plus className="w-5 h-5 flex-shrink-0" style={{ color: accent }} />
                                </motion.div>
                            </button>
                            <motion.div initial={false} animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }} transition={{ duration: 0.4 }} className="overflow-hidden">
                                {openIndex === i && (
                                    <div className="px-4 sm:px-6 pb-5 text-sm leading-relaxed" style={{ color: `${bg}b3` }}>{faq.answer}</div>
                                )}
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function CTASection() {
    const { brand } = usePage().props as any;
    const primary = brand?.primary ?? '#1a3d2e';
    const accent = brand?.accent ?? '#c9a961';
    const bg = brand?.bg ?? '#faf8f3';

    return (
        <section className="py-14 sm:py-20 md:py-32 relative overflow-hidden" style={{ backgroundColor: primary }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25rem] font-serif select-none pointer-events-none" style={{ fontFamily: '"Playfair Display", serif', color: '#ffffff05' }}>
                藥
            </div>
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl animate-pulse-glow" style={{ backgroundColor: `${accent}0d` }} />
            <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: `${primary}80` }} />

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <div className="inline-flex items-center gap-3 mb-6">
                        <span className="w-8 h-px" style={{ backgroundColor: accent }} />
                        <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: accent }}>Konsultasi Gratis · Respons Cepat</span>
                        <span className="w-8 h-px" style={{ backgroundColor: accent }} />
                    </div>
                    <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl mb-6 leading-tight" style={{ fontFamily: '"Playfair Display", serif', color: bg }}>
                        Jangan Tunda <span className="italic" style={{ color: accent }}>Kesehatan Keluarga</span> Anda
                    </h2>
                    <p className="text-base md:text-lg mb-10 max-w-2xl mx-auto" style={{ color: `${bg}b3` }}>
                        Dapatkan konsultasi gratis dengan praktisi TCM berpengalaman. Produk original, pengiriman cepat ke RS & rumah, garansi keaslian 100%.
                    </p>

                    <motion.a href="https://wa.me/6285165755551" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#059669] text-white font-semibold rounded-full hover:bg-[#047857] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm md:text-base mb-12" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                            <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                        </motion.div>
                        konsultasi sekarang
                        <ArrowUpRight className="w-4 h-4" />
                    </motion.a>

                    <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-sm" style={{ color: `${bg}99` }}>
                        {['Respons < 1 Jam', 'Antar ke RS', 'Garansi Original', 'Praktisi Ahli'].map((point, i) => (
                            <motion.span key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center gap-2">
                                <motion.span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }} />
                                {point}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function LokasiSection() {
    const { settings, brand } = usePage().props as any;
    const s = (k: string, fb: string) => settings?.[k] ?? fb;
    const primary = brand?.primary ?? '#1a3d2e';
    const accent = brand?.accent ?? '#c9a961';
    const bg = brand?.bg ?? '#faf8f3';
    const fotoKlinik = s('home_foto_klinik', '/images/bangunan_tcm.jpeg');

    return (
        <section id="lokasi" className="py-14 sm:py-20 md:py-32 overflow-x-hidden" style={{ backgroundColor: bg }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                    <div className="inline-flex items-center gap-3 mb-6">
                        <span className="w-8 h-px" style={{ backgroundColor: accent }} />
                        <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: accent }}>Kunjungi Klinik Kami</span>
                        <span className="w-8 h-px" style={{ backgroundColor: accent }} />
                    </div>
                    <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl mb-4" style={{ fontFamily: '"Playfair Display", serif', color: primary }}>
                        Lokasi & <span className="italic" style={{ color: accent }}>Jam Operasional</span>
                    </h2>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
                    <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white p-5 sm:p-8 rounded-2xl" style={{ borderColor: `${primary}1a`, borderWidth: 1 }} whileHover={{ y: -5 }}>
                        <h3 className="font-serif text-xl sm:text-2xl mb-6" style={{ fontFamily: '"Playfair Display", serif', color: primary }}>TCM PADANG | Traditional Care</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: accent }} />
                                <p className="text-sm" style={{ color: `${primary}b3` }}>Jl. Tampat Durian, RT.001/RW.004, Korong Gadang, Kec. Kuranji, Kota Padang, Sumatera Barat 25156</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <Clock className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: accent }} />
                                <div className="text-sm" style={{ color: `${primary}b3` }}>
                                    <p className="font-semibold mb-1">Senin - Sabtu:</p>
                                    <p>08.00 - 17.00 WIB</p>
                                    <p className="font-semibold mt-2 mb-1">Minggu & Hari Besar:</p>
                                    <p>09.00 - 15.00 WIB (By Appointment)</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Phone className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: accent }} />
                                <div className="text-sm" style={{ color: `${primary}b3` }}>
                                    <p>WhatsApp: +62 851-6575-5551</p>
                                    <p>Telp: +62 851-6575-5551</p>
                                </div>
                            </div>
                        </div>
                        <motion.a href="https://maps.app.goo.gl/n3sS9LbGUucVCumd9" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full text-sm font-medium transition-colors" style={{ backgroundColor: primary, color: bg }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            Buka di Google Maps <ExternalLink className="w-4 h-4" />
                        </motion.a>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-2xl overflow-hidden relative h-80 lg:h-auto bg-[#2d5a47]" whileHover={{ y: -5 }}>
                        <motion.img src={fotoKlinik} alt="Lokasi Klinik TCM Padang" className="w-full h-full object-cover" whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6">
                            <p className="text-white font-semibold text-lg">TCM Padang Traditional care</p>
                            <p className="text-white/80 text-sm">Jl. Tampat Durian, Padang</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function HerbalConsultSection() {
    const { brand } = usePage().props as any;
    const primary = brand?.primary ?? '#1a3d2e';
    const accent = brand?.accent ?? '#c9a961';
    const bg = brand?.bg ?? '#faf8f3';
    const keluhan = ['Diabetes', 'Hipertensi', 'Pemulihan Stamina', 'Kolesterol', 'Asam Urat', 'Keluhan Lainnya'];

    return (
        <section className="relative py-14 sm:py-20 md:py-24 overflow-hidden" style={{ backgroundColor: primary }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18rem] md:text-[24rem] font-serif select-none pointer-events-none" style={{ fontFamily: '"Playfair Display", serif', color: '#ffffff05' }}>
                草
            </div>
            <div className="absolute top-0 left-0 w-72 h-72 rounded-full blur-3xl" style={{ backgroundColor: `${accent}0d` }} />

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                    <div className="inline-flex items-center gap-3 mb-6">
                        <span className="w-8 h-px" style={{ backgroundColor: accent }} />
                        <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: accent }}>Konsultasi & Formulasi Herbal · 草本</span>
                        <span className="w-8 h-px" style={{ backgroundColor: accent }} />
                    </div>

                    <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl mb-6 leading-tight" style={{ fontFamily: '"Playfair Display", serif', color: bg }}>
                        Butuh Herbal Traditional Lain atau <span className="italic" style={{ color: accent }}>Ingin Konsultasi Khusus?</span>
                    </h2>

                    <p className="text-sm md:text-base leading-relaxed mb-8 max-w-2xl mx-auto" style={{ color: `${bg}b3` }}>
                        Selain Angkung dan Pien Tze Huang, kami juga menyediakan konsultasi dan pendampingan resep herbal TCM yang disesuaikan dengan kondisi kesehatan pasien. Hubungi kami untuk diskusi lebih lanjut.
                    </p>

                    <div className="flex flex-wrap justify-center gap-2 mb-10">
                        {keluhan.map((item, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 + i * 0.08 }}
                                whileHover={{ scale: 1.08, y: -3 }}
                                className="px-4 py-2 rounded-full text-xs md:text-sm font-medium"
                                style={{ backgroundColor: `${bg}0d`, borderColor: `${accent}40`, borderWidth: 1, color: `${bg}cc` }}
                            >
                                {item}
                            </motion.span>
                        ))}
                    </div>

                    <motion.a
                        href="https://wa.me/6285165755551?text=Halo%20TCM%20Padang%2C%20saya%20ingin%20konsultasi%20keluhan%20lain%20dan%20membutuhkan%20rekomendasi%20herbal%20TCM."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#059669] text-white font-semibold rounded-full hover:bg-[#047857] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm md:text-base"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                        Konsultasi Keluhan Lain via WhatsApp
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}

function Footer() {
    const { brand } = usePage().props as any;
    const primary = brand?.primary ?? '#1a3d2e';
    const accent = brand?.accent ?? '#c9a961';
    const bg = brand?.bg ?? '#faf8f3';

    return (
        <footer className="py-12" style={{ backgroundColor: '#0f2419', color: `${bg}99` }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                    <div className="flex items-center gap-3">
                        <motion.img src="/images/logo-tcm.webp" alt="TCM Padang" className="w-10 h-10 object-contain" animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }} />
                        <div className="flex flex-col leading-tight">
                            <span className="text-sm font-semibold" style={{ color: bg }}>TCM Padang</span>
                            <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: accent }}>Traditional care</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-6 text-xs">
                        <a href="#" className="hover:text-[#c9a961] transition-colors" style={{ color: `${bg}99` }}>Privasi</a>
                        <a href="#" className="hover:text-[#c9a961] transition-colors" style={{ color: `${bg}99` }}>Ketentuan</a>
                        <a href="/kontak" className="hover:text-[#c9a961] transition-colors" style={{ color: `${bg}99` }}>Kontak</a>
                    </div>
                </div>
                <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs" style={{ borderTopColor: primary, borderTopWidth: 1 }}>
                    <p className="text-center md:text-left">© 2026 TCM Padang · 传统中医 · Sumatera Barat. All rights reserved.</p>
                    <img src="/images/logo-tcm.webp" alt="TCM Padang" className="w-8 h-8 object-contain opacity-50" />
                </div>
            </div>
        </footer>
    );
}

function FloatingWhatsApp() {
    return (
        <motion.a href="https://wa.me/6285165755551" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2, duration: 0.5 }} whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }} whileTap={{ scale: 0.9 }} className="fixed bottom-6 right-6 w-14 h-14 bg-[#25d366] rounded-full flex items-center justify-center shadow-2xl shadow-[#25d366]/30 z-40">
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                <MessageCircle className="w-6 h-6 text-white" />
            </motion.div>
        </motion.a>
    );
}

export default function Welcome() {
    return (
        <>
            <Head title="Obat China di Padang Asli Ber-BPOM | TCM Padang">
                <meta name="description" content="Obat china & tradisional Tiongkok asli ber-BPOM di Padang. Konsultasi praktisi TCM berpengalaman, layanan ramah lansia. Kunjungi kami di Kuranji atau chat WA." />
            </Head>
            <Preloader />
            <GrainOverlay />
            <Navbar />
            <main>
                <Hero />
                <WaveTransition from="#faf8f3" to="#1a3d2e" />
                <ProductSection />
                <ProfilSection />
                <LayananSection />
                <TeamSection />
                <FAQSection />
                <CTASection />
                <LokasiSection />
                <HerbalConsultSection />
            </main>
            <Footer />
            <FloatingWhatsApp />
        </>
    );
}