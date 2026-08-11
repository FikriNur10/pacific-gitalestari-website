<?php

test('admin delete interfaces use the shared confirmation dialog', function () {
    $pages = [
        'resources/js/pages/admin/berita/index.tsx',
        'resources/js/pages/admin/download/index.tsx',
        'resources/js/pages/admin/faq/index.tsx',
        'resources/js/pages/admin/galeri/index.tsx',
        'resources/js/pages/admin/kontak/show.tsx',
        'resources/js/pages/admin/legalitas/index.tsx',
        'resources/js/pages/admin/produk-kimia/index.tsx',
        'resources/js/pages/admin/proyek/index.tsx',
    ];

    foreach ($pages as $page) {
        expect(file_get_contents(base_path($page)))
            ->toContain('DeleteConfirmationDialog')
            ->not->toContain('confirm(');
    }

    expect(file_get_contents(resource_path('js/components/admin/delete-confirmation-dialog.tsx')))
        ->toContain('DialogContent')
        ->toContain('router.delete')
        ->toContain('Menghapus…');
});
