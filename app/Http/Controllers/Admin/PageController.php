<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/pages/index', [
            'pages' => Page::latest()->get(),
            'stats' => [
                'total' => Page::count(),
                'published' => Page::where('is_published', true)->count(),
                'draft' => Page::where('is_published', false)->count(),
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/pages/edit', ['page' => null]);
    }

    public function store(Request $request)
    {
        Page::create($this->validatePage($request));

        return redirect()->route('admin.pages.index')->with('success', 'Halaman baru diterbitkan! 🎉');
    }

    public function edit(Page $page)
    {
        return Inertia::render('admin/pages/edit', ['page' => $page]);
    }

    public function update(Request $request, Page $page)
    {
        $page->update($this->validatePage($request, $page));

        return redirect()->route('admin.pages.index')->with('success', 'Perubahan disimpan! ✅');
    }

    public function destroy(Page $page)
    {
        $page->delete();

        return redirect()->route('admin.pages.index')->with('success', 'Halaman dihapus.');
    }

    private function validatePage(Request $request, ?Page $page = null): array
    {
        return $request->validate([
            'title' => 'required|string|max:120',
            'slug' => 'nullable|string|max:120|alpha_dash|unique:pages,slug,' . ($page?->id ?? 'NULL'),
            'meta_description' => 'nullable|string|max:300',
            'content' => 'nullable|string',
            'is_published' => 'boolean',
        ]);
    }
}
