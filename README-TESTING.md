# Testing Checklist

## Manual Tests

### Filtering & Search
- [ ] Search functionality works across all sections (apps, workflows, repos, MCPs)
- [ ] Category filtering returns correct results
- [ ] Platform filtering (iOS, macOS, Cross-platform) works
- [ ] Pricing filter (All, Free, Paid) displays correct apps
- [ ] Tag filtering (New, Innovative, Editor Pick) shows tagged items
- [ ] Difficulty filter works for workflows (Beginner, Intermediate, Advanced)
- [ ] Language filter works for repos
- [ ] Provider filter works for MCPs
- [ ] Hide Archived toggle works for repos

### Sorting
- [ ] Newest sort shows most recent items first
- [ ] Popular sort (by downloads/stars/installs) works correctly
- [ ] Highest Rated sort displays items by rating
- [ ] Most Forks sort works for repos

### Navigation
- [ ] All navigation links work (Apps, Workflows, Repos, MCPs)
- [ ] Apps dropdown menu works (All, Free, Paid, New & Innovative)
- [ ] Breadcrumbs work on detail pages
- [ ] Back button works on detail pages
- [ ] Related items section links work

### Detail Pages
- [ ] App detail pages load with all information
- [ ] Workflow detail pages show difficulty, use cases, download link
- [ ] Repo detail pages display stars, forks, language, clone command
- [ ] MCP detail pages show integrations, install instructions
- [ ] Copy buttons work (clone commands, MCP URLs)
- [ ] External links open correctly (GitHub, download URLs)
- [ ] Related items section displays relevant content

### Bookmarks (if implemented)
- [ ] Bookmark button toggles correctly
- [ ] Bookmarks persist across sessions
- [ ] Bookmarks page shows all saved items
- [ ] Remove bookmark functionality works

### UI/UX
- [ ] Dark mode toggle works
- [ ] Theme persists across page navigations
- [ ] Loading states display (skeletons)
- [ ] Empty states show when no results
- [ ] Error messages are user-friendly
- [ ] Toast notifications appear for actions

### Mobile Responsive
- [ ] Test on 375px width (iPhone SE)
- [ ] Test on 768px width (iPad)
- [ ] Test on 1024px width (iPad Pro)
- [ ] Touch targets are at least 44x44px
- [ ] Mobile navigation (hamburger menu) works
- [ ] Grid layouts adapt correctly (1/2/3/4 columns)
- [ ] Images load and scale properly
- [ ] Horizontal scrolling is minimal

### Performance
- [ ] Lighthouse Performance score > 90
- [ ] Lighthouse Accessibility score > 90
- [ ] Lighthouse Best Practices score > 90
- [ ] Lighthouse SEO score > 90
- [ ] Images lazy load
- [ ] Database queries complete < 100ms
- [ ] Page transitions are smooth
- [ ] No console errors in browser

### SEO
- [ ] Sitemap accessible at /sitemap.xml
- [ ] Robots.txt accessible at /robots.txt
- [ ] Meta tags present on all pages (check view source)
- [ ] Open Graph tags render correctly (test with https://www.opengraph.xyz/)
- [ ] Twitter Card tags present
- [ ] Canonical URLs set correctly
- [ ] Structured data (JSON-LD) is valid

### Database Seeding
- [ ] `npm run seed` executes without errors
- [ ] `npm run seed:workflows` creates 15 workflows
- [ ] `npm run seed:repos` creates 15 repos
- [ ] `npm run seed:mcps` creates 15 MCPs
- [ ] `npm run seed:apps` updates apps and adds 10 paid apps
- [ ] `npm run seed:clear` removes and reseeds data
- [ ] API endpoint `/api/admin/seed` requires authentication
- [ ] API endpoint returns correct counts and status

### Error Handling
- [ ] 404 page displays for non-existent items
- [ ] Error boundaries catch component errors
- [ ] Network failures show appropriate error messages
- [ ] Database connection errors are handled gracefully
- [ ] Form validation provides clear feedback

## Automated Testing (Future)

### Unit Tests
- [ ] Utility functions (formatting, truncation)
- [ ] Component rendering
- [ ] Query functions return correct data

### Integration Tests
- [ ] API routes return expected responses
- [ ] Database queries work with filters
- [ ] Authentication flows (if applicable)

### E2E Tests (Playwright)
- [ ] Complete user flows
- [ ] Form submissions
- [ ] Navigation paths
- [ ] Mobile interactions

## Browser Compatibility
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## Accessibility (WCAG 2.1 AA)
- [ ] Keyboard navigation works throughout site
- [ ] Focus indicators visible
- [ ] Color contrast ratios meet AA standards
- [ ] Alt text on images
- [ ] ARIA labels on interactive elements
- [ ] Screen reader testing (NVDA/VoiceOver)
- [ ] Form labels properly associated
- [ ] Error messages are accessible

## Reporting Issues
When reporting bugs, include:
- Browser and version
- Steps to reproduce
- Expected vs. actual behavior
- Screenshots/videos
- Console errors (if any)
- Network tab info (for API issues)
