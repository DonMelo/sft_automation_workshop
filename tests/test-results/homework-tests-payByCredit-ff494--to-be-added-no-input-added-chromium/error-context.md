# Page snapshot

```yaml
- text: Welcome agileway |
- link "Sign off (agileway)":
  - /url: /logout
- heading [level=1]
- heading "Passenger Details" [level=2]
- paragraph:
  - strong: Flights
  - text: (oneway trip)
- text: 2025-07-30 New York to Sydney
- paragraph:
  - strong: Passenger details
- table:
  - rowgroup:
    - 'row "First name: Test"':
      - cell "First name:"
      - cell "Test":
        - textbox: Test
    - row "Last name:":
      - cell "Last name:"
      - cell:
        - textbox
- button "Next"
```