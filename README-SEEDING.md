# Database Seeding Guide

## Quick Start
```bash
npm run seed
```

## Individual Seeds
```bash
npm run seed:workflows  # 15 n8n workflows
npm run seed:repos      # 15 GitHub repos
npm run seed:mcps       # 15 MCPs
npm run seed:apps       # Update apps schema + add paid apps
```

## Clear & Reseed
```bash
npm run seed:clear
```
This will remove all existing workflows, repos, and MCPs, then reseed with fresh data.

## Via API (Production)
```bash
POST /api/admin/seed?type=all
Header: Authorization: Bearer YOUR_ADMIN_SECRET
```

### API Parameters
- `type`: workflows | repos | mcps | apps | all
- `clear`: true | false (optional, clears data before seeding)

### Example
```bash
curl -X POST "https://your-domain.com/api/admin/seed?type=all&clear=true" \
  -H "Authorization: Bearer YOUR_ADMIN_SECRET"
```

## Data Structure

### Workflows
- **Count**: 15 n8n automation workflows
- **Difficulty**: 5 Beginner, 5 Intermediate, 5 Advanced
- **Categories**: Automation, Data Processing, Integration, Monitoring, Productivity
- **Fields**: name, slug, description, author, thumbnailUrl, workflowUrl, category, tags, difficulty, useCases, rating, downloadsCount

### Repos
- **Count**: 15 GitHub repositories
- **Languages**: Swift, TypeScript, Python, JavaScript, Go, Shell
- **Fields**: name, slug, description, author, githubUrl, stars (100-15000), forks, language, topics, isArchived, lastUpdated

### MCPs
- **Count**: 15 Model Context Protocol tools
- **Providers**: Anthropic, OpenAI, Community, Independent Developers
- **Categories**: Productivity, Development, Content, Data, Integration
- **Fields**: name, slug, description, provider, mcpUrl, iconUrl, platform, category, integrations, rating, installsCount

### Apps
- **Updates**: Adds isPaid, pricingModel, tags fields to existing apps
- **New Apps**: 10 paid/premium apps (4 One-Time, 4 Subscription, 2 Freemium)
- **Tags**: Editor Pick, New, Innovative

## Environment Variables
Set `ADMIN_SECRET` in `.env` for API authentication:
```
ADMIN_SECRET=your_secure_random_string
```

## Troubleshooting

### Permission Denied
Make sure you have the correct `ADMIN_SECRET` set in your environment variables.

### Database Locked
If you get database locked errors, make sure no other processes are accessing the database.

### Import Errors
Ensure all dependencies are installed:
```bash
npm install
```

## Data Characteristics
All seed data includes:
- ✅ Realistic names and descriptions (no Lorem ipsum)
- ✅ Professional content relevant to each category
- ✅ Varied ratings (3.5-5.0)
- ✅ Realistic counts (downloads, stars, installs)
- ✅ Recent dates (last 6 months)
- ✅ Proper JSON formatting for array fields
