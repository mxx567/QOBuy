import { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "@/src/hooks/AuthContext";
import {
    addLikedListing,
    getLikedListingIds,
    removeLikedListing,
} from "@/utils/favorites";

export function useFavorites() {
    const { profile, isLoading: isAuthLoading } = useAuthContext();
    const userId = profile?.id as string | undefined;
    const [likedListingIds, setLikedListingIds] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const refreshFavorites = useCallback(async () => {
        if (!userId) {
            setLikedListingIds([]);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        try {
            setLikedListingIds(await getLikedListingIds(userId));
        } catch (error) {
            console.error("Error fetching liked listings:", error);
            setLikedListingIds([]);
        } finally {
            setIsLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        if (!isAuthLoading) {
            refreshFavorites();
        }
    }, [isAuthLoading, refreshFavorites]);

    const toggleFavorite = useCallback(async (listingId: number, isFavorited: boolean) => {
        if (!userId) return;

        const previous = likedListingIds;
        const next = isFavorited
            ? [...likedListingIds, listingId]
            : likedListingIds.filter((id) => id !== listingId);

        setLikedListingIds(next);
        try {
            if (isFavorited) {
                await addLikedListing(userId, listingId);
            } else {
                await removeLikedListing(userId, listingId);
            }
        } catch (error) {
            setLikedListingIds(previous);
            console.error("Couldn't update favorite:", error);
        }
    }, [likedListingIds, userId]);

    return {
        likedListingIds,
        isLoading: isAuthLoading || isLoading,
        toggleFavorite,
        refreshFavorites,
    };
}
