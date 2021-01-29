import { ItemCpRed } from "../item/item";

export class ActorCpRed<DataType = ActorDataCpRed> extends Actor<DataType> {
  /**
   *
   */
  constructor(data: EntityData<DataType>, options: unknown) {
    super(data, options);
  }

  /**
   * @override
   * @type {Collection<ItemCpRed>}
   * @memberof ActorCpRed
   */
  items: Collection<ItemCpRed>;
}
