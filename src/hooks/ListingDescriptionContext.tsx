import { getCategories, getSubCategories } from '@/utils/categoryManager';
import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { useContext } from 'react';
import { getRegions } from '@/utils/regionManager';


type RegionArray = {
  places: any[],
  placeById: Map<number | null, any>
  childrenByParent: Map<number | null, any[]>,
  placesByLevel: Map<number, any[]>,
}


export const ListingDescriptionContext = createContext<{
  selectedCategory: number;
  selectedSubCategoryId: number;
  setSelectedCategory: (name: number) => void;
  setSelectedSubCategoryId: (id: number) => void;
  selectedRegion: number;
  setSelectedRegion: (region: number) => void;
  categories: any[];
  subCategories: any[];
  regionsMap: RegionArray;
  isEditMode: boolean;
  isSearchMode: boolean;
  setIsEditMode: (isEditMode: boolean) => void;
  isLoading : boolean;
  setIsSearchMode: (isSearchMode: boolean) => void;
}>({ 
      categories: [],
      subCategories: [],
      selectedCategory: 0, 
      setSelectedCategory: () => {},
      selectedSubCategoryId: 0, 
      setSelectedSubCategoryId: ()=>{}, 
      selectedRegion: 0, 
      setSelectedRegion: () => {},
      regionsMap: {places: [],placeById: new Map(), childrenByParent: new Map(), placesByLevel: new Map()},
      isEditMode: false,
      setIsEditMode: () => {},
      isLoading: false,
      isSearchMode: false,
      setIsSearchMode: () => {},
    }
  );

export const ListingDescriptionProvider = ({ children }: PropsWithChildren) => {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<number>(0);
  const [selectedRegion, setSelectedRegion] = useState<number>(0);

  const[isLoading, setIsLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [regions, setRegions] = useState<any[]>([]);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isSearchMode, setIsSearchMode] = useState<boolean>(false);


  useEffect(() => {
    setIsLoading(true);
    async function loadData() {
      const [cats, subs, regs] = await Promise.all([
        getCategories(),
        getSubCategories(),
        getRegions()
      ]);

      setCategories(cats ?? []);
      setSubCategories(subs ?? []);
      setRegions(regs ?? []);
    }

    loadData();
    setIsLoading(false);
  }, []);


  const placesByLevel = new Map<number, any[]>();

  const childrenByParent = new Map<number | null, any[]>();

  const placeById = new Map<number, any>();

  for (const place of regions) {
      placeById.set(place.id, place);

      const children = childrenByParent.get(Number(place.parent_id)) ?? [];
      children.push(place);
      childrenByParent.set(Number(place.parent_id), children);

      const arr = placesByLevel.get(place.level) ?? [];
      arr.push(place);
      placesByLevel.set(place.level, arr);
  }


  const regionsMap: RegionArray = {
    places: regions,
    placeById: placeById,
    placesByLevel: placesByLevel,
    childrenByParent: childrenByParent
  }

  
  return (
    <ListingDescriptionContext.Provider value={{ selectedCategory, setSelectedCategory, selectedSubCategoryId, setSelectedSubCategoryId, selectedRegion, setSelectedRegion, categories, subCategories, regionsMap, isEditMode, setIsEditMode, isLoading, isSearchMode, setIsSearchMode}}>
      {children}
    </ListingDescriptionContext.Provider>
  );
  
};

export const useListingDescriptionContext = () => useContext(ListingDescriptionContext);
