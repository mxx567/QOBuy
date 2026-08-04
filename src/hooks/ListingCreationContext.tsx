import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { useContext } from 'react';
export const ListingCreationContext = createContext<{
  selectedCategory: string;
  selectedSubCategoryId: number;
  setSelectedCategory: (name: string) => void;
  setSelectedSubCategoryId: (id: number) => void;
}>({ selectedCategory: "", setSelectedCategory: () => {}, selectedSubCategoryId: 0, setSelectedSubCategoryId: ()=>{}});

export const ListingCreationProvider = ({ children }: PropsWithChildren) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<number>(0)
  return (
    <ListingCreationContext.Provider value={{ selectedCategory, setSelectedCategory, selectedSubCategoryId, setSelectedSubCategoryId }}>
      {children}
    </ListingCreationContext.Provider>
  );
};

export const useListingCreationContext = () => useContext(ListingCreationContext);