import { buildKnowledgeGraph, getRelatedNotes } from "@/lib/knowledge-graph";
import { getVaultNotes } from "@/lib/services/vault-service";
import type { KnowledgeDocument } from "@/lib/vault/types";

import type { ProductSummary, ProductWorkspace } from "./product.types";

function normalizeValue(value?: string | string[] | number | boolean | null): string {
    if (typeof value === "string") return value.trim();
    if (Array.isArray(value)) return value.join(", ");
    if (typeof value === "number" || typeof value === "boolean") return String(value);
    return "";
}

function getProductSignals(document: KnowledgeDocument) {
    const frontmatter = document.frontmatter ?? {};
    const productValue = normalizeValue(frontmatter.product);
    const aliases = [productValue, ...(Array.isArray(frontmatter.aliases) ? frontmatter.aliases : [])].filter(Boolean);
    const tags = document.tags ?? [];
    const folderParts = document.folder.split("/").filter(Boolean);

    return {
        productValue,
        aliases: aliases.map((alias) => String(alias).trim()).filter(Boolean),
        folderParts,
        tags,
    };
}

function inferProductName(document: KnowledgeDocument) {
    const { productValue, aliases, folderParts } = getProductSignals(document);

    if (productValue) return productValue;
    if (aliases.length > 0) return aliases[0];
    if (folderParts.length > 0) return folderParts[folderParts.length - 1];
    return document.title;
}

function containsProductReference(document: KnowledgeDocument, productName: string) {
    const normalizedName = productName.toLowerCase();
    return [document.title, document.path, ...document.aliases, ...document.tags, ...document.headings.map((heading) => heading.text)]
        .some((value) => value.toLowerCase().includes(normalizedName));
}

function pickOverview(document: KnowledgeDocument) {
    const heading = document.headings.find((item) => item.level === 1) ?? document.headings[0];
    return heading?.text ?? document.content.slice(0, 180).replace(/\s+/g, " ").trim();
}

function pickCategory(document: KnowledgeDocument) {
    const frontmatter = document.frontmatter ?? {};
    return normalizeValue(frontmatter.category) || normalizeValue(frontmatter.product_type) || "General";
}

function pickManufacturer(document: KnowledgeDocument) {
    const frontmatter = document.frontmatter ?? {};
    return normalizeValue(frontmatter.manufacturer) || normalizeValue(frontmatter.vendor) || undefined;
}

function classifyDocument(document: KnowledgeDocument) {
    const content = `${document.title} ${document.content}`.toLowerCase();
    if (content.includes("driver")) return "drivers";
    if (content.includes("firmware")) return "firmware";
    if (content.includes("warranty")) return "warranty";
    if (content.includes("install") || content.includes("installation")) return "installGuides";
    if (content.includes("troubleshoot") || content.includes("issue")) return "troubleshooting";
    return "relatedDocuments";
}

export async function buildProductWorkspace(): Promise<ProductWorkspace[]> {
    const documents = await getVaultNotes();
    const graph = buildKnowledgeGraph(documents);

    const productSeedMap = new Map<string, KnowledgeDocument[]>();

    documents.forEach((document) => {
        const { productValue, aliases, folderParts, tags } = getProductSignals(document);
        const candidates = [productValue, ...aliases, ...folderParts, ...tags].filter(Boolean);
        const productNames = new Set(candidates.map((value) => String(value).trim().toLowerCase()));

        productNames.forEach((name) => {
            const entry = productSeedMap.get(name) ?? [];
            entry.push(document);
            productSeedMap.set(name, entry);
        });
    });

    const productNames = Array.from(productSeedMap.keys()).sort();

    return productNames.map((productName) => {
        const documentsForProduct = productSeedMap.get(productName) ?? [];
        const primaryDocument = documentsForProduct[0];
        const related = getRelatedNotes(primaryDocument.path, documents, graph)
            .filter((candidate) => candidate.title.toLowerCase() !== primaryDocument.title.toLowerCase())
            .slice(0, 6);

        const workspace: ProductWorkspace = {
            id: productName.replace(/\s+/g, "-").toLowerCase(),
            name: inferProductName(primaryDocument),
            manufacturer: pickManufacturer(primaryDocument),
            category: pickCategory(primaryDocument),
            tags: Array.from(new Set([...(primaryDocument.tags ?? []), ...(primaryDocument.frontmatter.tags ? [String(primaryDocument.frontmatter.tags)] : [])]))),
        aliases: Array.from(new Set([productName, ...(primaryDocument.aliases ?? [])])),
            overview: pickOverview(primaryDocument),
                drivers: documentsForProduct.filter((document) => classifyDocument(document) === "drivers"),
                    firmware: documentsForProduct.filter((document) => classifyDocument(document) === "firmware"),
                        warranty: documentsForProduct.filter((document) => classifyDocument(document) === "warranty"),
                            installGuides: documentsForProduct.filter((document) => classifyDocument(document) === "installGuides"),
                                troubleshooting: documentsForProduct.filter((document) => classifyDocument(document) === "troubleshooting"),
                                    relatedProducts: documentsForProduct.filter((document) => containsProductReference(document, productName)),
                                        relatedDevices: [],
                                            relatedCustomers: [],
                                                relatedRMAs: [],
                                                    relatedDocuments: documentsForProduct.filter((document) => document.path !== primaryDocument.path),
                                                        graphNeighbors: related.map((candidate) => ({
                                                            title: candidate.title,
                                                            path: candidate.path,
                                                            folder: candidate.folder,
                                                            modified: primaryDocument.modified,
                                                            frontmatter: {},
                                                            headings: [],
                                                            tags: candidate.tags,
                                                            links: [],
                                                            aliases: [],
                                                            content: "",
                                                        })),
                                                            activity: [],
        };

return workspace;
    });
}
