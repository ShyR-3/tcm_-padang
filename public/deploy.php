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

$log = [];

$commands = [
    ['migrate', ['--force' => true]],
    ['db:seed', ['--class' => 'Database\\Seeders\\AdminUserSeeder', '--force' => true]],
    ['db:seed', ['--class' => 'Database\\Seeders\\SettingsSeeder', '--force' => true]],
    ['optimize:clear', []],
];

foreach ($commands as [$cmd, $args]) {
    Illuminate\Support\Facades\Artisan::call($cmd, $args);
    $log[] = "=== $cmd ===\n".Illuminate\Support\Facades\Artisan::output();
}

$target = $laravel.'/storage/app/public';
$link = __DIR__.'/storage';
if (!file_exists($link)) {
    @symlink($target, $link);
    $log[] = "=== storage link ===\n".(file_exists($link) ? 'OK' : 'gagal (buat manual)');
}

echo '<pre>'.htmlspecialchars(implode("\n", $log)).'</pre>';
echo '<b>SELESAI — HAPUS FILE deploy.php SEKARANG!</b>';