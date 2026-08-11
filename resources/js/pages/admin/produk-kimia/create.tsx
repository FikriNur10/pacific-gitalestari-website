import { Head } from '@inertiajs/react';
import ProductForm from '@/components/admin/product-form';
import Heading from '@/components/heading';
import {
    create,
    index as produkIndex,
    store,
} from '@/routes/admin/produk-kimia';

type StatusOption = { value: string; label: string };

export default function ProdukKimiaCreate({
    statusOptions,
}: {
    statusOptions: StatusOption[];
}) {
    return (
        <div className="px-4 py-6">
            <Head title="Produk baru" />
            <Heading
                title="Produk baru"
                description="Tambahkan produk kimia ke katalog"
            />
            <ProductForm
                submitUrl={store().url}
                method="post"
                statusOptions={statusOptions}
                submitLabel="Simpan produk"
            />
        </div>
    );
}

ProdukKimiaCreate.layout = {
    breadcrumbs: [
        { title: 'Produk Kimia', href: produkIndex() },
        { title: 'Baru', href: create() },
    ],
};
