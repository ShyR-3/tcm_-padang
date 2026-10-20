<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function edit()
    {
        return Inertia::render('admin/content', [
            'rows' => Setting::orderBy('group')->orderBy('id')->get(),
        ]);
    }

    public function update(Request $request)
    {
        $values = $request->input('values', []);

        foreach ($values as $key => $value) {
            $setting = Setting::where('key', $key)->first();
            if (! $setting) continue;

            if ($setting->type === 'image') {
                $setting->update(['image_path' => $value]);
            } else {
                $setting->update(['value' => $value]);
            }
        }

        return redirect()->route('admin.content')->with('success', 'Konten website diperbarui.');
    }
}