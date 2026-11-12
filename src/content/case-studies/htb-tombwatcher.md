---
title: "HTB TombWatcher: Deleted Objects and Certificate Trust"
description: "A defensive case study on inherited directory permissions, restored accounts, and unsafe AD CS certificate templates."
date: "2026-11-12"
category: "Hack The Box"
difficulty: "Medium"
tags: ["Active Directory", "AD CS", "Windows"]
published: true
---

## Findings and impact

TombWatcher combined several delegated directory permissions with a certificate services misconfiguration. Starting with a supplied standard account, the assessment found that loosely scoped group and identity permissions exposed a managed service identity. Further directory review revealed an organizational unit with inherited control over certificate-related accounts.

The deleted-object inventory mattered because restoring a former certificate administrator returned it to the scope of those inherited permissions. The certificate authority also exposed an unsafe enrollment configuration classified as ESC15. The combined exposure affected both certificate issuance and privileged domain authentication.

## Remediation

- Restrict managed service account password retrieval and audit the effective membership of groups with that permission.
- Review ownership, inherited access, and delegated account restoration rights on privileged organizational units. Include restored objects in permission reviews and alert on unexpected restorations.
- Patch enterprise certificate authorities and review template eligibility, enrollment permissions, application policies, and certificate identity mappings.
- Monitor certificate enrollment and authentication alongside directory changes. Investigate unexpected certificate requests involving privileged identities.

## Takeaways

An inventory limited to enabled accounts misses the security impact of restored objects. Treat account restoration as a privileged operation and include certificate services in the same review.
