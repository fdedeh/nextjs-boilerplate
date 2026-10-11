# SignInForm

> Username and password fields. The screen decides what the submit handler does.

- **Path:** `src/auth/presentation/SignInForm/SignInForm.tsx`
- **Storybook:** `UI/SignInForm`
- **Client component:** yes

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `onSubmit` | `(values) => void` | — | Called with username and password. |
| `error` | `string \| null` | — | Inline alert. |
| `isSubmitting` | `boolean` | `false` | Disables the button and changes its label. |

## Usage

```tsx
<SignInForm onSubmit={onSubmit} error={error} />
```

## Notes

- Credential mistakes stay inline. They are not toasts.
- Inputs point at the alert with `aria-describedby`.

---
_Keep in sync with the component — update this file whenever props or behavior change._
