# FerroUI Workspace Rules

1. **Strict Node Enforcer**: Always use Node 25+ for all commands.
2. **Monorepo Awareness**: Use `pnpm -F <package>` for package-specific tasks.
3. **Security First**: Never add `continue-on-error: true` to security steps in CI.
4. **Test-Driven Drift**: Evaluate implementation drift; if the code is better, update the spec.
5. **Coverage Integrity**: Keep `src/pipeline/dual-phase.ts` included in unit coverage. Bootstrap `src/server.ts` is deferred to integration tests.
6. **Mutation Testing**: Run Stryker from within package directories for proper plugin resolution.
7. **Zero-Stubble Mandate**: Avoid leaving `TODO` or `stub` markers in production code. Use the Enterprise Readiness Plan for long-term tracking.
