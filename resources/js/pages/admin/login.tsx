import { Head, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { FormEvent, useState } from 'react';
import { Eye, EyeOff, Heart, Loader2, Lock, Mail, Shield, Sparkles, Zap } from 'lucide-react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({ email: '', password: '', remember: false });
    const [show, setShow] = useState(false);

    const submit = (e: FormEvent) => { e.preventDefault(); post('/admin/login'); };

    return (
        <>
            <Head title="Login Admin | TCM Padang" />
            <div className="min-h-screen bg-gradient-to-br from-[#0f2419] via-[#1a3d2e] to-emerald-900 flex items-center justify-center px-4 relative overflow-hidden">
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#c9a961]/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl" />

                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative w-full max-w-md">
                    <div className="text-center mb-6">
                        <span className="inline-grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-[#c9a961] to-amber-700 shadow-2xl mb-4">
                            <Heart className="h-8 w-8 text-white" />
                        </span>
                        <h1 className="font-serif text-3xl text-[#faf8f3]" style={{ fontFamily: '"Playfair Display", serif' }}>Panel Admin</h1>
                        <p className="text-sm text-[#faf8f3]/60 mt-1">TCM Padang · Content Management</p>
                    </div>

                    <form onSubmit={submit} className="bg-[#faf8f3] rounded-3xl p-7 shadow-2xl space-y-4">
                        {errors.email && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">{errors.email}</div>}

                        <div>
                            <label className="text-sm font-semibold text-[#1a3d2e] block mb-1.5">Email</label>
                            <div className="relative">
                                <Mail className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                <input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} autoFocus
                                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-stone-200 bg-white focus:ring-2 focus:ring-[#c9a961] focus:outline-none" placeholder="admin@tcmpadang.com" />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-[#1a3d2e] block mb-1.5">Password</label>
                            <div className="relative">
                                <Lock className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                <input type={show ? 'text' : 'password'} value={data.password} onChange={(e) => setData('password', e.target.value)}
                                    className="w-full pl-11 pr-11 py-3 rounded-xl border border-stone-200 bg-white focus:ring-2 focus:ring-[#c9a961] focus:outline-none" placeholder="••••••••" />
                                <button type="button" onClick={() => setShow(!show)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700">
                                    {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <label className="flex items-center gap-2 text-sm text-stone-600 cursor-pointer">
                            <input type="checkbox" checked={data.remember} onChange={(e) => setData('remember', e.target.checked)} className="rounded" /> Ingat saya
                        </label>

                        <button disabled={processing} className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#1a3d2e] to-emerald-800 text-white font-semibold py-3.5 rounded-xl hover:shadow-xl transition disabled:opacity-60">
                            {processing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Lock className="w-5 h-5" />}
                            {processing ? 'Memproses…' : 'Masuk'}
                        </button>

                        <a href="/" className="block text-center text-sm text-stone-500 hover:text-stone-800 pt-2">← Kembali ke website</a>
                    </form>

                    <div className="flex justify-center gap-6 mt-6 text-[#faf8f3]/60 text-xs">
                        <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-[#c9a961]" /> Aman</span>
                        <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-[#c9a961]" /> Cepat</span>
                        <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-[#c9a961]" /> Mudah</span>
                    </div>
                </motion.div>
            </div>
        </>
    );
}