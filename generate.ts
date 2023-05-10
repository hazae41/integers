import { writeFileSync } from "fs"

{
  function* gen() {
    for (let x = 0; x < (2 ** 16); x++)
      yield `${x}: ${x + 1}`
  }

  const script = `export type Increment = {
    ${[...gen()].join(`\n`)}
  }`

  writeFileSync("./src/mods/integers/generated/increment.ts", script)
}

{
  function* gen() {
    yield `0: 0`
    for (let x = 1; x < (2 ** 16); x++)
      yield `${x}: ${x - 1}`
  }

  const script = `export type Decrement = {
    ${[...gen()].join(`\n`)}
  }`

  writeFileSync("./src/mods/integers/generated/decrement.ts", script)
}

{
  function* gen() {
    for (let x = 0; x < 10; x++)
      yield `${x}: 0`
    for (let x = 10; x < (2 ** 16); x++)
      yield `${x}: ${x - 9}`
  }

  const script = `export type Decrement10 = {
    ${[...gen()].join(`\n`)}
  }`

  writeFileSync("./src/mods/integers/generated/decrement10.ts", script)
}

{
  function* gen() {
    for (let x = 0; x < (2 ** 16); x++)
      yield `${x}: ${x + 9}`
  }

  const script = `export type Increment10 = {
    ${[...gen()].join(`\n`)}
  }`

  writeFileSync("./src/mods/integers/generated/increment10.ts", script)
}

{
  function* gen() {
    for (let x = 0; x < 100; x++)
      yield `${x}: 0`
    for (let x = 100; x < (2 ** 16); x++)
      yield `${x}: ${x - 99}`
  }

  const script = `export type Decrement100 = {
    ${[...gen()].join(`\n`)}
  }`

  writeFileSync("./src/mods/integers/generated/decrement100.ts", script)
}

{
  function* gen() {
    for (let x = 0; x < (2 ** 16); x++)
      yield `${x}: ${x + 99}`
  }

  const script = `export type Increment100 = {
    ${[...gen()].join(`\n`)}
  }`

  writeFileSync("./src/mods/integers/generated/increment100.ts", script)
}

{
  function* gen() {
    for (let x = 0; x < 1000; x++)
      yield `${x}: 0`
    for (let x = 1000; x < (2 ** 16); x++)
      yield `${x}: ${x - 999}`
  }

  const script = `export type Decrement1000 = {
    ${[...gen()].join(`\n`)}
  }`

  writeFileSync("./src/mods/integers/generated/decrement1000.ts", script)
}

{
  function* gen() {
    for (let x = 0; x < (2 ** 16); x++)
      yield `${x}: ${x + 999}`
  }

  const script = `export type Increment1000 = {
    ${[...gen()].join(`\n`)}
  }`

  writeFileSync("./src/mods/integers/generated/increment1000.ts", script)
}