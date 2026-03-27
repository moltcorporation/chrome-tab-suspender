# Chrome Web Store Assets Guide

This document outlines all the visual assets required for the Chrome Web Store listing.

## Extension Icons

Already included in `extension/assets/`:
- `icon-16.png` (16x16 pixels) - Taskbar icon
- `icon-48.png` (48x48 pixels) - Management page icon
- `icon-128.png` (128x128 pixels) - Chrome Web Store logo

**Icon Design Guidance:**
- Color scheme: Cool blues and teals (representing memory/efficiency)
- Symbol: Tab or memory chip icon
- Ensure clarity at small sizes (especially 16x16)
- Include white padding/buffer around the icon
- Avoid thin lines that become invisible at 16x16

## Store Screenshots

### Screenshot 1: Main Popup (1280x800)
Shows the extension popup interface with:
- Active tab count (e.g., "18 active tabs")
- Suspended tab count (e.g., "7 suspended tabs")
- "Suspend Now" button
- "Whitelist this domain" toggle
- Settings gear icon

**Design guidance:**
- Use Tab Suspender UI colors (blues/teals)
- Show real data to demonstrate functionality
- Include subtle callouts pointing to key features
- Browser chrome visible in background

### Screenshot 2: Settings Page (1280x800)
Shows the settings/options page with:
- Timeout selector (5, 15, 30, 60 minutes)
- "Manage Whitelists" section
- "Enable Cloud Backup" toggle (Pro feature)
- "About" section with version and privacy link

**Design guidance:**
- Professional, clean interface
- Clear section headers
- Visual hierarchy showing Pro features differently
- Settings organized logically

### Screenshot 3: Suspended Tab (1280x800)
Shows a suspended tab in the browser with:
- Suspended tab indicator (grayed out)
- Favicon still visible
- Page title readable
- "Click to restore" button/text
- RAM savings indicator

**Design guidance:**
- Show contrast between active and suspended tabs
- Highlight the restoration interaction
- Demonstrate visual difference clearly
- Include browser address bar context

## Promotional Tile

### Dimensions: 440x280 pixels

**Purpose:** Featured listing image on Chrome Web Store

**Content to include:**
- Tab Suspender logo/wordmark
- Main benefit headline: "Free Up RAM"
- Secondary text: "Suspend inactive tabs"
- Visual element showing tabs/memory concept
- Professional, clean design

**Design guidance:**
- Bold, readable typography
- Clear visual hierarchy
- Brand colors (blues/teals)
- High contrast for visibility
- Avoid too much text

## Creating These Assets

### Option 1: Manual Design
Use design tools like:
- Figma (free tier available)
- Photoshop or Affinity Photo
- GIMP (free, open source)

### Option 2: AI Image Generation
Use tools like:
- DALL-E, Midjourney, or Stable Diffusion
- Prompt example: "Tab Suspender extension icon: minimalist blue/teal tab shape representing memory management and efficiency"

### Option 3: Designer Hire
Post design tasks to freelance platforms for professional assets.

## File Locations

Once created, place assets as follows:

```
extension/
  assets/
    icon-16.png       (already exists)
    icon-48.png       (already exists)
    icon-128.png      (already exists)
  cws-assets/
    screenshot-1.png  (popup)
    screenshot-2.png  (settings)
    screenshot-3.png  (suspended tab)
    promo-tile.png    (440x280)
```

## Checklist

- [ ] Icons properly sized and scaled for clarity
- [ ] Icons match brand identity and product purpose
- [ ] Screenshots accurately represent current UI
- [ ] Screenshots include helpful callouts/labels if needed
- [ ] Promo tile has strong visual hierarchy
- [ ] All images are in PNG format with transparency where appropriate
- [ ] All images are properly optimized (file size < 5MB each)
- [ ] Screenshots show real data/content, not placeholder text

## Notes

- CWS requires PNG format for most assets
- Screenshots should be at exact dimensions (1280x800)
- Icon files must match manifest.json references
- Promo tile dimensions are exactly 440x280px
- All assets should reflect the current extension UI accurately
