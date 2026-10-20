import { Head, Link } from '@inertiajs/react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { MessageCircle, CheckCircle, Shield, ChevronRight, ChevronLeft, Clock, ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';
import Navbar from '@/Components/Navbar';
import { products, findProduct } from '@/data/products';

function GrainOverlay() {
    return <div className="grain-overlay hidden md:block" />;
}

function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
    return <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#c9a961] to-[#059669] origin-left z-50" style={{ scaleX }} />;
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
                        <Link href="/kontak" className="hover:text-[#c9a961] transition-colors">Kontak</Link>
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

export default function ProductShow({ slug }: { slug: string }) {
    const product = findProduct(slug);
    const gallery = product ? [product.image, ...product.gallery.filter((g) => g !== product.image)] : [];
    const [active, setActive] = useState(gallery[0] ?? '');

    useEffect(() => {
        if (product) setActive(product.image);
    }, [slug]);

    if (!product) {
        return (
            <>
                <Head title="Produk Tidak Ditemukan | TCM Padang" />
                <GrainOverlay />
                <ScrollProgress />
                <Navbar />
                <main className="flex min-h-[60vh] items-center justify-center bg-[#faf8f3] px-4 pt-20">
                    <div className="rounded-3xl border border-[#1a3d2e]/10 bg-white p-10 text-center shadow-2xl">
                        <h1 className="font-serif text-3xl text-[#1a3d2e]" style={{ fontFamily: '"Playfair Display", serif' }}>
                            Produk tidak ditemukan
                        </h1>
                        <p className="mt-3 text-[#1a3d2e]/70">Mungkin tautan yang Anda kunjungi sudah berubah.</p>
                        <Link href="/products" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#059669] px-6 py-3 font-semibold text-white hover:bg-[#047857]">
                            <ChevronLeft className="w-4 h-4" /> Kembali ke Katalog
                        </Link>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    const waLink = `https://wa.me/6285165755551?text=${encodeURIComponent(`Halo TCM Padang, saya ingin bertanya tentang ${product.name}.`)}`;
    const others = products.filter((p) => p.slug !== product.slug).slice(0, 2);

    return (
        <>
            <Head title={`${product.name} – Obat China Asli di Padang | TCM Padang`}>
                <meta name="description" content={product.tagline} />
                <link rel="canonical" href={`https://tcmpadang.com/products/${product.slug}`} />
                <meta property="og:type" content="product" />
                <meta property="og:title" content={`${product.name} | TCM Padang`} />
                <meta property="og:description" content={product.tagline} />
                <meta property="og:image" content={`https://tcmpadang.com${product.image}`} />
                <meta property="og:url" content={`https://tcmpadang.com/products/${product.slug}`} />
            </Head>

            <GrainOverlay />
            <ScrollProgress />
            <Navbar />

            {/* HERO — tema sama seperti halaman produk */}
            <header className="relative overflow-hidden bg-[#1a3d2e] pb-16 pt-32">
                <div className="absolute inset-0 bg-gradient-to-b from-[#1a3d2e] to-[#0f2419]" />
                <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
                    <motion.nav initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center gap-2 text-sm text-[#c9a961]">
                        <Link href="/" className="transition-colors hover:text-[#faf8f3]">Beranda</Link>
                        <span className="text-[#c9a961]/40">/</span>
                        <Link href="/products" className="transition-colors hover:text-[#faf8f3]">Produk</Link>
                        <span className="text-[#c9a961]/40">/</span>
                        <span className="text-[#faf8f3]">{product.name}</span>
                    </motion.nav>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="mt-6 font-serif text-4xl text-[#faf8f3] md:text-6xl" style={{ fontFamily: '"Playfair Display", serif' }}>
                        {product.name}
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-4 max-w-2xl text-lg text-[#faf8f3]/70">
                        {product.tagline}
                    </motion.p>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-8 flex flex-wrap items-center gap-6">
                        <div className="flex items-center gap-2 text-sm text-[#faf8f3]/60">
                            <CheckCircle className="h-5 w-5 text-[#c9a961]" />
                            <span>100% Original</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#faf8f3]/60">
                            <Shield className="h-5 w-5 text-[#c9a961]" />
                            <span>BPOM Certified</span>
                        </div>
                    </motion.div>
                </div>
            </header>

            {/* KONTEN */}
            <main className="bg-[#faf8f3] py-16 md:py-24">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <div className="grid gap-10 lg:grid-cols-2">
                        {/* GALERI */}
                        <div>
                            <div className="overflow-hidden rounded-3xl border border-[#1a3d2e]/10 bg-white shadow-2xl">
                                <motion.img
                                    key={active}
                                    src={active}
                                    alt={`${product.name} asli ber-BPOM di TCM Padang`}
                                    className="aspect-square w-full object-cover"
                                    initial={{ opacity: 0, scale: 1.03 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4 }}
                                />
                            </div>
                            {gallery.length > 1 && (
                                <div className="mt-4 flex gap-3">
                                    {gallery.map((g) => (
                                        <button
                                            key={g}
                                            onClick={() => setActive(g)}
                                            className={`overflow-hidden rounded-xl border-2 transition ${active === g ? 'border-[#c9a961]' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                        >
                                            <img src={g} alt="" className="h-20 w-20 object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* INFO */}
                        <div>
                            <h2 className="font-serif text-2xl text-[#1a3d2e]" style={{ fontFamily: '"Playfair Display", serif' }}>
                                Manfaat Utama
                            </h2>
                            <div className="mt-4 grid grid-cols-1 gap-3">
                                {product.benefits.map((b, i) => (
                                    <motion.div key={b} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex items-center gap-3 rounded-lg bg-[#1a3d2e]/5 p-3">
                                        <CheckCircle className="h-5 w-5 flex-shrink-0 text-[#059669]" />
                                        <span className="text-sm text-[#1a3d2e]">{b}</span>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-8 h-px w-16 bg-[#c9a961]" />

                            <h2 className="mt-8 font-serif text-2xl text-[#1a3d2e]" style={{ fontFamily: '"Playfair Display", serif' }}>
                                Deskripsi
                            </h2>
                            <p className="mt-3 text-sm leading-relaxed text-[#1a3d2e]/70">{product.description}</p>

                            <h2 className="mt-6 font-serif text-2xl text-[#1a3d2e]" style={{ fontFamily: '"Playfair Display", serif' }}>
                                Anjuran Pemakaian
                            </h2>
                            <div className="mt-3 flex gap-3">
                                <Clock className="h-5 w-5 flex-shrink-0 text-[#c9a961]" />
                                <p className="text-sm leading-relaxed text-[#1a3d2e]/70">{product.usage}</p>
                            </div>

                            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                                <motion.a
                                    href={waLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#059669] px-8 py-4 font-bold text-white shadow-lg hover:bg-[#047857]"
                                >
                                    <MessageCircle className="h-5 w-5" /> Tanya via WhatsApp <ExternalLink className="h-4 w-4" />
                                </motion.a>
                                <Link
                                    href="/products"
                                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-[#1a3d2e] px-8 py-4 font-bold text-[#1a3d2e] transition hover:bg-[#1a3d2e] hover:text-[#faf8f3]"
                                >
                                    Semua Produk <ChevronRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* PRODUK LAINNYA — gaya kartu sama seperti halaman katalog */}
                    {others.length > 0 && (
                        <section className="mt-24">
                            <h2 className="text-center font-serif text-3xl text-[#1a3d2e] md:text-4xl" style={{ fontFamily: '"Playfair Display", serif' }}>
                                Produk <span className="italic text-[#c9a961]">Lainnya</span>
                            </h2>
                            <div className="mt-10 grid gap-6 md:grid-cols-2">
                                {others.map((p) => (
                                    <Link key={p.slug} href={`/products/${p.slug}`} className="group flex gap-5 rounded-2xl border border-[#1a3d2e]/10 bg-white p-5 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">
                                        <img src={p.image} alt={p.name} className="h-24 w-24 flex-none rounded-xl object-cover" />
                                        <div>
                                            <h3 className="font-serif text-xl text-[#1a3d2e] group-hover:text-[#c9a961]" style={{ fontFamily: '"Playfair Display", serif' }}>
                                                {p.name}
                                            </h3>
                                            <p className="mt-1 line-clamp-2 text-sm text-[#1a3d2e]/70">{p.tagline}</p>
                                            <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-[#059669]">
                                                Lihat Detail <ChevronRight className="h-4 w-4" />
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>

            <Footer />
            <FloatingWhatsApp />
        </>
    );
}