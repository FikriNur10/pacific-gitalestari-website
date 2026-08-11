import { Button } from '@/components/ui/button';

type CollectionEmptyStateProps = {
    // True when a search/filter is currently narrowing the list. Switches the copy
    // from "belum ada data" (encourage creating) to "tidak ada hasil" (offer reset).
    isFiltered: boolean;
    // Shown when the collection is genuinely empty (no filter active).
    emptyMessage: string;
    // Clears the active filter/search and reloads the unfiltered list.
    onReset: () => void;
    // Shown when a filter is active but matched nothing; has a sensible default.
    filteredMessage?: string;
};

/**
 * Shared empty state for admin list pages. Distinguishes "belum ada data" from
 * "tidak ada hasil untuk filter ini" (DESIGN.md §9/§12) and offers a reset when a
 * filter is the reason the list is empty. Rendered inside the caller's own wrapper
 * (a table `<td>` or a `<div>`), so it only owns the message + reset affordance.
 */
export default function CollectionEmptyState({
    isFiltered,
    emptyMessage,
    onReset,
    filteredMessage = 'Tidak ada hasil untuk filter ini.',
}: CollectionEmptyStateProps) {
    if (!isFiltered) {
        return <p>{emptyMessage}</p>;
    }

    return (
        <div className="space-y-3">
            <p>{filteredMessage}</p>
            <Button type="button" variant="outline" size="sm" onClick={onReset}>
                Reset filter
            </Button>
        </div>
    );
}
