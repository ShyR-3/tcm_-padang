import { Link } from '@inertiajs/react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileOpen]);

    const links = [
        { label: 'Home', href: '/' },
        { label: 'Produk', href: '/products' },
        { label: 'Profil', href: '/profil' },
        { label: 'Layanan', href: '/layanan' },
        { label: 'Kontak', href: '/kontak' },
    ];

    const menuItemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: 0.15 + i * 0.08, duration: 0.5, ease: [0.22, 0.84, 0.38, 1] }
        })
    };

    return (
        <>
            {/* ============ NAVBAR (terpisah dari overlay) ============ */}
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 0.84, 0.38, 1] }}
                className={cn(
                    'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
                    mobileOpen
                        ? 'bg-transparent py-5'
                        : scrolled
                            ? 'bg-[#faf8f3]/95 backdrop-blur-xl border-b border-[#1a3d2e]/10 py-4 shadow-lg'
                            : 'bg-[#faf8f3]/90 backdrop-blur-xl border-b border-[#1a3d2e]/5 py-6'
                )}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
                        <img src="/images/logo-tcm.webp" alt="TCM Padang" className="w-10 h-10 object-contain" />
                        <div className="flex flex-col leading-tight">
                            <span className={cn('text-sm font-semibold transition-colors', mobileOpen ? 'text-white' : 'text-[#1a3d2e]')}>
                                TCM Padang
                            </span>
                            <span className="text-[10px] tracking-[0.2em] text-[#c9a961] uppercase">Traditional care</span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-8">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="relative text-sm font-medium text-[#1a3d2e]/70 hover:text-[#1a3d2e] transition-colors group"
                            >
                                {link.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#c9a961] transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <Link
                        href="https://wa.me/6285165755551"
                        className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 bg-[#25d366] text-white rounded-full text-sm font-medium hover:bg-[#20bd5a] transition-all duration-300 shadow-lg shadow-[#25d366]/20 hover:-translate-y-0.5"
                    >
                        <MessageCircle className="w-4 h-4" /> Konsultasi
                    </Link>

                    {/* Hamburger Button (tetap di atas overlay karena nav z-50) */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
                        aria-label="Toggle menu"
                        type="button"
                    >
                        <span className={cn('w-6 h-0.5 transition-all duration-300', mobileOpen ? 'bg-white rotate-45 translate-y-2' : 'bg-[#1a3d2e]')} />
                        <span className={cn('w-6 h-0.5 transition-all duration-300', mobileOpen ? 'opacity-0' : 'bg-[#1a3d2e]')} />
                        <span className={cn('w-6 h-0.5 transition-all duration-300', mobileOpen ? 'bg-white -rotate-45 -translate-y-2' : 'bg-[#1a3d2e]')} />
                    </button>
                </div>
            </motion.nav>

            {/* ============ MOBILE MENU OVERLAY (SIBLING, bukan anak nav!) ============ */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-[#0f2419] lg:hidden"
                    >
                        {/* Pattern dekoratif */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                            style={{ backgroundImage: 'radial-gradient(circle, #c9a961 1px, transparent 1px)', backgroundSize: '24px 24px' }}
                        />

                        {/* Karakter dekoratif */}
                        <div className="absolute bottom-10 right-6 text-[10rem] font-serif text-white/[0.04] select-none pointer-events-none" style={{ fontFamily: '"Playfair Display", serif' }}>
                            藥
                        </div>

                        {/* Konten Menu */}
                        <div className="relative h-full overflow-y-auto px-6 pt-28 pb-10 flex flex-col">
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="text-xs tracking-[0.3em] uppercase text-[#c9a961] mb-6"
                            >
                                Menu Navigasi
                            </motion.p>

                            {links.map((link, i) => (
                                <motion.div key={link.href} custom={i} variants={menuItemVariants} initial="hidden" animate="visible">
                                    <Link
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="flex items-center justify-between py-5 border-b border-white/10 text-3xl font-serif font-medium text-white hover:text-[#c9a961] hover:pl-2 transition-all duration-300"
                                        style={{ fontFamily: '"Playfair Display", serif' }}
                                    >
                                        {link.label}
                                        <span className="text-[#c9a961] text-xl">→</span>
                                    </Link>
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="mt-10"
                            >
                                <Link
                                    href="https://wa.me/6285165755551"
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center justify-center gap-3 px-8 py-4 bg-[#25d366] text-white rounded-full font-bold shadow-lg shadow-[#25d366]/30 active:scale-95 transition-transform"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    Konsultasi via WhatsApp
                                </Link>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="mt-auto pt-10 text-center"
                            >
                                <p className="text-white/60 text-sm mb-1">TCM Padang Traditional care</p>
                                <p className="text-white/40 text-xs">Traditional Chinese Medicine · Padang</p>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}