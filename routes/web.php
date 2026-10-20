<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Page;
use App\Http\Controllers\Admin\LoginController;
use App\Http\Controllers\Admin\PageController;
use App\Http\Controllers\Admin\ProfileController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\UploadController;

// PAGE 01: HOME
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// PAGE 02: PRODUCTS
Route::get('/products', function () {
    return Inertia::render('products/index');
})->name('products');

Route::get('/products/{slug}', function (string $slug) {
    return Inertia::render('products/show', ['slug' => $slug]);
})->where('slug', '[a-z0-9\-]+');

// PAGE 03: PROFIL
Route::get('/profil', function () {
    return Inertia::render('profil/index');
})->name('profil');

// PAGE 04: LAYANAN
Route::get('/layanan', function () {
    return Inertia::render('layanan/index');
})->name('layanan');

// PAGE 05: KONTAK
Route::get('/kontak', function () {
    return Inertia::render('kontak/index');
})->name('kontak');

/*
|--------------------------------------------------------------------------
| ADMIN PANEL
|--------------------------------------------------------------------------
*/
Route::prefix('admin')->name('admin.')->group(function () {
    Route::middleware('guest')->group(function () {
        Route::get('/login', [LoginController::class, 'show'])->name('login');
        Route::post('/login', [LoginController::class, 'login'])->middleware('throttle:5,1');
    });

    Route::middleware('auth')->group(function () {
        Route::get('/', fn () => Inertia::render('admin/dashboard'))->name('dashboard');
        Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile');
        Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');

        Route::get('/content', [SettingController::class, 'edit'])->name('content');
        Route::put('/content', [SettingController::class, 'update'])->name('content.update');

        Route::post('/upload/image', [UploadController::class, 'image'])->name('upload.image');

        Route::resource('pages', PageController::class);
    });
});

/*
|--------------------------------------------------------------------------
| ROUTE GLOBAL LOGIN (WAJIB ADA!)
|--------------------------------------------------------------------------
*/
Route::get('/login', fn () => redirect()->route('admin.login'))->name('login');

/*
|--------------------------------------------------------------------------
| HALAMAN PUBLIK DINAMIS (WAJIB PALING BAWAH!)
|--------------------------------------------------------------------------
*/
Route::get('/{slug}', function (string $slug) {
    $page = Page::where('slug', $slug)->where('is_published', true)->firstOrFail();
    return Inertia::render('page/show', ['page' => $page]);
})->where('slug', '[a-z0-9\-]+');