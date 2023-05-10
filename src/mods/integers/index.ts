import { Decrement } from "./generated/decrement.js";
import { Decrement10 } from "./generated/decrement10.js";
import { Decrement100 } from "./generated/decrement100.js";
import { Decrement1000 } from "./generated/decrement1000.js";
import { Increment } from "./generated/increment.js";
import { Increment10 } from "./generated/increment10.js";
import { Increment100 } from "./generated/increment100.js";
import { Increment1000 } from "./generated/increment1000.js";

export type DecrementN = { [x: number]: number } & Decrement
export type Decrement10N = { [x: number]: number } & Decrement10
export type Decrement100N = { [x: number]: number } & Decrement100
export type Decrement1000N = { [x: number]: number } & Decrement1000

export type IncrementN = { [x: number]: number } & Increment
export type Increment10N = { [x: number]: number } & Increment10
export type Increment100N = { [x: number]: number } & Increment100
export type Increment1000N = { [x: number]: number } & Increment1000

export type LessThan1000<X extends number> =
  Decrement1000N[X] extends 0 ? true : false

export type LessThan100<X extends number> =
  Decrement100N[X] extends 0 ? true : false

export type LessThan10<X extends number> =
  Decrement10N[X] extends 0 ? true : false

export type Add<X extends number, Y extends number> =
  LessThan1000<Y> extends true ? (
    LessThan100<Y> extends true ? (
      LessThan10<Y> extends true ? (
        Y extends 0 ? (
          X
        ) : (
          Add<IncrementN[X], DecrementN[Y]>
        )
      ) : (
        Add<Increment10N[X], Decrement10N[Y]>
      )
    ) : (
      Add<Increment100N[X], Decrement100N[Y]>
    )
  ) : (
    Add<Increment1000N[X], Decrement1000N[Y]>
  )

export type Subtract<X extends number, Y extends number> =
  LessThan1000<Y> extends true ? (
    LessThan100<Y> extends true ? (
      LessThan10<Y> extends true ? (
        Y extends 0 ? (
          X
        ) : (
          Subtract<DecrementN[X], DecrementN[Y]>
        )
      ) : (
        Subtract<Decrement10N[X], Decrement10N[Y]>
      )
    ) : (
      Subtract<Decrement100N[X], Decrement100N[Y]>
    )
  ) : (
    Subtract<Decrement1000N[X], Decrement1000N[Y]>
  )

export type IsGreater<X extends number, Y extends number> =
  LessThan1000<X> extends true ? (
    LessThan1000<Y> extends true ? (
      LessThan100<X> extends true ? (
        LessThan100<Y> extends true ? (
          LessThan10<X> extends true ? (
            LessThan10<Y> extends true ? (
              X extends 0 ? (
                false
              ) : (
                Y extends 0 ? (
                  true
                ) : (
                  IsGreater<DecrementN[X], DecrementN[Y]>
                )
              )
            ) : (
              false
            )
          ) : (
            LessThan10<Y> extends true ? (
              true
            ) : (
              IsGreater<Decrement10N[X], Decrement10N[Y]>
            )
          )
        ) : (
          false
        )
      ) : (
        LessThan100<Y> extends true ? (
          true
        ) : (
          IsGreater<Decrement100N[X], Decrement100N[Y]>
        )
      )
    ) : (
      false
    )
  ) : (
    LessThan1000<Y> extends true ? (
      true
    ) : (
      IsGreater<Decrement1000N[X], Decrement1000N[Y]>
    )
  )

export type IsGreaterOrEquals<X extends number, Y extends number> =
  LessThan1000<X> extends true ? (
    LessThan1000<Y> extends true ? (
      LessThan100<X> extends true ? (
        LessThan100<Y> extends true ? (
          LessThan10<X> extends true ? (
            LessThan10<Y> extends true ? (
              X extends 0 ? (
                Y extends 0 ? (
                  true
                ) : (
                  false
                )
              ) : (
                Y extends 0 ? (
                  true
                ) : (
                  IsGreaterOrEquals<DecrementN[X], DecrementN[Y]>
                )
              )
            ) : (
              false
            )
          ) : (
            LessThan10<Y> extends true ? (
              true
            ) : (
              IsGreaterOrEquals<Decrement10N[X], Decrement10N[Y]>
            )
          )
        ) : (
          false
        )
      ) : (
        LessThan100<Y> extends true ? (
          true
        ) : (
          IsGreaterOrEquals<Decrement100N[X], Decrement100N[Y]>
        )
      )
    ) : (
      false
    )
  ) : (
    LessThan1000<Y> extends true ? (
      true
    ) : (
      IsGreaterOrEquals<Decrement1000N[X], Decrement1000N[Y]>
    )
  )

export type IsLess<X extends number, Y extends number> =
  IsGreaterOrEquals<X, Y> extends true ? (
    false
  ) : (
    true
  )

export type IsLessOrEquals<X extends number, Y extends number> =
  IsGreater<X, Y> extends true ? (
    false
  ) : (
    true
  )

export type IsRange<X extends number, Min extends number, Max extends number> =
  IsGreater<X, Min> extends true ? (
    IsLess<X, Max>
  ) : (
    false
  )

export function add<X extends number, Y extends number>(x: X, y: Y): Add<X, Y> {
  return x + y as any
}

export function subtract<X extends number, Y extends number>(x: X, y: Y): Subtract<X, Y> {
  return x - y as any
}