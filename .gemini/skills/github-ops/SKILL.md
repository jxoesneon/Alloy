---
name: github-ops
description: GitHub repository operations, automation, and management using GitHub MCP tools. Issue triage, PR management, CI/CD operations, release management, and security monitoring. Use when the user wants to manage GitHub issues, PRs, releases, or any GitHub operational task.
origin: ECC
---

# GitHub Operations (MCP)

Manage GitHub repositories with a focus on community health, CI reliability, and contributor experience using structured MCP tools.

## When to Activate

- Triaging issues (classifying, labeling, responding, deduplicating)
- Managing PRs (review status, CI checks, stale PRs, merge readiness)
- Debugging CI/CD failures
- Preparing releases and changelogs
- Monitoring security alerts
- Managing contributor experience on open-source projects
- User says "check GitHub", "triage issues", "review PRs", "merge", "release"

## Tool Requirements

- **GitHub MCP Server** tools (e.g., `mcp_github_list_issues`, `mcp_github_create_issue`, `mcp_github_get_pull_request`, etc.)
- Configured repository owner and name in context.

## Issue Triage

Classify each issue by type and priority:

**Types:** bug, feature-request, question, documentation, enhancement, duplicate, invalid, good-first-issue

**Priority:** critical (breaking/security), high (significant impact), medium (nice to have), low (cosmetic)

### Triage Workflow

1. Read the issue via `mcp_github_get_issue`
2. Check if it duplicates an existing issue using `mcp_github_search_issues`
3. Apply appropriate labels via `mcp_github_update_issue` (passing `labels` array)
4. For questions: draft and post a response via `mcp_github_add_issue_comment`
5. For bugs needing more info: ask for reproduction steps via comment
6. For good first issues: add `good-first-issue` label
7. For duplicates: comment with link to original, add `duplicate` label

## PR Management

### Review Checklist

1. Check CI status: `mcp_github_get_pull_request_status`
2. Check if mergeable: `mcp_github_get_pull_request`
3. Check age and last activity
4. Flag PRs >5 days with no review
5. For community PRs: ensure they have tests and follow conventions

### Stale Policy

- Issues with no activity in 14+ days: add `stale` label, comment asking for update
- PRs with no activity in 7+ days: comment asking if still active
- Auto-close stale issues after 30 days with no response (add `closed-stale` label)

## CI/CD Operations

When CI fails:

1. Identify the failing step by checking the PR status.
2. Identify the root cause and suggest a fix.
3. For flaky tests: note the pattern for future investigation.

## Release Management

When preparing a release:

1. Check all CI is green on main.
2. Review unreleased changes by listing merged PRs.
3. Generate changelog from PR titles.
4. Create release via `gh` CLI (if MCP tool not available for releases) or manual step.

## Security Monitoring

- Review and auto-merge safe dependency bumps.
- Flag any critical/high severity alerts immediately.
- Check for new Dependabot alerts weekly at minimum.

## Quality Gate

- all issues triaged have appropriate labels
- no PRs older than 7 days without a review or comment
- CI failures have been investigated
- releases include accurate changelogs
- security alerts are acknowledged and tracked
