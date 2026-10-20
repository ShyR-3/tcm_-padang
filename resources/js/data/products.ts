export interface Product {
    slug: string;
    name: string;
    tagline: string;
    benefits: string[];
    description: string;
    usage: string;
    image: string;
    gallery: string[];
}

export const products: Product[] = [
    {
        slug: 'pien-tze-huang',
        name: 'Pien Tze Huang',
        tagline: 'Obat china legendaris untuk pemulihan luka dan perlindungan hati, asli ber-BPOM.',
        benefits: [
            'Fokus pemulihan luka pasca operasi',
            'Melindungi fungsi hati',
            'Anti peradangan & detoksifikasi',
        ],
        description:
            'Pien Tze Huang adalah formula herbal Tiongkok klasik yang telah digunakan turun-temurun untuk membantu pemulihan pasca operasi dan menjaga kesehatan hati. Setiap kemasan di TCM Padang dijamin asli dengan hologram resmi dan terdaftar BPOM.',
        usage: 'Diminum sesuai anjuran praktisi. Konsultasikan dosis terbaik untuk kondisi Anda via WhatsApp.',
        image: '/images/pien-tze-huang.jpeg',
        gallery: ['/images/pien-tze-huang.jpeg', '/images/2.webp'],
    },
    {
        slug: 'angong-niuhuang-wan',
        name: 'Angong Niuhuang Wan',
        tagline: 'Formula tradisional Tiongkok untuk kesehatan sirkulasi dan pemulihan pasca stroke.',
        benefits: [
            'Membantu kesehatan sirkulasi darah',
            'Tradisional untuk pemulihan pasca stroke',
            'Menenangkan & mendukung pemulihan tubuh',
        ],
        description:
            'Angong Niuhuang Wan adalah pil herbal tradisional Tiongkok yang terkenal untuk mendukung kesehatan sirkulasi dan pemulihan. Tersedia dalam kemasan asli ber-BPOM dengan garansi keaslian hologram di TCM Padang.',
        usage: 'Gunakan sesuai anjuran praktisi TCM. Konsultasi gratis via WhatsApp sebelum pemakaian.',
        image: '/images/angkung.jpeg',
        gallery: ['/images/angkung.jpeg', '/images/1.webp'],
    },
];

export const findProduct = (slug: string) => products.find((p) => p.slug === slug);