import { Head, Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Award, Heart, MessageCircle, Shield } from 'lucide-react';
import Navbar from '@/Components/Navbar';

function Footer() {
    return (
        <footer className="bg-[#0f2419] text-[#faf8f3]/60 py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-sm">
                <p>© 2026 TCM Padang · Traditional Chinese Medicine · Sumatera Barat</p>
            </div>
        </footer>
    );
}

export default function Profil() {
    const { settings } = usePage().props as any;
    const s = (k: string, fb: string) => settings?.[k] ?? fb;

    return (
        <>
            <Head title={`${s('profil_judul', 'Profil')} | TCM Padang`}>
                <meta name="description" content={s('profil_tagline', 'Profil TCM Padang')} />
            </Head>
            <Navbar />

            <header className="relative overflow-hidden bg-[#1a3d2e] pt-32 pb-20">
                <div className="absolute inset-0 bg-gradient-to-b from-[#1a3d2e] to-[#0f2419]" />
                <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-serif text-4xl md:text-6xl text-[#faf8f3]" style={{ fontFamily: '"Playfair Display", serif' }}>
                        {s('profil_judul', 'Praktisi TCM Terpercaya di Padang')}
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mt-4 text-lg text-[#faf8f3]/70 max-w-2xl mx-auto">
                        {s('profil_tagline', '')}
                    </motion.p>
                </div>
            </header>

            <main className="bg-[#faf8f3] py-16 md:py-24">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="grid lg:grid-cols-2 gap-10 items-center mb-16">
                        <div className="overflow-hidden rounded-3xl shadow-2xl">
                            <img src="/images/Bangunan_TCM.jpeg" alt="Toko TCM Padang" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h2 className="font-serif text-3xl text-[#1a3d2e] mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>Tentang Kami</h2>
                            <div className="w-16 h-px bg-[#c9a961] mb-6" />
                            <p className="text-[#1a3d2e]/70 leading-relaxed">{s('profil_tentang', '')}</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-[#1a3d2e]/10 shadow-xl p-8 md:p-12 mb-16">
                        <div className="grid md:grid-cols-[auto,1fr] gap-8 items-center">
                            <img src="/images/praktisi_jul.png" alt={s('profil_praktisi_nama', 'Praktisi')} className="w-40 h-40 rounded-2xl object-cover shadow-lg" />
                            <div>
                                <h3 className="font-serif text-2xl text-[#1a3d2e]" style={{ fontFamily: '"Playfair Display", serif' }}>{s('profil_praktisi_nama', '')}</h3>
                                <p className="text-[#c9a961] font-semibold text-sm mt-1">{s('profil_praktisi_jabatan', '')}</p>
                                <p className="text-[#1a3d2e]/70 mt-4 leading-relaxed">{s('profil_praktisi_bio', '')}</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { icon: Shield, t: '100% Original', d: 'Garansi uang kembali jika terbukti palsu.' },
                            { icon: Award, t: 'BPOM Certified', d: 'Seluruh produk terdaftar resmi.' },
                            { icon: Heart, t: 'Pendampingan', d: 'Konsultasi dan evaluasi berkala.' },
                        ].map((v, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl border border-[#1a3d2e]/10 p-6 text-center shadow-sm">
                                <span className="inline-grid h-12 w-12 place-items-center rounded-full bg-[#c9a961]/10 border border-[#c9a961]/20 mb-4"><v.icon className="w-6 h-6 text-[#c9a961]" /></span>
                                <h4 className="font-serif text-lg text-[#1a3d2e]" style={{ fontFamily: '"Playfair Display", serif' }}>{v.t}</h4>
                                <p className="text-sm text-[#1a3d2e]/60 mt-2">{v.d}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-16">
                        <a href="https://wa.me/6285165755551" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#059669] text-white font-bold px-8 py-4 rounded-full hover:bg-[#047857] shadow-lg">
                            <MessageCircle className="w-5 h-5" /> Konsultasi Sekarang
                        </a>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}