# AppShell

> Authenticated page frame: header plus a centered main region.

- **Path:** `src/core/ui/components/AppShell/AppShell.tsx`
- **Storybook:** `UI/AppShell`
- **Client component:** no

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | — | Page content inside `<main>`. |
| `signOut` | `ReactNode` | — | Sign-out control rendered in the header. |

## Usage

```tsx
<AppShell signOut={<SignOutButton />}>{children}</AppShell>
```

## Notes

- Nav targets are Now Playing and Trending. There is no sidebar.

---
_Keep in sync with the component — update this file whenever props or behavior change._
