'use client'

import { useLocale } from '@/i18n/client'
import { Button } from '@/components/Button'

const cryptoPrimitives = [
  {
    label: 'Encryption',
    value: 'ChaCha20Poly1305 (RFC 8439)',
    detail: 'AEAD, 256-bit keys, per-record nonces',
  },
  {
    label: 'Key derivation',
    value: 'Argon2id',
    detail: '64 MiB memory, 3 iterations, GPU/ASIC-resistant',
  },
  {
    label: 'Encryption at rest',
    value: 'AES-256-GCM (two-tier)',
    detail: 'Server-side mandatory + optional client-side',
  },
  {
    label: 'Memory safety',
    value: 'ZeroizeOnDrop',
    detail: 'Key material zeroed on process exit',
  },
  {
    label: 'Auth',
    value: 'Constant-time comparison',
    detail: 'Timing-attack resistant bearer tokens',
  },
  {
    label: 'Telemetry',
    value: 'None',
    detail: 'Zero analytics, zero phone-home, zero outbound connections',
  },
]

const complianceStandards = [
  {
    standard: 'ISO 27001',
    controls: 'A.10, A.12, A.14',
    status: 'Aligned',
    detail: 'Cryptographic controls, operations security, secure development',
  },
  {
    standard: 'SOC 2 Type II',
    controls: 'CC6.1, CC6.7, CC7.2, CC8.1',
    status: 'Aligned',
    detail: 'Access controls, encryption, change management, audit logging',
  },
  {
    standard: 'GDPR',
    controls: 'Art. 25, Art. 32',
    status: 'Aligned',
    detail: 'Data protection by design, encryption of personal data at rest',
  },
  {
    standard: 'NIST SP 800-132',
    controls: 'Key derivation',
    status: 'Compliant',
    detail: 'Argon2id with documented parameters exceeding minimum requirements',
  },
  {
    standard: 'NIST SP 800-38D',
    controls: 'GCM mode',
    status: 'Compliant',
    detail: 'AES-256-GCM implementation for encryption at rest',
  },
]

export function SecurityOverview() {
  const { locale } = useLocale()

  return (
    <div className="not-prose my-16">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
        Security internals
      </h2>
      <p className="mt-2 text-sm/6 text-zinc-600 dark:text-zinc-400">
        Every secret is encrypted at rest before touching disk. The server makes zero outbound connections.
        Sirr implements cryptographic and operational controls aligned with ISO 27001, SOC 2, and GDPR
        requirements.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cryptoPrimitives.map((item) => (
          <div
            key={item.label}
            className="rounded-lg border border-zinc-900/7.5 bg-zinc-50 px-4 py-3 dark:border-white/10 dark:bg-white/2.5"
          >
            <div className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
              {item.label}
            </div>
            <div className="mt-1 text-sm font-semibold text-zinc-900 dark:text-white">
              {item.value}
            </div>
            <div className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-500">
              {item.detail}
            </div>
          </div>
        ))}
      </div>

      <h3 className="mt-10 text-sm font-semibold text-zinc-900 dark:text-white">
        Compliance alignment
      </h3>
      <p className="mt-1 mb-4 text-xs text-zinc-500 dark:text-zinc-500">
        Sirr implements the technical controls. Independent certification is on our roadmap.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-900/10 dark:border-white/10">
              <th className="py-2 pr-4 font-medium text-zinc-900 dark:text-white">
                Standard
              </th>
              <th className="py-2 pr-4 font-medium text-zinc-900 dark:text-white">
                Controls
              </th>
              <th className="py-2 pr-4 font-medium text-zinc-900 dark:text-white">
                Status
              </th>
              <th className="py-2 font-medium text-zinc-900 dark:text-white">
                Coverage
              </th>
            </tr>
          </thead>
          <tbody>
            {complianceStandards.map((row) => (
              <tr
                key={row.standard}
                className="border-b border-zinc-900/5 dark:border-white/5"
              >
                <td className="py-2 pr-4 font-medium text-zinc-900 dark:text-white">
                  {row.standard}
                </td>
                <td className="py-2 pr-4 font-mono text-xs text-zinc-600 dark:text-zinc-400">
                  {row.controls}
                </td>
                <td className="py-2 pr-4">
                  <span className="inline-flex items-center rounded-full bg-brand-500/10 px-2 py-0.5 text-xs font-medium text-brand-600 dark:text-brand-400">
                    {row.status}
                  </span>
                </td>
                <td className="py-2 text-zinc-600 dark:text-zinc-400">
                  {row.detail}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex gap-3">
        <Button href={`/${locale}/security`} variant="text" arrow="right">
          Full security architecture
        </Button>
        <Button href={`/${locale}/vault-encryption`} variant="text" arrow="right">
          Vault encryption details
        </Button>
      </div>
    </div>
  )
}
