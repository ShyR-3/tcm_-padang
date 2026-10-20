import { Head } from '@inertiajs/react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import Navbar from '@/Components/Navbar';

function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
    return <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#c9a961] to-[#059669] origin-left z-50" style={{ scaleX }} />;
}

function FloatingWhatsApp() {
    return (
        <motion.a href="https://wa.me/6285165755551" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1, duration: 0.5 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="fixed bottom-6 right-6 w-14 h-14 bg-[#25d366] rounded-full flex items-center justify-center shadow-2xl z-40">
            <MessageCircle className="w-6 h-6 text-white" />
        </motion.a>
    );
}

function Footer() {
    return (
        <footer className="bg-[#0f2419] text-[#faf8f3]/60 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-sm">
                <p>© 2026 TCM Padang · Traditional Chinese Medicine</p>
            </div>
        </footer>
    );
}

type Page = {
    title: string;
    slug: string;
    meta_description: string;
    content: string;
};

export default function ShowPage({ page }: { page: Page }) {
    return (
        <>
            <Head title={`${page.title} | TCM Padang`}>
                {page.meta_description && <meta name="description" content={page.meta_description} />}
            </Head>
            <ScrollProgress />
            <Navbar />

            <main className="bg-[#faf8f3] pt-32 pb-20 min-h-screen">
                <article className="max-w-3xl mx-auto px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-serif text-4xl md:text-5xl text-[#1a3d2e] mb-8"
                        style={{ fontFamily: '"Playfair Display", serif' }}
                    >
                        {page.title}
                    </motion.h1>

                    <div
                        className="prose prose-lg prose-emerald max-w-none prose-headings:font-serif prose-headings:text-[#1a3d2e] prose-p:text-[#1a3d2e]/80 prose-a:text-[#059669] prose-img:rounded-2xl prose-img:shadow-xl"
                        style={{ fontFamily: 'system-ui' }}
                        dangerouslySetInnerHTML={{ __html: page.content }}
                    />
                </article>
            </main>

            <Footer />
            <FloatingWhatsApp />
        </>
    );
}
