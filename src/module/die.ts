/**
 * Definition of a dice roll result as returned by DiceTerm.roll.
 */
interface DiceTermResult {
  result: number,
  active: boolean,
  count?: number
};

/**
 * Implementation of the Cyberpunk RED d10 critical success and failure
 * dice rolling rules.
 */
export default class CpRedDie extends Die {

  constructor(termData: any={}) {
    super(termData);
  }

  /**
   * Implements the additional rolls on critical failure and success.
   * 
   * This rule is only applied when a dice roll has the "cp" modifier.
   * 
   * @param modifier: The modifier string passed to the dice roll 
   */
  cyberpunk(modifier: string) {
    const rgx = /(cp)?/;
    const match = modifier.match(rgx);
    if ( !match ) return this;

    let critSuccess : boolean = false;
    let critFailure : boolean = false;
    this.results.forEach((r: DiceTermResult) => {
      critSuccess = (r.result === this.faces) || critSuccess;
      critFailure = (r.result === 1) || critFailure;
    });

    if(critSuccess) {
      this.roll();
    }
    if(critFailure) {
      this.roll();
      let lastElement : DiceTermResult = 
        <DiceTermResult>(this.results[this.results.length - 1]);
      lastElement.count = -1 * lastElement.result;
    }
  }
}

// Ensure that this new dice behaves exactly like a standard Die instance with
// the addition of handling the cyberpunk rules.
(CpRedDie as any).MODIFIERS = (Die as any).MODIFIERS;
(CpRedDie as any).MODIFIERS.cp = "cyberpunk";