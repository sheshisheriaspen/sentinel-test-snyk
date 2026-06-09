# Sentinel Integration Test Repository — Snyk

**⚠️ This repository is intentionally vulnerable for testing.**

This repository contains deliberately outdated npm packages with known CVEs for testing Sentinel's **Snyk scanner integration**. It is NOT a real application and should NEVER be used in production.

## Purpose

- Test positive cases: Real vulnerabilities that Sentinel should detect and remediate
- Test negative cases: False positives or already-fixed vulnerabilities that Sentinel should correctly identify
- Validate LLM reasoning: Verify Sentinel's code analyzer generates correct fix recommendations
- Integration testing: Verify end-to-end workflow (detect → plan → code → git → PR)

## Intentionally Vulnerable Packages

| Package | Version | Known CVE | Issue | Test Purpose |
|---|---|---|---|---|
| `express` | 4.17.1 | CVE-2022-24999 | Denial of Service via regex | POSITIVE: Detects real vuln |
| `lodash` | 4.17.19 | CVE-2021-23337 | Prototype pollution | POSITIVE: Detects real vuln |
| `moment` | 2.29.0 | Deprecated library | Library no longer maintained | POSITIVE: Detects deprecated deps |
| `request` | 2.88.0 | Multiple CVEs | Deprecated module | POSITIVE: Detects abandoned package |

## Test Scenarios

### Scenario 1: Positive Case (Real Vulnerability)
```bash
# Snyk scans package.json and finds CVE-2022-24999
# Expected: Sentinel detects, generates upgrade plan, creates PR
```

### Scenario 2: Negative Case (Already Fixed)
```bash
# package-fixed.json has upgraded versions
# Expected: Sentinel scans, finds no issues, reports clean status
```

## Files

```
├── package.json              # Vulnerable: express 4.17.1, lodash 4.17.19
├── package-fixed.json        # Fixed versions for testing "already remediated" scenario
├── index.js                  # Simple Express app (intentionally vulnerable)
├── index-secure.js           # Secure version using parameterized inputs
└── README.md                 # This file
```

## How to Use This Repo

**For Sentinel Integration Testing:**

```bash
# Clone or reference this repo in integration tests
# Tests will:
# 1. Read fixture from mocks/snyk_findings.json (positive case)
# 2. Read fixture from mocks/snyk_findings_already_fixed.json (negative case)
# 3. Create branches like fix/snyk-vuln-001
# 4. Generate code changes using LLM
# 5. Open PR against this repo for validation
```

**For Manual Testing:**

```bash
# Run Snyk manually against this repo
snyk test

# Expected: Multiple vulnerabilities reported
```

## Security Notes

- ✅ This is a **test-only** repository, separate from production code
- ✅ Packages are intentionally outdated for testing purposes only
- ✅ The app does NOT listen on any port unless explicitly run
- ❌ DO NOT use these versions in any real application
- ❌ DO NOT deploy code from this repository to production

## Repository Lifecycle

This repo is created and maintained specifically for Sentinel integration testing. It is:
- ✅ Public (for testing, no sensitive data)
- ✅ Read-only (tests fork it, never push directly)
- ✅ Immutable (packages stay old, intentionally)

See also: [Sentinel Integration Testing Guide](../../docs/integration-testing.md)
