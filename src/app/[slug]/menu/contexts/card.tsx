"use client";

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

export interface CardProduct extends Product {
  quantity: number;
}

export interface ICardContext {
  total: number;
  isOpen: boolean;
  products: CardProduct[];
  toggleCard: () => void;
  addProduct: (product: CardProduct) => void;
  decreaseProductQuantity: (productId: string) => void;
  encreaseProductQuantity: (productId: string) => void;
}

export const CardContext = createContext<ICardContext>({
  total: 0,
  isOpen: false,
  products: [],
  toggleCard: () => {},
  addProduct: () => {},
  decreaseProductQuantity: () => {},
  encreaseProductQuantity: () => {},
});

export const CardProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CardProduct[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleCard = () => {
    setIsOpen((prev) => !prev);
  };

  const addProduct = (product: CardProduct) => {
    const isProductAlreadOnCard = products.some(
      (prod) => prod.id === product.id
    );

    if (!isProductAlreadOnCard) {
      return setProducts((prev) => [...prev, product]);
    }

    setProducts((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        if (prevProduct.id === product.id) {
          return {
            ...prevProduct,
            quantity: prevProduct.quantity + product.quantity,
          };
        }
        return prevProduct;
      });
    });
  };

  const decreaseProductQuantity = (productId: string) => {
    setProducts((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        if (prevProduct.id != productId) {
          return prevProduct;
        }

        if (prevProduct.quantity === 1) {
          return prevProduct;
        }

        return { ...prevProduct, quantity: prevProduct.quantity - 1 };
      });
    });
  };

  const encreaseProductQuantity = (productId: string) => {
    setProducts((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        if (productId === prevProduct.id) {
          return { ...prevProduct, quantity: prevProduct.quantity + 1 };
        }
        return prevProduct;
      });
    });
  };

  const total = products.reduce((acc, product) => {
    return (acc = product.price * product.quantity);
  }, 0);

  return (
    <CardContext.Provider
      value={{
        total,
        isOpen,
        products,
        toggleCard,
        addProduct,
        decreaseProductQuantity,
        encreaseProductQuantity,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};
