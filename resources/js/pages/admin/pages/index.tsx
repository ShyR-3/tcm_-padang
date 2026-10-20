import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import {
    Calendar, CheckCircle2, ChevronDown, Edit, Eye, FileText, Globe, Heart,
    LogOut, PenSquare, Plus, Search, Settings2, Trash2, UserCircle,
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
                <div className="relative">
                    <button onClick={() => setOpen(!open)} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-xl px-2.5 py-1.5">
                        <span className="h-8 w-8 rounded-full bg-gradient-to-br from-[#c9a961] to-amber-700 grid place-items-center text-sm font-bold">{initials}</span>
                        <ChevronDown className={`w-4 h-4 ${open ? 'rotate-180' : ''}`} />
                    </button>
                    {open && (<>
                        <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden z-20 text-stone-800">
                            <Link href="/admin/profile" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-stone-50"><UserCircle className="w-4 h-4 text-[#c9a961]" /> Profil</Link>
                            <button onClick={() => router.post('/admin/logout')} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50"><LogOut className="w-4 h-4" /> Keluar</button>
                        </div>
                    </>)}
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
    return <div className="fixed top-20 right-4 z-50 flex items-center gap-3 bg-white border border-emerald-200 shadow-2xl rounded-2xl px-5 py-4 max-w-sm"><CheckCircle2 className="w-6 h-6 text-emerald-600" /><p className="text-sm font-medium text-stone-800">{msg}</p></div>;
}

type Page = { id: number; title: string; slug: string; is_published: boolean; updated_at: string };
type Stats = { total: number; published: number; draft: number };

export default function PagesIndex({ pages, stats }: { pages: Page[]; stats?: Stats }) {
    const { delete: destroy } = useForm();
    const s = stats ?? { total: pages.length, published: 0, draft: 0 };
    const [q, setQ] = useState('');
    const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');

    const list = pages.filter((p) =>
        (p.title.toLowerCase().includes(q.toLowerCase()) || p.slug.includes(q.toLowerCase())) &&
        (filter === 'all' || (filter === 'published' ? p.is_published : !p.is_published))
    );

    const hapus = (p: Page) => { if (confirm(`Hapus "${p.title}"?`)) destroy(`/admin/pages/${p.id}`); };
    const tgl = (d: string) => new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

    return (
        <>
            <Head title="Kelola Halaman | Admin" />
            <TopBar />
            <Toast />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
                    <div>
                        <h1 className="font-serif text-3xl text-stone-900" style={{ fontFamily: '"Playfair Display", serif' }}>Semua Halaman</h1>
                        <p className="text-stone-500 mt-1">Buat, edit, dan terbitkan halaman website.</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Link href="/admin/content" className="inline-flex items-center gap-2 bg-[#c9a961] text-[#1a3d2e] font-semibold px-5 py-3 rounded-xl hover:bg-[#d4b876] shadow">
                            <Settings2 className="w-5 h-5" /> Konten Website
                        </Link>
                        <Link href="/admin/pages/create" className="inline-flex items-center gap-2 bg-[#059669] text-white font-semibold px-5 py-3 rounded-xl hover:bg-[#047857] shadow">
                            <Plus className="w-5 h-5" /> Halaman Baru
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-5">
                    {([['all', 'Total', s.total], ['published', 'Terbit', s.published], ['draft', 'Draft', s.draft]] as const).map(([key, label, val]) => (
                        <button key={key} onClick={() => setFilter(key)}
                            className={`p-4 rounded-2xl border-2 text-left transition ${filter === key ? 'border-[#c9a961] bg-amber-50 shadow' : 'border-stone-200 bg-white hover:border-stone-300'}`}>
                            <p className="text-xs text-stone-500">{label}</p>
                            <p className="text-2xl font-bold text-stone-900">{val}</p>
                        </button>
                    ))}
                </div>

                <div className="relative mb-6">
                    <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari judul atau slug…"
                        className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-stone-200 bg-white focus:ring-2 focus:ring-[#c9a961] focus:outline-none" />
                </div>

                {list.length === 0 ? (
                    <div className="bg-white rounded-3xl border border-stone-200 p-14 text-center">
                        <span className="inline-grid h-20 w-20 place-items-center rounded-full bg-amber-50 mb-5"><FileText className="w-9 h-9 text-[#c9a961]" /></span>
                        <h2 className="font-serif text-2xl text-stone-900 mb-2" style={{ fontFamily: '"Playfair Display", serif' }}>{pages.length === 0 ? 'Belum ada halaman' : 'Tidak ketemu'}</h2>
                        <p className="text-stone-500 mb-6">{pages.length === 0 ? 'Mulai tulis halaman pertama kamu.' : 'Coba kata kunci atau filter lain.'}</p>
                        {pages.length === 0 && <Link href="/admin/pages/create" className="inline-flex items-center gap-2 bg-[#059669] text-white px-6 py-3 rounded-xl font-semibold"><Plus className="w-5 h-5" /> Buat Halaman</Link>}
                    </div>
                ) : (
                    <div className="space-y-3">
                        {list.map((p) => (
                            <div key={p.id} className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 hover:shadow-md transition flex flex-col sm:flex-row sm:items-center gap-4">
                                <span className="hidden sm:grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-[#1a3d2e] to-emerald-800 text-white"><FileText className="w-5 h-5" /></span>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3">
                                        <h3 className="font-semibold text-stone-900 truncate">{p.title}</h3>
                                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${p.is_published ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-600'}`}>
                                            {p.is_published ? 'Terbit' : 'Draft'}
                                        </span>
                                    </div>
                                    <p className="text-xs text-stone-500 mt-1 flex items-center gap-3">
                                        <code className="bg-stone-100 px-2 py-0.5 rounded">/{p.slug}</code>
                                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {tgl(p.updated_at)}</span>
                                    </p>
                                </div>
                                <div className="flex gap-1.5">
                                    <a href={`/${p.slug}`} target="_blank" title="Lihat" className="p-2.5 rounded-lg text-stone-500 hover:text-emerald-700 hover:bg-emerald-50"><Eye className="w-4 h-4" /></a>
                                    <Link href={`/admin/pages/${p.id}/edit`} title="Edit" className="p-2.5 rounded-lg text-stone-500 hover:text-[#c9a961] hover:bg-amber-50"><Edit className="w-4 h-4" /></Link>
                                    <button onClick={() => hapus(p)} title="Hapus" className="p-2.5 rounded-lg text-stone-500 hover:text-red-600 hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </>
    );
}