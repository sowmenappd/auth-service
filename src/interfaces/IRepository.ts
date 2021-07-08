export default interface IRepository {
  findOne(params?: any): any;
  findMany(params?: any): any;
  create(id: string, params: any): any;
  update(id: string, params: any): any;
  delete(id: string): any;
}
