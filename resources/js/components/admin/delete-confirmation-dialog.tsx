import { router } from '@inertiajs/react';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

type DeleteConfirmationDialogProps = {
    title: string;
    description: string;
    confirmLabel: string;
    deleteUrl: string;
    trigger: (openDialog: () => void) => ReactNode;
};

export default function DeleteConfirmationDialog({
    title,
    description,
    confirmLabel,
    deleteUrl,
    trigger,
}: DeleteConfirmationDialogProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const remove = () => {
        setIsDeleting(true);

        router.delete(deleteUrl, {
            preserveScroll: true,
            onSuccess: () => setIsOpen(false),
            onFinish: () => setIsDeleting(false),
        });
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                if (!isDeleting) {
                    setIsOpen(open);
                }
            }}
        >
            <DialogTrigger asChild>
                {trigger(() => setIsOpen(true))}
            </DialogTrigger>
            <DialogContent aria-busy={isDeleting}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        disabled={isDeleting}
                        onClick={() => setIsOpen(false)}
                    >
                        Batal
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        disabled={isDeleting}
                        onClick={remove}
                    >
                        {isDeleting ? 'Menghapus…' : confirmLabel}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
