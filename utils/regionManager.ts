import { supabase } from "./supabase";

export const getRegions = async () => {
    try {
        const { data: regions, error } = await supabase.from("places").select("*");
        if (error) {
            console.error('Error fetching regions:', error.message);
            return null;
        }

        if (regions && regions.length > 0) {
            return regions;
        }
    } catch (error) {
        console.error('Error fetching regions:');
    }
};
