export default interface IrepositoryBase<T> {
    Getdata(t:T):Promise<T>
}