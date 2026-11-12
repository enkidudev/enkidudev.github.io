---
title: "HTB TombWatcher: Deleted Objects and Certificate Trust"
description: "A defensive case study on inherited directory permissions, restored accounts, and unsafe AD CS certificate templates."
date: "2026-11-12"
category: "Hack The Box"
difficulty: "Medium"
tags: ["Active Directory", "AD CS", "Windows"]
published: true
---

## Scope and starting conditions

The lab supplied a standard domain user. The assessment examined reachable Windows services and the user's effective directory permissions. Readable standard domain shares yielded little useful evidence. Reviewing ownership, group membership, delegation, and inheritance showed where the starting identity's reach extended.

## Findings and impact

TombWatcher combined several delegated directory permissions with a certificate services misconfiguration. Starting with a supplied standard account, the assessment found that loosely scoped group and identity permissions exposed a managed service identity. Further directory review revealed an organizational unit with inherited control over certificate-related accounts.

The deleted-object inventory mattered because restoring a former certificate administrator returned it to the scope of those inherited permissions. The certificate authority also exposed an unsafe enrollment configuration classified as ESC15. The combined exposure affected both certificate issuance and privileged domain authentication.

## Evidence and findings

| Observation | Why it mattered | Control to review |
| --- | --- | --- |
| Accounts had unnecessary SPN write and group self-membership rights | Routine delegation let identities affect other accounts and join a group with sensitive access. | Review account attribute writes and delegated group membership. |
| A delegation group could read a managed service account's password | A managed credential still depended on the membership and permissions of its approved readers. | Restrict managed-password retrieval and audit the effective membership of reader groups. |
| Password resets, ownership, and ACL writes were delegated across accounts | Several individually scoped grants combined into a broader identity-control problem. | Review transitive rights and constrain both object ownership and DACL modification. |
| A certificate-services OU passed broad rights to descendants | Effective permissions on an identity depended on its placement and inherited access. | Compare explicit and inherited permissions across privileged OUs. |
| Three deleted accounts had the same name and previous parent | A name alone could not identify the historical account or establish what permissions would apply after restoration. | Audit restoration permissions and track restored objects by immutable identifiers. |
| A legacy WebServer template exposed ESC15 conditions | The CA's enrollment and application-policy settings affected which identity could authenticate. | Patch CVE-2024-49019 and review template versions, enrollment permissions, and certificate policies. |

## Troubleshooting and evidence quality

The Kerberos time discrepancy differed from the one observed in Administrator. A timestamp extraction initially combined two similar fields, producing an implausible result. Comparing the exact clock values showed why an offset copied from a prior assessment was unreliable. The notes also distinguish missing dependencies and output-directory errors from failures caused by the lab itself.

Certificate issuance was a separate milestone from authentication. One authentication method failed even though the CA issued a certificate. A legacy signature algorithm also caused a client-side TLS rejection. The observed result ultimately supported **privileged LDAP authentication through Schannel**. That is the strongest retained evidence in the source draft. The final host-access steps lacked comparable proof, so they are outside the verified outcome reported here.

## Remediation

- Restrict managed service account password retrieval and audit the effective membership of groups with that permission.
- Review ownership, inherited access, and delegated account restoration rights on privileged organizational units. Include restored objects in permission reviews and alert on unexpected restorations.
- Patch enterprise certificate authorities and review template eligibility, enrollment permissions, application policies, and certificate identity mappings.
- Monitor certificate enrollment and authentication alongside directory changes. Investigate unexpected certificate requests involving privileged identities.

## Cleanup and retest

The assessment changed directory state. The cleanup ledger should record ownership and ACL changes, group membership changes, password resets, the restored account, issued certificates, and temporary authentication keys. Record each object's identifier, the expected baseline, the restoration status, and who verified it. Preserve the distinction between an item scheduled for cleanup and one confirmed restored.

After remediation, review effective rights on the certificate-services OU, including the permissions a restored object would inherit. Confirm that designated administrators can still restore accounts and issue legitimate certificates. Check that managed-password reads, template enrollment, and privileged certificate mapping reject access outside the intended roles.

## Takeaways

An inventory limited to enabled accounts misses the security impact of restored objects. Treat account restoration as a privileged operation and include certificate services in the same review.
