export function parseTextToProducts(text, fornecedorPadrao = '') {
  if (!text.trim()) return [];
  
  const lines = text.split('\n').filter(line => line.trim());
  const parsed = [];

  lines.forEach((line, index) => {
    line = line.trim();
    
    // Pula cabeçalho CSV
    if (index === 0 && (line.toLowerCase().includes('produto') && (line.toLowerCase().includes('qtde') || line.toLowerCase().includes('quantidade') || line.toLowerCase().includes('descrição')))) {
      return;
    }
    
    let quantidade = 1;
    let descricao = '';
    let preco = 0;
    let matched = false;

    // PADRÃO CSV: Produto,Qtde,"R$ Unit." ou Produto,Qtde,R$ Unit. (aceita vírgula ou ponto como decimal)
    let match = line.match(/^"?(.+?)"?,\s*(\d+),\s*"?(?:R\$|\$)\s*([\d.,]+)"?/i);
    
    if (match) {
      descricao = match[1].trim().replace(/^"|"$/g, '');
      quantidade = parseInt(match[2]);
      const valorStr = match[3];
      if (valorStr.includes(',') && valorStr.includes('.')) {
        // "1.249,06" — ponto é milhar, vírgula é decimal
        preco = parseFloat(valorStr.replace(/\./g, '').replace(',', '.'));
      } else if (valorStr.includes(',')) {
        // "249,06" — vírgula é decimal
        preco = parseFloat(valorStr.replace(',', '.'));
      } else {
        // "249.06" ou "249" — ponto é decimal ou sem decimal
        preco = parseFloat(valorStr);
      }
      matched = true;
    }
    
    // PADRÃO CSV simples: Produto,Qtde,Preco (sem R$)
    if (!matched) {
      match = line.match(/^"?(.+?)"?,\s*(\d+),\s*"?([\d.,]+)"?$/);
      if (match) {
        descricao = match[1].trim().replace(/^"|"$/g, '');
        quantidade = parseInt(match[2]);
        const valorStr = match[3];
        preco = valorStr.includes(',') 
          ? parseFloat(valorStr.replace(/\./g, '').replace(',', '.')) 
          : parseFloat(valorStr);
        matched = true;
      }
    }
    
    // PADRÃO: "5 Produto R$ 10,00" ou "5x Produto R$ 10,00"
    if (!matched) {
      match = line.match(/^(\d+)x?\s+(.+?)\s+(?:(?:R\$|\$)\s*)?(\d[\d.,]*)$/i);
      
      if (match) {
        quantidade = parseInt(match[1]);
        descricao = match[2].trim();
        const valorStr = match[3];
        preco = valorStr.includes(',') 
          ? parseFloat(valorStr.replace(/\./g, '').replace(',', '.')) 
          : parseFloat(valorStr);
        matched = true;
      }
    }
    
    // PADRÃO: "Produto R$ 10,00" (sem quantidade, assume 1)
    if (!matched) {
      match = line.match(/^(.+?)\s+(?:R\$|\$)\s*([\d.,]+)$/i);
      
      if (match) {
        descricao = match[1].trim();
        quantidade = 1;
        const valorStr = match[2];
        preco = valorStr.includes(',') 
          ? parseFloat(valorStr.replace(/\./g, '').replace(',', '.')) 
          : parseFloat(valorStr);
        matched = true;
      }
    }
    
    // PADRÃO: "Produto | 5 | 10,00" ou "Produto - 5 - 10,00"
    if (!matched) {
      match = line.match(/^(.+?)\s*[|\-]\s*(\d+)\s*[|\-]\s*(?:(?:R\$|\$)\s*)?([\d.,]+)/);
      
      if (match) {
        descricao = match[1].trim();
        quantidade = parseInt(match[2]);
        const valorStr = match[3];
        preco = valorStr.includes(',') 
          ? parseFloat(valorStr.replace(/\./g, '').replace(',', '.')) 
          : parseFloat(valorStr);
        matched = true;
      }
    }
    
    // PADRÃO: "Produto;Qtde;Preco" (separado por ponto e vírgula)
    if (!matched) {
      match = line.match(/^"?(.+?)"?;\s*(\d+);\s*(?:(?:R\$|\$)\s*)?([\d.,]+)/);
      
      if (match) {
        descricao = match[1].trim().replace(/^"|"$/g, '');
        quantidade = parseInt(match[2]);
        const valorStr = match[3];
        preco = valorStr.includes(',') 
          ? parseFloat(valorStr.replace(/\./g, '').replace(',', '.')) 
          : parseFloat(valorStr);
        matched = true;
      }
    }

    if (descricao) {
      parsed.push({
        quantidade,
        descricao,
        fornecedor: fornecedorPadrao,
        preco,
        observacoes: ''
      });
    }
  });

  return parsed;
}