import { Head, Link, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import {
    CheckCircle2, ChevronDown, Eye, FileText, Globe, Heart, History,
    LogOut, PenSquare, Plus, Settings2, Sparkles, UserCircle,
} from 'lucide-react';

function TopBar() {
    const { auth } = usePage().props as any;
    const user = auth?.user;
    const [open, setOpen] = useState(false);
    const initials = user?.name ? user.name.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase() : 'AD';
    return (
        <header className="bg-[#1a3d2e] text-[#faf8f3] sticky top-0 z-30 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
                <Link href="/admin" className="flex items-center gap-3">
                    <span className="h-10 w-10 rounded-full bg-gradient-to-br from-[#c9a961] to-amber-700 grid place-items-center shadow"><Heart className="h-5 w-5 text-white" /></span>
                    <span><span className="block font-semibold leading-tight">TCM Padang Admin</span><span className="block text-xs text-[#c9a961]">CMS</span></span>
                </Link>
                <div className="flex items-center gap-2">
                    <a href="/" target="_blank" className="hidden sm:flex items-center gap-2 text-sm text-[#c9a961] hover:text-white px-3 py-2"><Globe className="w-4 h-4" /> Website</a>
                    <div className="relative">
                        <button onClick={() => setOpen(!open)} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-xl px-2.5 py-1.5">
                            <span className="h-8 w-8 rounded-full bg-gradient-to-br from-[#c9a961] to-amber-700 grid place-items-center text-sm font-bold">{initials}</span>
                            <ChevronDown className={`w-4 h-4 transition ${open ? 'rotate-180' : ''}`} />
                        </button>
                        {open && (<>
                            <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden z-20 text-stone-800">
                                <div className="px-4 py-3 bg-stone-50 border-b border-stone-100">
                                    <p className="text-sm font-semibold truncate">{user?.name}</p>
                                    <p className="text-xs text-stone-500 truncate">{user?.email}</p>
                                </div>
                                <Link href="/admin/profile" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-stone-50"><UserCircle className="w-4 h-4 text-[#c9a961]" /> Profil & Password</Link>
                                <button onClick={() => router.post('/admin/logout')} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50"><LogOut className="w-4 h-4" /> Keluar</button>
                            </div>
                        </>)}
                    </div>
                </div>
            </div>
        </header>
    );
}

function Toast() {
    const { flash } = usePage().props as any;
    const [msg, setMsg] = useState<string | null>(null);
    useEffect(() => {
        if (flash?.success) { setMsg(flash.success); const t = setTimeout(() => setMsg(null), 4000); return () => clearTimeout(t); }
    }, [flash?.success]);
    if (!msg) return null;
    return (
        <div className="fixed top-20 right-4 z-50 flex items-center gap-3 bg-white border border-emerald-200 shadow-2xl rounded-2xl px-5 py-4 max-w-sm">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" /><p className="text-sm font-medium text-stone-800">{msg}</p>
        </div>
    );
}

type Stats = { total: number; published: number; draft: number };

export default function Dashboard({ stats }: { stats?: Stats }) {
    const { auth, flash } = usePage().props as any;
    const s = stats ?? { total: 0, published: 0, draft: 0 };

    const cards = [
        { label: 'Total Halaman', value: s.total, icon: FileText, bg: 'bg-emerald-100', fg: 'text-emerald-700' },
        { label: 'Terbit', value: s.published, icon: Globe, bg: 'bg-amber-100', fg: 'text-amber-700' },
        { label: 'Draft', value: s.draft, icon: PenSquare, bg: 'bg-slate-200', fg: 'text-slate-700' },
    ];

    const quickActions = [
        { title: 'Halaman Baru', desc: 'Tulis dengan editor visual', href: '/admin/pages/create', icon: Plus, gradient: 'from-emerald-500 to-emerald-700', external: false },
        { title: 'Kelola Halaman', desc: 'Edit, hapus, terbitkan', href: '/admin/pages', icon: FileText, gradient: 'from-[#c9a961] to-amber-600', external: false },
        { title: 'Konten Website', desc: 'Edit warna, foto & teks halaman bawaan', href: '/admin/content', icon: Settings2, gradient: 'from-sky-500 to-sky-700', external: false },
        { title: 'Lihat Website', desc: 'Tampilan pengunjung', href: '/', icon: Eye, gradient: 'from-slate-600 to-slate-800', external: true },
    ];

    return (
        <>
            <Head title="Dashboard | Admin TCM Padang" />
            <TopBar />
            <Toast />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                {flash?.last_login_at && (
                    <div className="mb-6 flex items-center gap-3 bg-sky-50 border border-sky-200 text-sky-800 rounded-2xl px-5 py-3.5 text-sm">
                        <History className="w-5 h-5" /> Login terakhir kamu: <strong>{flash.last_login_at}</strong>
                    </div>
                )}

                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a3d2e] via-emerald-800 to-emerald-900 p-7 sm:p-10 mb-8 shadow-xl">
                    <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#c9a961]/10 rounded-full blur-3xl" />
                    <p className="text-xs tracking-widest uppercase text-[#c9a961] font-semibold mb-2 flex items-center gap-2"><Sparkles className="w-4 h-4" /> Selamat datang</p>
                    <h1 className="font-serif text-3xl sm:text-5xl text-[#faf8f3]" style={{ fontFamily: '"Playfair Display", serif' }}>
                        Halo, <span className="italic text-[#c9a961]">{auth?.user?.name ?? 'Admin'}</span>!
                    </h1>
                    <p className="text-[#faf8f3]/75 mt-3 max-w-xl">Kelola konten website TCM Padang dari satu tempat.</p>
                    <div className="flex flex-wrap gap-3 mt-6">
                        <Link href="/admin/pages/create" className="bg-[#c9a961] text-[#1a3d2e] font-semibold px-6 py-3 rounded-xl hover:bg-[#d4b876] inline-flex items-center gap-2"><Plus className="w-5 h-5" /> Mulai Menulis</Link>
                        <Link href="/admin/content" className="bg-white/10 border border-white/20 text-[#faf8f3] font-semibold px-6 py-3 rounded-xl hover:bg-white/20 inline-flex items-center gap-2"><Settings2 className="w-5 h-5" /> Konten Website</Link>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-10">
                    {cards.map((c, i) => {
                        const Icon = c.icon;
                        return (
                            <div key={i} className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-6 hover:shadow-lg transition">
                                <span className={`inline-grid h-11 w-11 place-items-center rounded-xl ${c.bg} mb-3`}><Icon className={`h-5 w-5 ${c.fg}`} /></span>
                                <p className="text-xs sm:text-sm text-stone-500">{c.label}</p>
                                <p className="text-2xl sm:text-4xl font-bold text-stone-900">{c.value}</p>
                            </div>
                        );
                    })}
                </div>

                <h2 className="font-serif text-2xl text-stone-900 mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>Aksi Cepat</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {quickActions.map((a, i) => {
                        const Icon = a.icon;
                        const inner = (
                            <>
                                <span className={`inline-grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${a.gradient} text-white mb-4`}><Icon className="w-6 h-6" /></span>
                                <h3 className="font-semibold text-stone-900">{a.title}</h3>
                                <p className="text-sm text-stone-500 mt-1">{a.desc}</p>
                            </>
                        );
                        const cls = 'block bg-white rounded-2xl border border-stone-200 p-6 hover:shadow-xl hover:-translate-y-1 transition';
                        return a.external
                            ? <a key={i} href={a.href} target="_blank" className={cls}>{inner}</a>
                            : <Link key={i} href={a.href} className={cls}>{inner}</Link>;
                    })}
                </div>
            </main>
        </>
    );
}