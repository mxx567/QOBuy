type ListingFormValues = {
    title: string;
    description: string;
    price: string | number;
    selectedSubCategoryId: number | undefined;
    selectedRegion: number | undefined;
};

export function getListingFormErrors({
    title,
    description,
    price,
    selectedSubCategoryId,
    selectedRegion,
}: ListingFormValues): string[] {
    const errors: string[] = [];
    const normalizedTitle = title.trim();
    const normalizedDescription = description.trim();
    const numericPrice = Number(price);

    if (normalizedTitle.length < 16 || normalizedTitle.length > 64) {
        errors.push("Title must contain 16 to 64 characters.");
    }

    if (normalizedDescription.length < 64 || normalizedDescription.length > 4096) {
        errors.push("Description must contain 64 to 4096 characters.");
    }

    if (!selectedSubCategoryId) {
        errors.push("Select a category.");
    }

    if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
        errors.push("Enter a price greater than zero.");
    }

    if (!selectedRegion) {
        errors.push("Select a region.");
    }

    return errors;
}