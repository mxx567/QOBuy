import { supabase } from "@/utils/supabase";

export async function getLikedListingIds(userId: string): Promise<number[]> {
    const { data, error } = await supabase
        .from("liked")
        .select("listing_id")
        .eq("user_id", userId);

    if (error) {
        throw error;
    }

    return (data ?? []).map((row: { listing_id: number }) => row.listing_id);
}

export async function addLikedListing(userId: string, listingId: number): Promise<void> {
    const { error } = await supabase
        .from("liked")
        .insert({ user_id: userId, listing_id: listingId });

    if (error) {
        throw error;
    }
}

export async function removeLikedListing(userId: string, listingId: number): Promise<void> {
    const { error } = await supabase
        .from("liked")
        .delete()
        .eq("listing_id", listingId)
        .eq("user_id", userId);

    if (error) {
        throw error;
    }
}
