import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { MessageCircle, Pill, Shield, Truck, Heart } from 'lucide-react';
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

export default function Layanan() {
    const { settings } = usePage().props as any;
    const s = (k: string, fb: string) => settings?.[k] ?? fb;

    const items = [
        { icon: MessageCircle, t: s('layanan_1_judul', ''), d: s('layanan_1_desc', '') },
        { icon: Shield, t: s('layanan_2_judul', ''), d: s('layanan_2_desc', '') },
        { icon: Truck, t: s('layanan_3_judul', ''), d: s('layanan_3_desc', '') },
        { icon: Heart, t: s('layanan_4_judul', ''), d: s('layanan_4_desc', '') },
    ];

    return (
        <>
            <Head title={`${s('layanan_judul', 'Layanan')} | TCM Padang`}>
                <meta name="description" content={s('layanan_tagline', 'Layanan TCM Padang')} />
            </Head>
            <Navbar />

            <header className="relative overflow-hidden bg-[#1a3d2e] pt-32 pb-20">
                <div className="absolute inset-0 bg-gradient-to-b from-[#1a3d2e] to-[#0f2419]" />
                <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-serif text-4xl md:text-6xl text-[#faf8f3]" style={{ fontFamily: '"Playfair Display", serif' }}>
                        {s('layanan_judul', 'Layanan Kami')}
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mt-4 text-lg text-[#faf8f3]/70 max-w-2xl mx-auto">
                        {s('layanan_tagline', '')}
                    </motion.p>
                </div>
            </header>

            <main className="bg-[#faf8f3] py-16 md:py-24">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        {items.map((item, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white rounded-3xl border border-[#1a3d2e]/10 p-8 shadow-sm hover:shadow-xl transition-shadow">
                                <span className="inline-grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[#1a3d2e] to-emerald-800 text-white mb-5"><item.icon className="w-7 h-7" /></span>
                                <h3 className="font-serif text-2xl text-[#1a3d2e] mb-3" style={{ fontFamily: '"Playfair Display", serif' }}>{item.t}</h3>
                                <div className="w-12 h-px bg-[#c9a961] mb-4" />
                                <p className="text-[#1a3d2e]/70 leading-relaxed">{item.d}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-16 bg-gradient-to-br from-[#1a3d2e] to-emerald-900 rounded-3xl p-10 text-center shadow-xl">
                        <h2 className="font-serif text-3xl text-[#faf8f3] mb-3" style={{ fontFamily: '"Playfair Display", serif' }}>Butuh Bantuan Sekarang?</h2>
                        <p className="text-[#faf8f3]/70 mb-6">Konsultasikan kondisi Anda gratis dengan praktisi kami.</p>
                        <a href="https://wa.me/6285165755551" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#c9a961] text-[#1a3d2e] font-bold px-8 py-4 rounded-full hover:bg-[#d4b876] shadow-lg">
                            <MessageCircle className="w-5 h-5" /> Hubungi via WhatsApp
                        </a>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}