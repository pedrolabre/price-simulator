export function calculateProduct(product, ipi, frete, margem, freteEmbutido) {
  const precoUnitario = product.preco;
  const ipiValue = precoUnitario * (ipi / 100);
  
  const baseParaFrete = freteEmbutido ? precoUnitario : (precoUnitario + ipiValue);
  const freteValue = baseParaFrete * (frete / 100);
  
  const custoRealUnitario = precoUnitario + ipiValue + freteValue;
  const precoVistaUnitario = custoRealUnitario * (1 + margem / 100);
  
  const totalCustoReal = custoRealUnitario * product.quantidade;
  const totalPrecoVista = precoVistaUnitario * product.quantidade;
  
  return { 
    ipiValue, 
    freteValue, 
    custoRealUnitario, 
    precoVistaUnitario,
    totalCustoReal,
    totalPrecoVista
  };
}

export function calculateTotals(products, calculations) {
  return products.reduce((acc, product) => {
    const calc = calculations[product.id];
    return {
      totalPrecoOriginal: acc.totalPrecoOriginal + (product.preco * product.quantidade),
      totalIPI: acc.totalIPI + (calc.ipiValue * product.quantidade),
      totalFrete: acc.totalFrete + (calc.freteValue * product.quantidade),
      totalCustoReal: acc.totalCustoReal + calc.totalCustoReal,
      totalPrecoVista: acc.totalPrecoVista + calc.totalPrecoVista
    };
  }, { 
    totalPrecoOriginal: 0, 
    totalIPI: 0, 
    totalFrete: 0, 
    totalCustoReal: 0, 
    totalPrecoVista: 0 
  });
}