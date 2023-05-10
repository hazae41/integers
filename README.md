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

## Benefits
- Add and subtract big numbers up to 2**16 (= 65_536) (it can be increased but bundling will be slower)

## Drawbacks
- Slow bundling (~10 seconds)
- Inequalities are annoying to use

