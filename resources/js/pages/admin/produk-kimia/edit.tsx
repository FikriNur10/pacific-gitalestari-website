import { Head } from '@inertiajs/react';
import ProductForm from '@/components/admin/product-form';
import type {SpecRow} from '@/components/admin/product-form';
import Heading from '@/components/heading';
import { index as produkIndex, update } from '@/routes/admin/produk-kimia';

type StatusOption = { value: string; label: string };

type ProductData = {
    id: number;
    name: string;
    slug: string;
    category: string | null;
    summary: string | null;
    description: string | null;
    specs: SpecRow[];
    application: string | null;
    status: string;
    sortOrder: number;
    imageUrl: string | null;
    datasheetUrl: string | null;
};

export default function ProdukKimiaEdit({
    product,
    statusOptions,
}: {
    product: ProductData;
    statusOptions: StatusOption[];
}) {
    return (
        <div className="px-4 py-6">
            <Head title={`Edit: ${product.name}`} />
            <Heading title="Edit produk" description={product.name} />
            <ProductForm
                submitUrl={update(product.slug).url}
                method="put"
                statusOptions={statusOptions}
                existingImageUrl={product.imageUrl}
                existingDatasheetUrl={product.datasheetUrl}
                initial={{
                    name: product.name,
                    slug: product.slug,
                    category: product.category ?? '',
                    status: product.status,
                    sort_order: String(product.sortOrder),
                    summary: product.summary ?? '',
                    description: product.description ?? '',
                    application: product.application ?? '',
                    specs: product.specs ?? [],
                }}
                submitLabel="Perbarui produk"
            />
        </div>
    );
}

ProdukKimiaEdit.layout = {
    breadcrumbs: [{ title: 'Produk Kimia', href: produkIndex() }],
};
