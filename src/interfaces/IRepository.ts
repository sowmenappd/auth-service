export default interface IRepository<T> {
  findOne(params?: any): Promise<T | undefined>;
  findMany(params?: any): Promise<T[] | undefined>;
  create(id: string, params: any): any;
  update(id: string, params: any): any;
  delete(id: string): any;
}
