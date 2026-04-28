# FerroUI Accessibility Conformance Report (VPAT 2.5)

**Name of Product:** FerroUI  
**Version:** 1.0  
**Report Date:** April 28, 2026

## WCAG 2.2 Report

| Criteria                 | Conformance Level | Remarks/Explanations                                             |
| ------------------------ | ----------------- | ---------------------------------------------------------------- |
| 1.1.1 Non-text Content   | Supports          | All icons have aria-label or are hidden (Verified in `atoms.ts`) |
| 1.4.3 Contrast (Minimum) | Supports          | Verified via `accessibility.spec.ts`                             |
| 2.1.1 Keyboard           | Supports          | Full tab-index coverage in registry components                   |
| 2.4.7 Focus Visible      | Supports          | Enforced in global theme CSS                                     |
| 4.1.2 Name, Role, Value  | Supports          | Zod schemas enforce ARIA attributes in props                     |

## Section 508 Report

FerroUI supports the creation of Section 508 compliant applications through its atomic component library and strict prop validation.
