import { parseTextToProducts } from '../utils/parsers';

export function useParser() {
  const parse = (text, fornecedorPadrao = '') => {
    return parseTextToProducts(text, fornecedorPadrao);
  };

  return { parse };
}