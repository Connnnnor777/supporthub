import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ProductWorkspace } from "@/lib/products";

export function ProductHeader({ product }: { product: ProductWorkspace }) {
    return (
        <div className="rounded-2xl border border-border/70 bg-card/80 p-6 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <p className="text-sm font-medium text-primary">Product Workspace</p>
                    <h1 className="mt-1 text-3xl font-semibold tracking-tight">{product.name}</h1>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {product.manufacturer ? <Badge variant="outline">{product.manufacturer}</Badge> : null}
                        {product.category ? <Badge variant="secondary">{product.category}</Badge> : null}
                        {product.tags.slice(0, 4).map((tag) => <Badge key={tag} variant="outline">{tag}</Badge>)}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">Open knowledge</Button>
                    <Button>Quick actions</Button>
                </div>
            </div>
        </div>
    );
}
