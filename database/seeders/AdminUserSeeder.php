<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'admin@tcmpadang.com'],
            ['name' => 'Admin TCM', 'password' => Hash::make('tcm2026admin')]
        );
    }
}
