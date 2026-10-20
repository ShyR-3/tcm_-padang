import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';



createInertiaApp({
        title: (title) => title,
    resolve: (name) => {
        const pages = import.meta.glob('./pages/**/*.tsx') as Record<string, () => Promise<any>>;
        const importPage = pages[`./pages/${name}.tsx`];

        if (!importPage) {
            throw new Error(`Page not found: ${name}`);
        }

        return importPage().then((module) => module.default ?? module);
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#C9A961',
    },
});