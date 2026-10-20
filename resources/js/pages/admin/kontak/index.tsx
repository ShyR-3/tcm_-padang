import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
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

export default function Kontak() {
    const { settings } = usePage().props as any;
    const s = (k: string, fb: string) => settings?.[k] ?? fb;

    const cards = [
        { icon: MapPin, t: 'Alamat', d: s('kontak_alamat', '') },
        { icon: Phone, t: 'WhatsApp', d: s('kontak_wa', '') },
        { icon: Clock, t: 'Jam Operasional', d: s('kontak_jam', '') },
        { icon: Mail, t: 'Email', d: s('kontak_email', '') },
    ];

    return (
        <>
            <Head title={`${s('kontak_judul', 'Kontak')} | TCM Padang`}>
                <meta name="description" content={s('kontak_tagline', 'Kontak TCM Padang')} />
            </Head>
            <Navbar />

            <header className="relative overflow-hidden bg-[#1a3d2e] pt-32 pb-20">
                <div className="absolute inset-0 bg-gradient-to-b from-[#1a3d2e] to-[#0f2419]" />
                <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-serif text-4xl md:text-6xl text-[#faf8f3]" style={{ fontFamily: '"Playfair Display", serif' }}>
                        {s('kontak_judul', 'Hubungi Kami')}
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mt-4 text-lg text-[#faf8f3]/70 max-w-2xl mx-auto">
                        {s('kontak_tagline', '')}
                    </motion.p>
                </div>
            </header>

            <main className="bg-[#faf8f3] py-16 md:py-24">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="grid sm:grid-cols-2 gap-6 mb-12">
                        {cards.map((c, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl border border-[#1a3d2e]/10 p-6 flex gap-4 shadow-sm">
                                <span className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-xl bg-[#c9a961]/10 border border-[#c9a961]/20"><c.icon className="w-6 h-6 text-[#c9a961]" /></span>
                                <div>
                                    <h3 className="font-semibold text-[#1a3d2e]">{c.t}</h3>
                                    <p className="text-sm text-[#1a3d2e]/70 mt-1 whitespace-pre-line">{c.d}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="bg-white rounded-3xl border border-[#1a3d2e]/10 shadow-xl p-10 text-center">
                        <h2 className="font-serif text-3xl text-[#1a3d2e] mb-3" style={{ fontFamily: '"Playfair Display", serif' }}>Konsultasi Gratis</h2>
                        <p className="text-[#1a3d2e]/70 mb-6 max-w-xl mx-auto">Sampaikan keluhan atau pertanyaan Anda. Praktisi kami akan merespons secepatnya pada jam operasional.</p>
                        <a href="https://wa.me/6285165755551" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#059669] text-white font-bold px-8 py-4 rounded-full hover:bg-[#047857] shadow-lg">
                            <MessageCircle className="w-5 h-5" /> Chat WhatsApp Sekarang
                        </a>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}