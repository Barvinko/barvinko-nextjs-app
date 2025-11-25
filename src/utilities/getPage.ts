interface ParamsProps {
  page?: string;
  id?: string;
}

export function getPage(params: ParamsProps): number | undefined {
  if (!params || typeof params.page !== 'string') return undefined;
  const page = parseInt(params?.page);
  return Number.isInteger(page) && page > 0 ? page : undefined;
}
