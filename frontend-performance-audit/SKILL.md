---
name: frontend-performance-audit
description: Audit frontend projects for layout shifts, unnecessary re-renders, expensive rendering, and state-management performance issues.
---

# Frontend Layout Shift & Re-render Audit

## Purpose

Audit a frontend project for:

1. Layout shifts and visual instability
2. Unnecessary React re-renders
3. Rendering performance problems
4. Expensive component updates
5. Unstable props, references, selectors, and context values

The goal is to identify real performance problems without blindly recommending memoization.

Prioritize React + TypeScript projects, but apply relevant checks to any frontend codebase.

---

## When to Use This Skill

Use this skill when asked to:

- Find layout shifts
- Investigate CLS issues
- Find unnecessary React re-renders
- Improve React rendering performance
- Audit frontend performance
- Investigate components rendering too often
- Find unstable React props
- Review Zustand, Redux, Context, or state subscriptions
- Investigate UI flickering or jumping
- Find performance regressions
- Review loading states and skeletons

---

# Audit Strategy

Do not modify code immediately.

First inspect the project and produce evidence-based findings.

Follow this order:

1. Understand project structure
2. Identify frontend framework and state-management tools
3. Search for likely layout-shift causes
4. Search for likely re-render causes
5. Trace affected component relationships
6. Rank findings by impact
7. Suggest fixes
8. Only implement changes when explicitly requested

Avoid speculative optimizations.

---

# Part 1 — Layout Shift Audit

Search for code that may cause unexpected movement after initial render.

Pay special attention to:

- Images without explicit dimensions
- Dynamic content injected above existing content
- Loading states with different dimensions from final content
- Fonts changing after page load
- Components conditionally appearing/disappearing
- Skeletons that don't match final content
- Charts changing height after data loads
- Async components
- Lazy-loaded components
- Suspense boundaries
- Accordions
- Modals
- Toasts
- Banners
- Headers
- Navigation
- Tables
- Lists
- Infinite scrolling
- Pagination
- Carousels
- Ads or embedded content
- Dynamic error messages
- Form validation

---

## Images

Look for:

```tsx
<img src={src} />
```

without:

```tsx
width
height
aspect-ratio
```

Also inspect framework-specific image components.

Flag cases where image dimensions are unknown until load.

Prefer:

```css
aspect-ratio
```

or explicit dimensions/reserved containers.

---

## Loading States

Compare loading UI dimensions with loaded UI.

Example risk:

```tsx
return isLoading ? <Spinner /> : <LargeCard />;
```

A small spinner replaced by a large component can cause substantial layout shift.

Prefer reserving approximately the same space:

```tsx
return isLoading ? <CardSkeleton /> : <LargeCard />;
```

Check whether skeleton dimensions actually match the final component.

---

## Conditional Rendering

Search for patterns such as:

```tsx
{data && <Component />}
```

```tsx
{error && <ErrorMessage />}
```

```tsx
{isVisible && <Banner />}
```

Determine whether their appearance changes surrounding layout.

Pay special attention to content inserted above:

- page content
- forms
- tables
- navigation
- charts

---

## Fonts

Inspect:

- `@font-face`
- Google Fonts
- external fonts
- CSS font loading strategies
- Next.js font configuration

Look for possible FOIT/FOUT-related layout changes.

Check fallback font compatibility where relevant.

---

## Charts and Data Visualization

Charts are common layout-shift sources.

Look for:

```tsx
height="100%"
```

inside containers whose height isn't established.

Inspect:

- Recharts
- Chart.js
- ECharts
- Highcharts
- D3
- custom SVG charts

Ensure chart containers have predictable dimensions before data arrives.

---

## CSS Layout Risks

Search for:

- dynamic heights
- `height: auto`
- absolute positioning dependent on runtime measurements
- JS-calculated dimensions
- ResizeObserver-driven layout
- measurement hooks
- `offsetHeight`
- `clientHeight`
- `getBoundingClientRect`
- runtime style changes

These are not automatically problems.

Trace whether measurements happen after initial paint and visibly move content.

---

# Part 2 — React Re-render Audit

Identify components likely to re-render more often than necessary.

Do NOT treat every re-render as a bug.

React rendering is normal.

Flag a problem only when there is evidence that:

- rendering is expensive
- rendering cascades across many components
- state updates are unnecessarily broad
- large lists are affected
- expensive calculations repeat
- unstable references defeat memoization
- the component updates at high frequency

---

# State Placement

Look for state stored higher in the tree than necessary.

Example:

```tsx
function Page() {
  const [search, setSearch] = useState("");

  return (
    <>
      <LargeDashboard />
      <SearchInput value={search} onChange={setSearch} />
    </>
  );
}
```

If `LargeDashboard` does not depend on `search`, investigate whether each keystroke causes unnecessary subtree renders.

Recommend moving state closer to where it is consumed when appropriate.

---

# Unstable Object Props

Search for:

```tsx
<Component options={{ enabled: true }} />
```

```tsx
<Component filters={{ status, date }} />
```

```tsx
<Component items={array.map(...)} />
```

Inline objects and arrays create new references every render.

Do not automatically recommend `useMemo`.

First determine whether reference stability matters.

It matters especially when:

- the child uses `React.memo`
- the value is an effect dependency
- the object feeds an expensive child
- it triggers subscriptions or calculations

---

# Unstable Callback Props

Search for:

```tsx
<Component onClick={() => doSomething(id)} />
```

Again, this is not automatically a performance bug.

Investigate when:

- passed to memoized children
- rendered inside large lists
- causes effects to re-run
- causes expensive children to update

Recommend `useCallback` only where referential stability has measurable value.

---

# React.memo

Search for existing:

```tsx
React.memo
memo(...)
```

Verify whether memoization is actually effective.

Check if memoized components receive unstable:

- objects
- arrays
- functions
- JSX
- context values

Example:

```tsx
const Row = memo(RowComponent);

<Row onClick={() => select(row.id)} />
```

`memo` may provide little benefit if important props change reference every render.

---

# useMemo

Search for:

```tsx
useMemo
```

Look for two problems.

## Missing memoization

Potential expensive calculation:

```tsx
const filtered = largeDataset
  .filter(...)
  .sort(...)
  .map(...);
```

running on every render.

Evaluate dataset size and render frequency before recommending memoization.

## Excessive memoization

Flag unnecessary usage like:

```tsx
const value = useMemo(() => a + b, [a, b]);
```

when calculation cost is trivial and reference stability is irrelevant.

---

# useEffect

Inspect effects carefully.

Look for:

```tsx
useEffect(() => {
  setSomething(...)
}, [...])
```

Potential issues:

- derived state
- render → effect → state update → second render
- unstable dependencies
- effects updating parent/global state
- cascading effect chains

Example:

```tsx
const [fullName, setFullName] = useState("");

useEffect(() => {
  setFullName(`${firstName} ${lastName}`);
}, [firstName, lastName]);
```

Prefer derived render-time values when state is unnecessary.

---

# Context

React Context can cause broad re-render cascades.

Search for:

```tsx
createContext
useContext
```

Inspect provider values:

```tsx
<Context.Provider
  value={{
    user,
    settings,
    updateUser,
  }}
>
```

Inline provider objects change reference whenever the provider renders.

Investigate whether many consumers update unnecessarily.

Possible fixes:

- split contexts
- stabilize provider value
- move fast-changing state elsewhere
- use selector-based state management

Do not recommend these automatically.

Evaluate consumer relationships first.

---

# Zustand

When Zustand is present, inspect selectors.

Prefer narrow subscriptions:

```tsx
const user = useStore(state => state.user);
```

over:

```tsx
const state = useStore();
```

Look for selectors returning new references:

```tsx
const data = useStore(state => ({
  user: state.user,
  settings: state.settings,
}));
```

Depending on library/version/configuration, this may cause unnecessary updates.

Inspect use of:

- `useShallow`
- shallow equality
- selector functions
- whole-store subscriptions

Pay special attention to frequently changing state.

---

# Redux

Inspect:

```tsx
useSelector
```

Look for:

- selecting large state objects
- selectors returning new objects
- duplicated derived calculations
- missing memoized selectors for expensive derived data

Example risk:

```tsx
const data = useSelector(state => ({
  user: state.user,
  theme: state.theme,
}));
```

Consider narrow selectors or memoized selectors where appropriate.

---

# TanStack Query

Inspect whether server-state updates cause unnecessarily broad component updates.

Look for:

- components consuming entire query objects
- expensive transformations performed during every render
- broad query invalidation
- frequently changing polling queries
- selectors / `select`
- query state unnecessarily lifted into global state

Do not duplicate TanStack Query data into local/global state without a clear reason.

---

# Lists

Prioritize components rendering:

```tsx
items.map(...)
```

especially large lists.

Inspect:

- stable keys
- component boundaries
- item-level state
- callback references
- parent state updates
- expensive formatting
- sorting/filtering
- virtualization opportunities

Flag index keys when ordering can change:

```tsx
items.map((item, index) => (
  <Row key={index} />
))
```

This may also produce incorrect component reuse and visual instability.

---

# High-Frequency Updates

Look for:

- mouse move
- scroll
- resize
- drag
- animations
- timers
- WebSocket events
- input changes
- live search
- realtime financial data

Search for:

```tsx
setInterval
setTimeout
mousemove
scroll
resize
WebSocket
requestAnimationFrame
onChange
onMouseMove
```

Trace whether these updates trigger large React subtrees.

---

# Expensive Render Work

Search component bodies for:

- `.sort()`
- `.filter()`
- `.map()`
- `.reduce()`
- JSON transformations
- date formatting
- currency formatting
- recursive operations
- large object transformations
- regex-heavy processing

Determine whether these execute repeatedly.

Look especially inside frequently rendered components.

---

# Component Architecture

Look for oversized components managing unrelated responsibilities.

A large component may re-render many unrelated UI sections because a small piece of local state changes.

Consider splitting components where this creates meaningful render boundaries.

Do not split components solely to reduce line count.

---

# Investigation Commands

Use project search extensively.

Search terms should include:

```text
useState
useEffect
useMemo
useCallback
memo(
React.memo
useContext
createContext
useSelector
useStore
useShallow
setInterval
setTimeout
requestAnimationFrame
ResizeObserver
getBoundingClientRect
offsetHeight
clientHeight
<img
Image
Skeleton
Suspense
lazy(
.map(
.filter(
.sort(
```

Also inspect:

```text
package.json
vite.config
next.config
tsconfig
```

to understand framework and dependencies.

---

# Prioritization

Classify findings as:

## HIGH

Likely visible or measurable user impact.

Examples:

- large page subtree re-rendering on every keystroke
- high-frequency WebSocket update rendering an entire dashboard
- chart height changing after data load
- hero image without reserved dimensions
- large list re-rendering every few milliseconds
- context update rerendering most of the application

## MEDIUM

Performance issue likely noticeable under realistic load.

Examples:

- large derived calculations repeated unnecessarily
- unstable selectors
- ineffective memoization
- loading states that slightly change dimensions

## LOW

Minor optimization or maintainability improvement.

Examples:

- small unnecessary renders
- trivial recalculations
- minor reference instability

Do not classify stylistic preferences as performance problems.

---

# Required Output

Return findings in this format:

## Performance Audit

### Summary

- Files analyzed:
- Layout-shift findings:
- Re-render findings:
- High priority:
- Medium priority:
- Low priority:

---

### 🔴 HIGH — Finding title

**File**

`src/path/Component.tsx:42`

**Problem**

Explain exactly what happens.

**Why it matters**

Describe the runtime consequence.

**Evidence**

Show the relevant code.

**Suggested fix**

Explain the smallest reasonable change.

Example:

```tsx
const value = ...
```

**Expected impact**

Explain which renders/layout movements should disappear or decrease.

---

### 🟡 MEDIUM — Finding title

Use the same structure.

---

### 🟢 LOW — Finding title

Use the same structure.

---

# Re-render Chains

When possible, show render propagation.

Example:

```text
SearchInput
   ↓ setSearch()
DashboardPage
   ↓
PortfolioSection
   ↓
PositionsTable
   ↓
150 × PositionRow
```

Explain which state update initiates the chain.

---

# Layout Shift Chains

When possible, show how visual instability happens.

Example:

```text
Initial render
↓
Chart container height = 0
↓
API response arrives
↓
Chart renders at 340px
↓
Everything below moves down
```

---

# Recommended Fix Principles

Prefer, in order:

1. Move state closer to the consumer
2. Narrow subscriptions
3. Derive values instead of synchronizing state through effects
4. Stabilize component architecture
5. Reserve layout space
6. Avoid unnecessary global/context updates
7. Memoize expensive calculations when justified
8. Stabilize references when reference equality matters
9. Use React.memo when render cost justifies it
10. Consider virtualization for genuinely large lists

Do not begin with:

```tsx
useMemo
useCallback
React.memo
```

as universal solutions.

Architecture and state boundaries usually matter more.

---

# False Positives to Avoid

Do not report:

```tsx
() => ...
```

as a problem merely because a function is recreated.

Do not report:

```tsx
{}
[]
```

as a problem merely because references are recreated.

Do not recommend `React.memo` for every component.

Do not recommend `useMemo` for trivial calculations.

Do not treat normal React rendering as a performance defect.

Do not claim CLS without explaining what physically moves.

Every finding should answer:

> What causes the render or movement?

and

> Why does it matter in this component?

---

# Optional Deep Audit

When explicitly requested to perform a deep audit:

Trace the most important state transitions from source to leaf components.

For each important update determine:

```text
State source
↓
Component receiving update
↓
Children affected
↓
Expensive work triggered
↓
DOM/layout consequence
```

Focus particularly on:

- application root
- route layouts
- dashboards
- forms
- large lists
- tables
- charts
- frequently updating data
- global stores
- providers

---

# Final Recommendation

After the audit, provide:

### Top 5 fixes

List the five changes with the highest expected impact.

For each include:

- file
- issue
- proposed change
- expected benefit
- implementation risk

Do not rank issues based on theoretical React best practices.

Rank them based on likely runtime impact in this specific project.