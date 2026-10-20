import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { CheckCircle2, ChevronDown, Heart, KeyRound, Loader2, LogOut, Save, UserCircle } from 'lucide-react';

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
                            <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-stone-50"><Heart className="w-4 h-4 text-[#c9a961]" /> Dashboard</Link>
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

export default function Profile({ user }: { user: { name: string; email: string } }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name, email: user.email, current_password: '', password: '', password_confirmation: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
put('/admin/profile', {
    onSuccess: () => {
        setData('current_password', '');
        setData('password', '');
        setData('password_confirmation', '');
    },
});
    };

    return (
        <>
            <Head title="Profil Saya | Admin" />
            <TopBar />
            <Toast />
            <form onSubmit={submit} className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
                <h1 className="font-serif text-3xl text-stone-900 mb-8" style={{ fontFamily: '"Playfair Display", serif' }}>Profil Saya</h1>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl border border-stone-200 p-6">
                        <div className="flex items-center gap-3 mb-5">
                            <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-100"><UserCircle className="h-6 w-6 text-emerald-700" /></span>
                            <div><p className="font-semibold text-stone-900">Informasi Akun</p><p className="text-xs text-stone-400">Nama & email login</p></div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-semibold text-stone-700 block mb-1.5">Nama</label>
                                <input value={data.name} onChange={(e) => setData('name', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-[#c9a961] focus:outline-none" />
                                {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-stone-700 block mb-1.5">Email</label>
                                <input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-[#c9a961] focus:outline-none" />
                                {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-stone-200 p-6">
                        <div className="flex items-center gap-3 mb-5">
                            <span className="grid h-11 w-11 place-items-center rounded-xl bg-amber-100"><KeyRound className="h-6 w-6 text-amber-700" /></span>
                            <div><p className="font-semibold text-stone-900">Ganti Password</p><p className="text-xs text-stone-400">Kosongkan bila tidak diubah</p></div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-semibold text-stone-700 block mb-1.5">Password Saat Ini</label>
                                <input type="password" value={data.current_password} onChange={(e) => setData('current_password', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-[#c9a961] focus:outline-none" />
                                {errors.current_password && <p className="text-sm text-red-600 mt-1">{errors.current_password}</p>}
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-stone-700 block mb-1.5">Password Baru</label>
                                <input type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-[#c9a961] focus:outline-none" />
                                {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-stone-700 block mb-1.5">Ulangi Password Baru</label>
                                <input type="password" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-[#c9a961] focus:outline-none" />
                            </div>
                        </div>
                    </div>
                </div>

                <button disabled={processing} className="mt-6 inline-flex items-center gap-2 bg-[#059669] text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-[#047857] disabled:opacity-60">
                    {processing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />} Simpan Perubahan
                </button>
            </form>
        </>
    );
}