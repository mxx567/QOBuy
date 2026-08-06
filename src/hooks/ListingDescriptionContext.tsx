import { getCategories, getSubCategories } from '@/utils/categoryManager';
import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { useContext } from 'react';
import category from '../app/categories/[category]';

export type Region = {
  regId: number,
  full_path: string
}



export const ListingDescriptionContext = createContext<{
  selectedCategory: number;
  selectedSubCategoryId: number;
  setSelectedCategory: (name: number) => void;
  setSelectedSubCategoryId: (id: number) => void;
  selectedRegion: Region;
  setSelectedRegion: (region: Region) => void;
  categories: any[];
  subCategories: any[]
}>({ 
      categories: [],
      subCategories: [],
      selectedCategory: 0, 
      setSelectedCategory: () => {},
      selectedSubCategoryId: 0, 
      setSelectedSubCategoryId: ()=>{}, 
      selectedRegion: {regId: 0, full_path: ''}, 
      setSelectedRegion: () => {}}
    
  );

export const ListingDescriptionProvider = ({ children }: PropsWithChildren) => {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<number>(0)
  const [selectedRegion, setSelectedRegion] = useState<Region>({regId: 0, full_path: ''})

  const [categories, setCategories] = useState<any[]>([]);
  const [subCategories, setSubCategories] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      const [cats, subs] = await Promise.all([
        getCategories(),
        getSubCategories(),
      ]);

      setCategories(cats ?? []);
      setSubCategories(subs ?? []);
    }

    loadData();
  }, []);


  return (
    <ListingDescriptionContext.Provider value={{ selectedCategory, setSelectedCategory, selectedSubCategoryId, setSelectedSubCategoryId, selectedRegion, setSelectedRegion, categories, subCategories}}>
      {children}
    </ListingDescriptionContext.Provider>
  );
};

export const useListingDescriptionContext = () => useContext(ListingDescriptionContext);
