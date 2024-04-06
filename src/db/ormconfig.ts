import { dataSourceOptions } from './data-source';
export default {
  ...dataSourceOptions,
  seeds: ['dist/modules/**/*.seed{.ts,.js}'],
  factories: ['dist/modules/**/*.factory{.ts,.js}'],
};
