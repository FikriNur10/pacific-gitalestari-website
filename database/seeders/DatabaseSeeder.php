<?php

namespace Database\Seeders;

use App\Models\SiteSetting;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Initial CMS administrator — change the password after first login.
        User::factory()->admin()->create([
            'name' => 'PGL Admin',
            'email' => 'admin@pacificgitalestari.test',
        ]);

        $this->call(NewsSeeder::class);
        $this->call(ProjectSeeder::class);
        $this->call(ProductSeeder::class);
        $this->call(FaqSeeder::class);
        $this->call(GallerySeeder::class);
        $this->call(LegalDocumentSeeder::class);

        // Default social/OG meta (mirrors the company's own WhatsApp link-preview copy).
        SiteSetting::current()->update([
            'meta_title' => 'Pacific Gitalestari — Mitra Kimia Industri Gula Indonesia',
            'meta_description' => 'Chemical supporting khusus pabrik gula kristal putih (GKP) di Indonesia: flokulan, anti-scalant, biosida, boiler chemical, hingga water treatment.',
        ]);
    }
}
