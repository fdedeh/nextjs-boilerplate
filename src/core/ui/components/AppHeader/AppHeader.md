# AppHeader

> Sticky header with the wordmark, primary nav, theme toggle, and sign out.

- **Path:** `src/core/ui/components/AppHeader/AppHeader.tsx`
- **Storybook:** `UI/AppHeader`
- **Client component:** yes

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `appName` | `string` | `"Movies"` | Wordmark. |
| `navItems` | `{ href, label }[]` | — | Primary links. |
| `signOut` | `ReactNode` | — | Replaces the default sign-out button. |
| `onSignOut` | `() => void` | — | Used when `signOut` is omitted. |

## Usage

```tsx
<AppHeader navItems={[{ href: "/now-playing", label: "Now Playing" }]} onSignOut={signOut} />
```

## Notes

- On small screens the nav wraps onto a second row. There is no hamburger menu.
- The current path gets `aria-current="page"`.

---
_Keep in sync with the component — update this file whenever props or behavior change._
