import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { useContext } from 'react';

export type Region = {
  regId: number,
  full_path: string
}


export const ListingCreationContext = createContext<{
  selectedCategory: string;
  selectedSubCategoryId: number;
  setSelectedCategory: (name: string) => void;
  setSelectedSubCategoryId: (id: number) => void;
  selectedRegion: Region;
  setSelectedRegion: (region: Region) => void;
}>({ selectedCategory: "", 
     setSelectedCategory: () => {},
     selectedSubCategoryId: 0, 
     setSelectedSubCategoryId: ()=>{}, 
     selectedRegion: {regId: 0, full_path: ''}, 
     setSelectedRegion: () => {}});

export const ListingCreationProvider = ({ children }: PropsWithChildren) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<number>(0)
  const [selectedRegion, setSelectedRegion] = useState<Region>({regId: 0, full_path: ''})
  return (
    <ListingCreationContext.Provider value={{ selectedCategory, setSelectedCategory, selectedSubCategoryId, setSelectedSubCategoryId, selectedRegion, setSelectedRegion}}>
      {children}
    </ListingCreationContext.Provider>
  );
};

export const useListingCreationContext = () => useContext(ListingCreationContext);