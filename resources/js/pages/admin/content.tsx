import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState, useRef } from 'react';
import { CheckCircle2, ChevronDown, Heart, Loader2, LogOut, Save, Settings2, Upload, UserCircle, Image as ImageIcon } from 'lucide-react';

type Row = { key: string; label: string; value: string | null; image_path: string | null; group: string; type: string };

const groupLabels: Record<string, string> = {
    brand: 'Warna Brand (Global)',
    home: 'Halaman Home',
    produk: 'Halaman Produk',
    profil: 'Halaman Profil',
    layanan: 'Halaman Layanan',
    kontak: 'Halaman Kontak',
};

function TopBar({ save, processing }: { save: () => void; processing: boolean }) {
    const { auth } = usePage().props as any;
    const user = auth?.user;
    const [open, setOpen] = useState(false);
    const initials = user?.name ? user.name.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase() : 'AD';
    return (
        <header className="bg-[#1a3d2e] text-[#faf8f3] sticky top-0 z-30 shadow-lg">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
                <Link href="/admin" className="flex items-center gap-3">
                    <span className="h-10 w-10 rounded-full bg-gradient-to-br from-[#c9a961] to-amber-700 grid place-items-center shadow"><Heart className="h-5 w-5 text-white" /></span>
                    <span><span className="block font-semibold leading-tight">TCM Padang Admin</span><span className="block text-xs text-[#c9a961]">Konten Website</span></span>
                </Link>
                <div className="flex items-center gap-2">
                    <button onClick={save} disabled={processing} className="inline-flex items-center gap-2 bg-[#c9a961] text-[#1a3d2e] font-semibold px-5 py-2.5 rounded-xl hover:bg-[#d4b876] disabled:opacity-60">
                        {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Simpan
                    </button>
                    <div className="relative">
                        <button onClick={() => setOpen(!open)} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-xl px-2.5 py-1.5">
                            <span className="h-8 w-8 rounded-full bg-gradient-to-br from-[#c9a961] to-amber-700 grid place-items-center text-sm font-bold">{initials}</span>
                            <ChevronDown className={`w-4 h-4 ${open ? 'rotate-180' : ''}`} />
                        </button>
                        {open && (<>
                            <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden z-20 text-stone-800">
                                <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-stone-50"><Heart className="w-4 h-4 text-[#c9a961]" /> Dashboard</Link>
                                <Link href="/admin/profile" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-stone-50"><UserCircle className="w-4 h-4 text-[#c9a961]" /> Profil</Link>
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
    return <div className="fixed top-20 right-4 z-50 flex items-center gap-3 bg-white border border-emerald-200 shadow-2xl rounded-2xl px-5 py-4 max-w-sm"><CheckCircle2 className="w-6 h-6 text-emerald-600" /><p className="text-sm font-medium text-stone-800">{msg}</p></div>;
}

function ImageUploader({ row, onUpload }: { row: Row; onUpload: (url: string) => void }) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const currentImage = row.image_path ?? row.value ?? '';

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);
        formData.append('key', row.key);

        try {
            const res = await fetch('/admin/upload/image', {
                method: 'POST',
                headers: { 'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content ?? '' },
                body: formData,
            });
            const data = await res.json();
            onUpload(data.url);
        } catch (err) {
            alert('Upload gagal');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="md:col-span-2">
            <label className="text-sm font-semibold text-stone-700 block mb-1.5">{row.label}</label>
            <div className="flex gap-3 items-start">
                <div className="w-32 h-32 flex-shrink-0 rounded-xl border-2 border-dashed border-stone-300 overflow-hidden bg-stone-50 flex items-center justify-center">
                    {currentImage ? (
                        <img src={currentImage} alt="" className="w-full h-full object-cover" />
                    ) : (
                        <ImageIcon className="w-8 h-8 text-stone-300" />
                    )}
                </div>
                <div className="flex-1">
                    <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
                    <button
                        type="button"
                        onClick={() => inputRef.current?.click()}
                        disabled={uploading}
                        className="inline-flex items-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold px-4 py-2.5 rounded-xl text-sm disabled:opacity-60"
                    >
                        {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                        {uploading ? 'Mengupload...' : 'Upload Foto Baru'}
                    </button>
                    <p className="text-xs text-stone-400 mt-2">JPG/PNG/WebP, maks 2MB. Foto lama akan diganti.</p>
                    {currentImage && (
                        <p className="text-xs text-stone-500 mt-1 break-all">Aktif: <code className="bg-stone-100 px-1.5 py-0.5 rounded">{currentImage}</code></p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function Content({ rows }: { rows: Row[] }) {
    const initial: Record<string, string> = {};
    rows.forEach((r) => (initial[r.key] = (r.type === 'image' ? r.image_path : r.value) ?? ''));

    const { data, setData, put, processing } = useForm({ values: initial });

    const groups = [...new Set(rows.map((r) => r.group))];
    const submit = () => put('/admin/content');

    return (
        <>
            <Head title="Konten Website | Admin" />
            <TopBar save={submit} processing={processing} />
            <Toast />
            <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
                <div className="mb-8">
                    <h1 className="font-serif text-3xl text-stone-900" style={{ fontFamily: '"Playfair Display", serif' }}>Konten Website</h1>
                    <p className="text-stone-500 mt-1">Ubah warna, foto, dan teks tiap halaman. Perubahan langsung tampil di website setelah disimpan.</p>
                </div>

                <div className="space-y-8">
                    {groups.map((g) => (
                        <section key={g} className="bg-white rounded-2xl border border-stone-200 p-6">
                            <div className="flex items-center gap-3 mb-5">
                                <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-100"><Settings2 className="h-5 w-5 text-emerald-700" /></span>
                                <h2 className="font-semibold text-stone-900">{groupLabels[g] ?? g}</h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                {rows.filter((r) => r.group === g).map((r) => {
                                    if (r.type === 'image') {
                                        return <ImageUploader key={r.key} row={r} onUpload={(url) => setData('values', { ...data.values, [r.key]: url })} />;
                                    }
                                    if (r.type === 'color') {
                                        return (
                                            <div key={r.key}>
                                                <label className="text-sm font-semibold text-stone-700 block mb-1.5">{r.label}</label>
                                                <div className="flex items-center gap-3 border border-stone-200 rounded-xl p-2">
                                                    <input
                                                        type="color"
                                                        value={data.values[r.key] ?? '#000000'}
                                                        onChange={(e) => setData('values', { ...data.values, [r.key]: e.target.value })}
                                                        className="h-10 w-14 rounded-lg cursor-pointer border-0"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={data.values[r.key] ?? ''}
                                                        onChange={(e) => setData('values', { ...data.values, [r.key]: e.target.value })}
                                                        className="flex-1 px-2 py-1 text-sm font-mono bg-transparent focus:outline-none"
                                                    />
                                                </div>
                                            </div>
                                        );
                                    }
                                    if (r.type === 'textarea') {
                                        return (
                                            <div key={r.key} className="md:col-span-2">
                                                <label className="text-sm font-semibold text-stone-700 block mb-1.5">{r.label}</label>
                                                <textarea
                                                    value={data.values[r.key] ?? ''}
                                                    onChange={(e) => setData('values', { ...data.values, [r.key]: e.target.value })}
                                                    rows={3}
                                                    className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-sm focus:ring-2 focus:ring-[#c9a961] focus:outline-none resize-none"
                                                />
                                            </div>
                                        );
                                    }
                                    return (
                                        <div key={r.key}>
                                            <label className="text-sm font-semibold text-stone-700 block mb-1.5">{r.label}</label>
                                            <input
                                                value={data.values[r.key] ?? ''}
                                                onChange={(e) => setData('values', { ...data.values, [r.key]: e.target.value })}
                                                className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-sm focus:ring-2 focus:ring-[#c9a961] focus:outline-none"
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    ))}
                </div>

                <button onClick={submit} disabled={processing} className="mt-8 inline-flex items-center gap-2 bg-[#059669] text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-[#047857] disabled:opacity-60">
                    {processing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />} Simpan Semua Perubahan
                </button>
            </main>
        </>
    );
}