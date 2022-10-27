import { useCallback, useEffect, useState } from 'react';

import { SingleValue } from 'react-select';

import { OptionType } from 'Components/Select';

export const usePagination = (data: unknown[]) => {
  const [pagination, setPagination] = useState<Record<string, number>>({
    page: 1,
    pageSize: 10,
    totalData: 10,
  });

  const handleChangePage = useCallback((page: number) => {
    setPagination((prev: Record<string, number>) => ({
      ...prev,
      page,
    }));
  }, []);

  const handleSyncPagination = useCallback(() => {
    setPagination((prev: Record<string, number>) => ({
      ...prev,
      totalData: Object.keys(data).length,
    }));
  }, [data]);

  const handleChangePageSize = (pageSize: SingleValue<unknown>) => {
    setPagination((prev: Record<string, number>) => ({
      ...prev,
      page: 1,
      pageSize: (pageSize as OptionType).value as number,
    }));
  };
  useEffect(() => {
    handleSyncPagination();
  }, [handleSyncPagination]);

  return {
    pagination,
    handleChangePageSize,
    handleChangePage,
  };
};
