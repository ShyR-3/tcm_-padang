import { Head, Link, useForm } from '@inertiajs/react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import LinkExt from '@tiptap/extension-link';
import ImageExt from '@tiptap/extension-image';
import { useEffect } from 'react';
import { ArrowLeft, Bold, Heading1, Heading2, Image as ImgIcon, Italic, Link as LinkIcon, List, ListOrdered, Loader2, Save } from 'lucide-react';

type Page = { id?: number; title: string; slug: string; meta_description: string; content: string; is_published: boolean } | null;

export default function Edit({ page }: { page: Page }) {
    const isNew = !page;
    const { data, setData, post, put, processing, errors } = useForm({
        title: page?.title ?? '', slug: page?.slug ?? '', meta_description: page?.meta_description ?? '',
        content: page?.content ?? '', is_published: page?.is_published ?? true,
    });

    const editor = useEditor({
        extensions: [StarterKit, LinkExt.configure({ openOnClick: false }), ImageExt],
        content: data.content || '<p>Mulai menulis…</p>',
        onUpdate: ({ editor }) => setData('content', editor.getHTML()),
    });

    useEffect(() => { if (editor && page?.content) editor.commands.setContent(page.content); }, [editor, page]);

    const submit = (e: React.FormEvent) => { e.preventDefault(); isNew ? post('/admin/pages') : put(`/admin/pages/${page!.id}`); };

    const Btn = ({ on, active, title, children }: any) => (
        <button type="button" title={title} onClick={on}
            className={`p-2 rounded-lg ${active ? 'bg-[#c9a961] text-white' : 'text-stone-600 hover:bg-stone-200'}`}>{children}</button>
    );

    return (
        <>
            <Head title={`${isNew ? 'Buat' : 'Edit'} Halaman | Admin`} />
            <header className="bg-[#1a3d2e] text-[#faf8f3] sticky top-0 z-30 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
                    <Link href="/admin/pages" className="flex items-center gap-2 text-sm text-[#c9a961] hover:text-white"><ArrowLeft className="w-4 h-4" /> Daftar Halaman</Link>
                    <button onClick={submit} disabled={processing} className="inline-flex items-center gap-2 bg-[#c9a961] text-[#1a3d2e] font-semibold px-5 py-2.5 rounded-xl hover:bg-[#d4b876] disabled:opacity-60">
                        {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Simpan
                    </button>
                </div>
            </header>

            <form onSubmit={submit} className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-5">
                    <div className="bg-white rounded-2xl border border-stone-200 p-5">
                        <label className="text-sm font-semibold text-stone-800 block mb-2">Judul Halaman</label>
                        <input value={data.title} onChange={(e) => setData('title', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-[#c9a961] focus:outline-none text-lg" placeholder="Contoh: Tentang Kami" />
                        {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
                    </div>

                    <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
                        <div className="flex flex-wrap gap-1 p-2 bg-stone-100 border-b border-stone-200">
                            <Btn on={() => editor?.chain().focus().toggleBold().run()} active={editor?.isActive('bold')} title="Tebal"><Bold className="w-4 h-4" /></Btn>
                            <Btn on={() => editor?.chain().focus().toggleItalic().run()} active={editor?.isActive('italic')} title="Miring"><Italic className="w-4 h-4" /></Btn>
                            <span className="w-px bg-stone-300 mx-1" />
                            <Btn on={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()} active={editor?.isActive('heading', { level: 1 })} title="Judul Besar"><Heading1 className="w-4 h-4" /></Btn>
                            <Btn on={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} active={editor?.isActive('heading', { level: 2 })} title="Judul Sedang"><Heading2 className="w-4 h-4" /></Btn>
                            <span className="w-px bg-stone-300 mx-1" />
                            <Btn on={() => editor?.chain().focus().toggleBulletList().run()} active={editor?.isActive('bulletList')} title="Daftar"><List className="w-4 h-4" /></Btn>
                            <Btn on={() => editor?.chain().focus().toggleOrderedList().run()} active={editor?.isActive('orderedList')} title="Daftar Nomor"><ListOrdered className="w-4 h-4" /></Btn>
                            <span className="w-px bg-stone-300 mx-1" />
                            <Btn on={() => { const u = prompt('URL link:'); if (u) editor?.chain().focus().setLink({ href: u }).run(); }} title="Link"><LinkIcon className="w-4 h-4" /></Btn>
                            <Btn on={() => { const u = prompt('URL gambar (mis. /images/foto.webp):'); if (u) editor?.chain().focus().setImage({ src: u }).run(); }} title="Gambar"><ImgIcon className="w-4 h-4" /></Btn>
                        </div>
                        <EditorContent editor={editor} className="p-5 min-h-[320px] prose prose-stone max-w-none [&_.tiptap]:outline-none [&_.tiptap]:min-h-[280px] [&_img]:rounded-xl" />
                    </div>
                </div>

                <div className="space-y-5">
                    <div className="bg-white rounded-2xl border border-stone-200 p-5">
                        <label className="text-sm font-semibold text-stone-800 block mb-2">Slug URL</label>
                        <div className="flex items-center gap-1 border border-stone-200 rounded-xl px-3 py-2.5 bg-stone-50">
                            <span className="text-stone-400 text-sm">/</span>
                            <input value={data.slug} onChange={(e) => setData('slug', e.target.value)} className="flex-1 bg-transparent text-sm focus:outline-none" placeholder="tentang-kami" />
                        </div>
                        {errors.slug && <p className="text-sm text-red-600 mt-1">{errors.slug}</p>}
                        <p className="text-xs text-stone-400 mt-2">Kosongkan = dibuat otomatis dari judul.</p>
                    </div>

                    <div className="bg-white rounded-2xl border border-stone-200 p-5">
                        <label className="text-sm font-semibold text-stone-800 block mb-2">Meta Description</label>
                        <textarea value={data.meta_description} onChange={(e) => setData('meta_description', e.target.value)} rows={3}
                            className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-sm focus:ring-2 focus:ring-[#c9a961] focus:outline-none resize-none" placeholder="Untuk tampilan di Google…" />
                        <p className="text-xs text-stone-400 mt-1">{data.meta_description.length}/300</p>
                    </div>

                    <div className="bg-white rounded-2xl border border-stone-200 p-5">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" checked={data.is_published} onChange={(e) => setData('is_published', e.target.checked)} className="rounded" />
                            <span><span className="block text-sm font-semibold text-stone-800">Terbitkan</span><span className="block text-xs text-stone-400">Tampilkan di website</span></span>
                        </label>
                    </div>

                    {!isNew && (
                        <a href={`/${page?.slug}`} target="_blank" className="block text-center bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold py-3 rounded-xl">👁 Lihat Live</a>
                    )}
                </div>
            </form>
        </>
    );
}