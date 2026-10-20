import { Link, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { CheckCircle2, ChevronDown, Globe, Heart, LogOut, UserCircle, X } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { auth, flash } = usePage().props as any;
    const user = auth?.user ?? null;

    const [menuOpen, setMenuOpen] = useState(false);
    const [toast, setToast] = useState<string | null>(null);

    useEffect(() => {
        if (flash?.success) {
            setToast(flash.success);
            const t = setTimeout(() => setToast(null), 4000);
            return () => clearTimeout(t);
        }
    }, [flash?.success]);

    const logout = () => router.post('/admin/logout');

    const initials = user?.name
        ? user.name.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase()
        : 'AD';

    return (
        <div className="min-h-screen bg-stone-50">
            {/* TOPBAR */}
            <header className="bg-[#1a3d2e] text-[#faf8f3] sticky top-0 z-30 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
                    <Link href="/admin" className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#c9a961] to-amber-700 flex items-center justify-center shadow-lg">
                            <Heart className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <p className="font-semibold leading-tight">TCM Padang Admin</p>
                            <p className="text-xs text-[#c9a961]">Content Management System</p>
                        </div>
                    </Link>

                    <div className="flex items-center gap-2 sm:gap-3">
                        <a href="/" target="_blank" className="hidden sm:inline-flex items-center gap-2 text-sm text-[#c9a961] hover:text-[#faf8f3] transition">
                            <Globe className="w-4 h-4" /> Lihat Website
                        </a>

                        {/* DROPDOWN PROFIL */}
                        <div className="relative">
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-xl px-2.5 py-2 transition"
                            >
                                <span className="h-8 w-8 rounded-full bg-gradient-to-br from-[#c9a961] to-amber-700 flex items-center justify-center text-sm font-bold text-white">
                                    {initials}
                                </span>
                                <span className="hidden md:block text-sm font-medium">{user?.name ?? 'Admin'}</span>
                                <ChevronDown className={`w-4 h-4 transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {menuOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)}></div>
                                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden z-20">
                                        <div className="px-4 py-3 bg-stone-50 border-b border-stone-100">
                                            <p className="text-sm font-semibold text-stone-900 truncate">{user?.name}</p>
                                            <p className="text-xs text-stone-500 truncate">{user?.email}</p>
                                        </div>
                                        <Link
                                            href="/admin/profile"
                                            onClick={() => setMenuOpen(false)}
                                            className="flex items-center gap-3 px-4 py-3 text-sm text-stone-700 hover:bg-stone-50 transition"
                                        >
                                            <UserCircle className="w-4 h-4 text-[#c9a961]" /> Profil & Password
                                        </Link>
                                        <button
                                            onClick={logout}
                                            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition"
                                        >
                                            <LogOut className="w-4 h-4" /> Keluar
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* TOAST */}
            {toast && (
                <div className="fixed top-20 right-4 z-50 flex items-center gap-3 bg-white border border-emerald-200 shadow-2xl rounded-2xl px-5 py-4 max-w-sm">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                    <p className="text-sm font-medium text-stone-800">{toast}</p>
                    <button onClick={() => setToast(null)} className="ml-auto text-stone-400 hover:text-stone-600">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}

            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">{children}</main>
        </div>
    );
}
