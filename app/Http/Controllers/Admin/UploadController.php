<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

class UploadController extends Controller
{
    public function image(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
            'key' => 'required|string',
        ]);

        $path = $request->file('image')->store('uploads', 'public');
        $url = '/storage/' . $path;

        Setting::where('key', $request->key)->update(['image_path' => $url]);

        return response()->json(['url' => $url]);
    }
}