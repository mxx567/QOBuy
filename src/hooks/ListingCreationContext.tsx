import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { useContext } from 'react';
export const ListingCreationContext = createContext<{
  selectedCategory: string;
  selectedSubCategoryId: number;
  setSelectedCategory: (name: string) => void;
  setSelectedSubCategoryId: (id: number) => void;
}>({ selectedCategoryId: 0, setSelectedCategoryId: () => {} });

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