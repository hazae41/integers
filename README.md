# Integers

Statically typed integer arithmetic (experimental)

```tsx
type X = Add<32_000, 32_123> // 64_123

type Y = Subtract<X, 64_000> // 123

type P = IsGreater<1_001, 1_000> // true
```

```tsx
const x: 64_123 = add(32_000, 32_123)

const y: 123 = subtract(x, 64_000)

const p: true = greater(1_001, 1_000)
```

## Summary

It can type check numbers fast, up to 2**16 (=65_536), but the compiler will sometimes yell at you, especially when both the left-hand and right-hand sides are generic

## Benefits and drawbacks
- Fast type checking
- Add and subtract big numbers up to 2**16 (= 65_536) (it can be increased but bundling will be slower)
- Boolean inequalities
- Slow bundling (~10 seconds)
- The compiler will sometimes yell at you

## Inequalities

Several ways to attempt inequalities type checking, unfortunately none of them are ready for production

### Nevering

- Fast type checking
- You need to have the left-hand side type to compare
- The compiler will sometimes yell at you

```tsx
export type Greater<X extends number, Y extends number> =
  IsGreater<X, Y> extends true ? X : never

export type Less<X extends number, Y extends number> =
  IsLess<X, Y> extends true ? X : never

export type GreaterOrEquals<X extends number, Y extends number> =
  IsGreaterOrEquals<X, Y> extends true ? X : never

export type LessOrEquals<X extends number, Y extends number> =
  IsLessOrEquals<X, Y> extends true ? X : never

function increment<X extends number>(x: GreaterOrEquals<X, 100>) {
  return add(x, 1)
}

increment(150) // 151
```

### Remapping

- Elegant, you can just use `Greater<100>` to only accept numbers `>100`
- Painfully slowwwwwwww type checking even on expensive computer

```tsx
export type Greater<T extends number> = Exclude<keyof { [P in keyof Increment as IsGreater<P, T> extends true ? P : never]: never }, string | symbol>

export type GreaterOrEquals<T extends number> = Exclude<keyof { [P in keyof Increment as IsGreaterOrEquals<P, T> extends true ? P : never]: never }, string | symbol>

export type Less<T extends number> = Exclude<keyof { [P in keyof Increment as IsLess<P, T> extends true ? P : never]: never }, string | symbol>

export type LessOrEquals<T extends number> = Exclude<keyof { [P in keyof Increment as IsLessOrEquals<P, T> extends true ? P : never]: never }, string | symbol>

export type Range<Min extends number, Max extends number> = Exclude<keyof { [P in keyof Increment as IsRange<P, Min, Max> extends true ? P : never]: never }, string | symbol>

function increment<X extends number>(x: X & Greater<100>) {
  return add(x, 1)
}

const x = increment(150) // Greater<101>
```

### Opaque type guarding

- This is annoying to use
- This doesn't solve anything 
- You still have to do runtime if-else branching

```tsx
export type Greater<T extends number> = number & { __greater: T }

export type Less<T extends number> = number & { __less: T }

export type Range<Min extends number, Max extends number> = Greater<Min> & Less<Max>

export function greater<Y extends number>(x: number, y: Y): x is Greater<Y> {
  return x > y as any
}

export function less<Y extends number>(x: number, y: Y): x is Less<Y> {
  return x < y as any
}

export function greaterOrEquals<Y extends number>(x: number, y: Y): x is GreaterOrEquals<Y> {
  return x >= y as any
}

export function lessOrEquals<Y extends number>(x: number, y: Y): x is LessOrEquals<Y> {
  return x <= y as any
}

function increment(x: Greater<100>) {
  return add(x, 1)
}

const x = 150

if (greater(x, 100))
  increment(x) // number
```