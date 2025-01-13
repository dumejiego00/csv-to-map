import Place from "./Place";
export default interface IWritable {
    write(placeStr: Place[]): Promise<void>;
}