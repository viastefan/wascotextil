"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  getFinishing,
  getProduct,
  lineTotal,
  type FinishingId,
  type SizeId,
} from "@/lib/catalog";

export type CartItem = {
  key: string;
  productId: string;
  slug: string;
  category: string;
  name: string;
  colorId: string;
  colorName: string;
  colorHex: string;
  size: SizeId;
  finishing: FinishingId;
  finishingName: string;
  quantity: number;
  note?: string;
  unitPrice: number;
};

type CartContextValue = {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, "key" | "unitPrice" | "finishingName">) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
  hydrated: boolean;
};

const STORAGE_KEY = "wascotextil.cart.v1";
const CartContext = createContext<CartContextValue | null>(null);
const EMPTY: CartItem[] = [];
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) emit();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function readItems(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as CartItem[];
    if (!Array.isArray(parsed)) return EMPTY;
    return parsed.map((item) => withPricing(item));
  } catch {
    return EMPTY;
  }
}

function getSnapshot() {
  return JSON.stringify(readItems());
}

function getServerSnapshot() {
  return "[]";
}

function writeItems(items: CartItem[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  emit();
}

function makeKey(item: Pick<CartItem, "productId" | "colorId" | "size" | "finishing" | "note">) {
  return [item.productId, item.colorId, item.size, item.finishing, item.note ?? ""].join("::");
}

function withPricing(item: Omit<CartItem, "key" | "unitPrice" | "finishingName"> & { key?: string }): CartItem {
  const product = getProduct(item.category, item.slug);
  const finishing = getFinishing(item.finishing);
  const total = product ? lineTotal(product, item.finishing, item.quantity) : 0;
  return {
    ...item,
    key: item.key ?? makeKey(item),
    finishingName: finishing.name,
    unitPrice: item.quantity > 0 ? Math.round(total / item.quantity) : 0,
  };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const items = useMemo(() => JSON.parse(snapshot) as CartItem[], [snapshot]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((incoming: Omit<CartItem, "key" | "unitPrice" | "finishingName">) => {
    const current = readItems();
    const key = makeKey(incoming);
    const existing = current.find((item) => item.key === key);
    const next = existing
      ? current.map((item) =>
          item.key === key ? withPricing({ ...item, quantity: item.quantity + incoming.quantity }) : item,
        )
      : [...current, withPricing(incoming)];
    writeItems(next);
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((key: string) => {
    writeItems(readItems().filter((item) => item.key !== key));
  }, []);

  const updateQuantity = useCallback((key: string, quantity: number) => {
    writeItems(
      readItems().flatMap((item) => {
        if (item.key !== key) return [item];
        if (quantity <= 0) return [];
        return [withPricing({ ...item, quantity })];
      }),
    );
  }, []);

  const clearCart = useCallback(() => writeItems([]), []);
  const getTotal = useCallback(
    () => items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    [items],
  );
  const getItemCount = useCallback(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      toggleCart: () => setIsOpen((open) => !open),
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getTotal,
      getItemCount,
      hydrated,
    }),
    [items, isOpen, addItem, removeItem, updateQuantity, clearCart, getTotal, getItemCount, hydrated],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
