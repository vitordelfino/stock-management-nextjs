export function formatCurrency(val: number, ignoreSinal = false): string {
  const { format } = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  // eslint-disable-next-line no-nested-ternary
  const num = ignoreSinal ? (val < 0 ? val * -1 : val) : val;
  return format(num);
}
