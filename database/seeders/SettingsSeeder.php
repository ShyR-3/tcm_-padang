<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Setting;

class SettingsSeeder extends Seeder
{
    public function run(): void
    {
        $rows = [
            // === WARNA BRAND (GLOBAL) ===
            ['brand', 'brand_primary', 'Warna Utama (Hijau)', '#1a3d2e', 'color', null],
            ['brand', 'brand_accent', 'Warna Aksen (Emas)', '#c9a961', 'color', null],
            ['brand', 'brand_bg', 'Warna Background', '#faf8f3', 'color', null],

            // === HOME — HERO ===
            ['home', 'home_judul', 'Judul Hero Home', 'Original di Padang – Siap Antar Cepat ke RS & Rumah Anda.', 'text', null],
            ['home', 'home_tagline', 'Tagline Home', 'Solusi Pemulihan Pasca-Operasi & Pendampingan Stroke Terpercaya.', 'textarea', null],
            ['home', 'home_foto_hero', 'Foto Background Hero', null, 'image', '/images/bangunan_tcm.jpeg'],
            ['home', 'home_foto_klinik', 'Foto Klinik (Section Profil)', null, 'image', '/images/bangunan_tcm.jpeg'],
            ['home', 'home_badge_text', 'Badge Atas Hero', 'Traditional Chinese Medicine · Padang', 'text', null],

            // === HOME — CTA ===
            ['home', 'home_cta_produk', 'Teks Tombol Lihat Produk', 'Lihat Produk Unggulan', 'text', null],
            ['home', 'home_cta_wa', 'Teks Tombol WhatsApp', 'Pesan via WhatsApp', 'text', null],

            // === HOME — TRUST BADGES ===
            ['home', 'home_trust_1', 'Badge Kepercayaan 1', 'Antar Instan ke RSUP Dr. M. Djamil & Seluruh Padang', 'text', null],
            ['home', 'home_trust_2', 'Badge Kepercayaan 2', 'Garansi 100% Produk Original (BPOM)', 'text', null],

            // === HOME — SECTION PRODUK ===
            ['home', 'produk_section_label', 'Label Section Produk', 'Produk Unggulan Kami', 'text', null],
            ['home', 'produk_section_judul', 'Judul Section Produk', 'Solusi Kesehatan Traditional Terpercaya', 'text', null],

            // === HOME — SECTION PROFIL ===
            ['home', 'profil_section_label', 'Label Section Mengapa Kami', 'Mengapa Memilih Kami', 'text', null],
            ['home', 'profil_section_judul', 'Judul Section Mengapa Kami', 'Mengapa Harus Membeli Melalui Layanan TCM Kami di Padang?', 'text', null],
            ['home', 'profil_section_desc', 'Deskripsi Section Mengapa Kami', 'Dampingi Pemulihan Orang Terkasih Bersama Praktisi TCM Padang.', 'textarea', null],

            // === HALAMAN LAIN ===
            ['profil', 'profil_judul', 'Judul Halaman Profil', 'Praktisi TCM Terpercaya di Padang', 'text', null],
            ['profil', 'profil_tagline', 'Tagline Profil', 'Mendampingi pemulihan Anda dengan formula tradisional Tiongkok asli dan berpengalaman.', 'textarea', null],
            ['profil', 'profil_tentang', 'Paragraf Tentang', 'TCM Padang adalah toko obat tradisional Tiongkok yang melayani masyarakat Padang.', 'textarea', null],

            ['layanan', 'layanan_judul', 'Judul Halaman Layanan', 'Layanan Kami', 'text', null],
            ['layanan', 'layanan_tagline', 'Tagline Layanan', 'Dari konsultasi hingga pengiriman, kami hadir untuk pemulihan Anda.', 'textarea', null],

            ['kontak', 'kontak_judul', 'Judul Halaman Kontak', 'Hubungi Kami', 'text', null],
            ['kontak', 'kontak_tagline', 'Tagline Kontak', 'Kami siap melayani pertanyaan dan konsultasi Anda setiap hari.', 'textarea', null],
            ['kontak', 'kontak_alamat', 'Alamat', 'Jl. Tampat Durian, Korong Gadang, Kuranji, Padang', 'textarea', null],
            ['kontak', 'kontak_wa', 'Nomor WhatsApp', '+62 851-6575-5551', 'text', null],

            ['produk', 'produk_judul', 'Judul Hero Produk', 'Produk Premium Kami', 'text', null],
            ['produk', 'produk_tagline', 'Tagline Produk', 'Formula Traditional Tiongkok Terpercaya untuk Pemulihan Kesehatan Optimal', 'textarea', null],
        ];

        foreach ($rows as $row) {
            Setting::updateOrCreate(
                ['key' => $row[1]],
                [
                    'label' => $row[2],
                    'value' => $row[3],
                    'type' => $row[4],
                    'image_path' => $row[5] ?? null,
                    'group' => $row[0],
                ]
            );
        }
    }
}