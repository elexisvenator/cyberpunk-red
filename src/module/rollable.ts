/**
 * Abstract class for all roll implementations.
 *
 * An instance is constructed with the information necessary to perform a
 * roll and the base class provides a method which handles rolling and
 * rendering the outcome for all derived implementations.
 */
export abstract class Rollable {
  formula: string;
  actor: Actor;
  item?: Item;

  /**
   * Creates a new rollable instance.
   *
   * @param formula Formula to use during rolling
   * @param actor Actor whose statistics are to be used for rolling
   * @param item Item whose statistics are to be used for rolling
   */
  constructor(formula: string, actor: Actor, item?: Item) {
    this.formula = formula;
    this.actor = actor;
    this.item = item;
  }

  /**
   * Implements the specific rolling logic using the data provided to the constructor.
   */
  abstract roll(): void;

  protected _executeRoll(roll: Roll): void {
    const actor = this.actor;
    roll
      .roll()
      .render()
      .then((content) => {
        ChatMessage.create({
          user: game.user._id,
          speaker: ChatMessage.getSpeaker({ actor }),
          content,
          sound: CONFIG.sounds.dice,
        });
      });
  }
}

/**
 * Formula only based rollable implementation.
 *
 * Performs a roll according to the provided formula only.
 */
export class FormulaRollable extends Rollable {
  roll(): void {
    this._executeRoll(new Roll(this.formula));
  }
}