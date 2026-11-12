---
title: "HTB Fluffy: Service Accounts and Certificate Mapping"
description: "A defensive case study on Windows client exposure, delegated service accounts, and weak certificate identity mapping."
date: "2026-11-12"
category: "Hack The Box"
difficulty: "Easy"
tags: ["Active Directory", "AD CS", "Windows"]
published: true
---

## Scope and starting conditions

The lab supplied a standard domain account. The review began with reachable services, SMB share permissions, and the contents of an IT share. An upgrade notice was the strongest lead in that share. It linked a generic writable-folder finding to an endpoint patching gap and gave the assessment a specific issue to validate.

## Findings and impact

Fluffy illustrates how a workstation-side authentication issue can become a domain-wide identity problem. The lab began with a supplied low-privilege account and a writable shared folder. Windows Explorer’s handling of file metadata created an unexpected outbound authentication exposure. The authentication material was recoverable because the affected credential was weak.

Directory review revealed excessive control over a service-account management group and the accounts it managed. That delegation crossed two trust boundaries. A workstation issue now affected service identities, and those identities had access to an enterprise certificate authority. A certificate authority configuration classified as ESC16 removed an important identity binding. The assessment validated authentication as a privileged identity.

## Evidence and findings

| Observation | Why it mattered | Control to review |
| --- | --- | --- |
| An IT share allowed writes by the starting identity | Content placed in a shared workspace could affect other users who accessed it. | Limit write access by role and review how workstations handle files on shared storage. |
| Explorer metadata handling caused unexpected outbound authentication | The client crossed a network trust boundary while processing content from the share. | Apply the relevant Windows update, constrain outbound SMB, and monitor unexpected destinations. |
| A service-account management group had excessive effective permissions | The group created a path from a standard identity into service-account administration. | Review group owners, delegated membership rights, and writes to service-account objects. |
| Authentication key attributes on service accounts were writable | Directory permissions affected how those identities could authenticate. | Protect and monitor changes to `msDS-KeyCredentialLink`. |
| The CA omitted a strong identity binding | Certificate issuance and account identity changes combined to expose privileged authentication. | Review SID security extensions, certificate mappings, enrollment policies, and UPN permissions. |

## Troubleshooting and evidence quality

The draft records network reachability failures, RPC timeouts, insufficient-rights responses, Kerberos clock skew, and a certificate name mismatch. These represented different failure classes. A timeout raised a transport question, an access-rights error called for reviewing the effective directory permissions, and a certificate mismatch required checking which identity the certificate represented. Treating the errors separately prevented a working credential or a valid directory finding from being discarded prematurely.

Service-level checks also showed why valid authentication should not be reported as administrative access. SMB validation did not establish remote service execution privileges. A working remote management session under a service identity did not establish a domain administrator session. The retained evidence supported privileged Kerberos authentication and recovery of credential material. It did not establish a privileged interactive session or final flag collection.

## Remediation

- Patch affected Windows clients for CVE-2025-24071. Restrict outbound SMB to approved destinations and monitor unusual outbound authentication.
- Review who can modify service-account groups and identity attributes. Limit those permissions to dedicated administrative roles and monitor unexpected changes.
- Enforce strong certificate mappings and verify that issued authentication certificates carry the required identity binding. Audit enrollment and revoke certificates issued under unsafe configurations.
- Use managed service accounts or strong, unique service credentials where supported.

## Detection, cleanup, and retest

- Correlate write activity in shared folders with unusual workstation outbound authentication and unexpected SMB destinations.
- Review unexpected service-group membership changes and newly added authentication keys on service identities. Confirm temporary keys and membership changes have been removed when closing an assessment.
- Correlate identity attribute changes with certificate requests and later authentication. An identity value briefly changing and then reverting is worth investigating when it coincides with sensitive enrollment activity.
- Retest after patching the client, tightening share permissions, and enforcing strong certificate mapping. Check that legitimate file access, service authentication, and certificate issuance still work.

## Takeaways

Review file-sharing permissions, directory delegation, and certificate enrollment together. Each can look manageable in isolation while the combined exposure crosses from a workstation to privileged domain authentication.
