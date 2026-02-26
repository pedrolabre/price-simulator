import { useState } from 'react';

export function useProducts() {
  const [products, setProducts] = useState([]);

  const addProduct = (product) => {
    setProducts(prev => [...prev, { ...product, id: Date.now() + Math.random(), observacoes: product.observacoes || '' }]);
  };

  const addProducts = (newProducts) => {
    if (newProducts.length === 0) return;
    const withIds = newProducts.map((p, i) => ({ ...p, id: Date.now() + Math.random() + i, observacoes: p.observacoes || '' }));
    setProducts(prev => [...prev, ...withIds]);
  };

  const updateProduct = (id, field, value) => {
    setProducts(prev => prev.map(p => 
      p.id === id 
        ? { ...p, [field]: field === 'descricao' || field === 'fornecedor' || field === 'observacoes' ? value : parseFloat(value) || 0 } 
        : p
    ));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const addEmptyRow = (fornecedorPadrao = '') => {
    setProducts(prev => [...prev, {
      id: Date.now(),
      quantidade: 1,
      descricao: '',
      fornecedor: fornecedorPadrao,
      preco: 0,
      observacoes: ''
    }]);
  };

  const clearProducts = () => {
    setProducts([]);
  };

  return {
    products,
    addProduct,
    addProducts,
    updateProduct,
    deleteProduct,
    addEmptyRow,
    clearProducts
  };
}