"use client"

import { ProductInterface, ProductListObject } from "@/interfaces/product.interface";
import { api } from "@/service/api";
import { ReactNode, createContext, useContext, useState } from "react";

interface Props {
  children: ReactNode
}

interface ApiProviderData {
  getAllProducts: (search: string) => Promise<ProductListObject | undefined>;
  productsDisplay: ProductInterface[];
}

export const ApiContext = createContext<ApiProviderData>({} as ApiProviderData)

export const ApiProvider = ({ children }: Props) => {
  const [productsDisplay, setProductsDisplay] = useState([] as ProductInterface[])

  const getAllProducts = async (search: string): Promise<ProductListObject | undefined> => {
    try {
      const list = await api.get(`products/${search}`)
      setProductsDisplay(list.data.data)

      return list.data
    } catch (error) {
      console.error(error)
    }
  }

  return <ApiContext.Provider value={{ getAllProducts, productsDisplay }}>
    {children}
  </ApiContext.Provider>
}

export const useApi = () => useContext(ApiContext);
