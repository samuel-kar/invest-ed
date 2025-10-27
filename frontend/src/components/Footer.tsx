import React from 'react'

export default function Footer() {
  return (
    <footer
      className="mt-auto py-6 px-4 lg:pl-64"
      style={{
        backgroundColor: 'var(--sidebar-bg)',
        borderTop: '1px solid var(--border-color)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Main Disclaimer */}
          <div>
            <h3
              className="text-base font-semibold mb-3"
              style={{ color: 'var(--text-primary)' }}
            >
              Important Disclaimers
            </h3>
            <div
              className="space-y-2 text-xs leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              <p>
                <strong>Educational Only:</strong> This site provides educational content only. Nothing constitutes investment or financial advice.
              </p>
              <p>
                <strong>Investment Risks:</strong> All investments carry risk of loss. Past performance doesn't guarantee future results.
              </p>
              <p>
                <strong>No Liability:</strong> This site is not responsible for any losses from decisions made based on this information.
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div>
            <h3
              className="text-base font-semibold mb-3"
              style={{ color: 'var(--text-primary)' }}
            >
              Additional Information
            </h3>
            <div
              className="space-y-2 text-xs leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              <p>
                <strong>Data Accuracy:</strong> Information may not be accurate or current. Consult qualified professionals before investing.
              </p>
              <p>
                <strong>No Professional Relationship:</strong> Use of this site doesn't create any advisor-client relationship.
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          className="mt-4 pt-4 border-t text-xs"
          style={{
            borderColor: 'var(--border-color)',
            color: 'var(--text-muted)',
          }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p>© 2025 InvestEd. All rights reserved.</p>
            <p className="mt-1 sm:mt-0">Educational purposes only.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
