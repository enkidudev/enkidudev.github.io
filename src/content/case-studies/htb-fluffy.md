---
title: "HTB Fluffy: Service Accounts and Certificate Mapping"
description: "A defensive case study on Windows client exposure, delegated service accounts, and weak certificate identity mapping."
date: "2026-11-12"
category: "Hack The Box"
difficulty: "Easy"
tags: ["Active Directory", "AD CS", "Windows"]
published: true
---

## Findings and impact

Fluffy illustrates how a workstation-side authentication issue can become a domain-wide identity problem. The lab began with a supplied low-privilege account and a writable shared folder. Windows Explorer’s handling of file metadata created an unexpected outbound authentication exposure. The authentication material was recoverable because the affected credential was weak.

Directory review revealed excessive control over a service-account management group and the accounts it managed. That delegation crossed two trust boundaries. A workstation issue now affected service identities, and those identities had access to an enterprise certificate authority. A certificate authority configuration classified as ESC16 removed an important identity binding. The assessment validated authentication as a privileged identity.

## Remediation

- Patch affected Windows clients for CVE-2025-24071. Restrict outbound SMB to approved destinations and monitor unusual outbound authentication.
- Review who can modify service-account groups and identity attributes. Limit those permissions to dedicated administrative roles and monitor unexpected changes.
- Enforce strong certificate mappings and verify that issued authentication certificates carry the required identity binding. Audit enrollment and revoke certificates issued under unsafe configurations.
- Use managed service accounts or strong, unique service credentials where supported.

## Takeaways

Review file-sharing permissions, directory delegation, and certificate enrollment together. Each can look manageable in isolation while the combined exposure crosses from a workstation to privileged domain authentication.
