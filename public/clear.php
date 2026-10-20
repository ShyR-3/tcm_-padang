<?php

if (($_GET['key'] ?? '') !== 'tcm2026') {
    http_response_code(403);
    die('Akses ditolak.');
}

$base = dirname(__DIR__);
$laravel = null;
foreach ([$base.'/tcmapp', $base] as $p) {
    if (file_exists($p.'/vendor/autoload.php')) { $laravel = $p; break; }
}
if (!$laravel) die('Laravel tidak ditemukan.');

require $laravel.'/vendor/autoload.php';
$app = require $laravel.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

Illuminate\Support\Facades\Artisan::call('optimize:clear');
echo '<pre>'.Illuminate\Support\Facades\Artisan::output().'</pre>';

// Hapus bootstrap cache manual
$bootstrap = $laravel.'/bootstrap/cache';
foreach (['config.php', 'routes-v7.php', 'services.php', 'packages.php'] as $f) {
    @unlink($bootstrap.'/'.$f);
}

// Cek manifest
$manifest = __DIR__.'/build/manifest.json';
if (file_exists($manifest)) {
    $data = json_decode(file_get_contents($manifest), true);
    $has = isset($data['resources/js/pages/admin/login.tsx']);
    echo '<h3>Manifest check:</h3>';
    echo '<b>admin/login entry:</b> '.($has ? 'ADA ✅' : 'TIDAK ADA ❌').'<br>';
    echo '<b>Total entries:</b> '.count($data).'<br>';
    echo '<b>File date:</b> '.date('Y-m-d H:i:s', filemtime($manifest)).'<br>';
} else {
    echo '<h3>❌ manifest.json TIDAK ADA di public_html/build/</h3>';
}

echo '<hr><b>HAPUS FILE clear.php SETELAH INI!</b>';