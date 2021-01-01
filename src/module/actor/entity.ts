export class ActorCpRed<DataType = ActorDataCpRed> extends Actor<DataType> {
  /**
   *
   */
  constructor(data: EntityData<DataType>, options: any) {
    super(data, options);
  }
}

export class ItemCpRed<DataType = ItemDataCpRed> extends Item<DataType> {
  /**
   *
   */
  constructor(data: EntityData<DataType>, options: any) {
    super(data, options);
  }
}