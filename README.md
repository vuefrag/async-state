<p align="center">
  <img src="https://raw.githubusercontent.com/vuefrag/async-state/main/banner.svg" alt="@vuefrag/async-state" width="100%" />
</p>

<h1 align="center">@vuefrag/async-state</h1>

<p align="center">A Vue 3 composition API utility for managing async operations reactively, providing state, isLoading, isReady, and error refs with execute and refresh methods.</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@vuefrag/async-state"><img src="https://img.shields.io/npm/v/@vuefrag/async-state.svg" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/@vuefrag/async-state"><img src="https://img.shields.io/npm/dm/@vuefrag/async-state.svg" alt="npm downloads" /></a>
</p>

## Installation

```bash
npm install @vuefrag/async-state
```

## Usage

```ts
import { useAsyncState } from '@vuefrag/async-state'

const fetchData = async () => {
  await new Promise(resolve => setTimeout(resolve, 100))
  return { message: 'Hello from async!' }
}

const { state, isReady, isLoading } = useAsyncState(
  fetchData(),
  { message: 'Loading...' }
)

console.log(state.value.message) // 'Loading...'
console.log(isLoading.value) // true

setTimeout(() => {
  console.log(state.value.message) // 'Hello from async!'
  console.log(isReady.value) // true
}, 200)
```

## License

MIT

Extracted from [VueUse](https://vueuse.org/) for standalone use.
