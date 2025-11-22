import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()
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
              {t('footer.importantDisclaimers')}
            </h3>
            <div
              className="space-y-2 text-xs leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              <p>
                <strong>{t('footer.educationalOnly')}</strong>{' '}
                {t('footer.educationalOnlyText')}
              </p>
              <p>
                <strong>{t('footer.investmentRisks')}</strong>{' '}
                {t('footer.investmentRisksText')}
              </p>
              <p>
                <strong>{t('footer.noLiability')}</strong>{' '}
                {t('footer.noLiabilityText')}
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div>
            <h3
              className="text-base font-semibold mb-3"
              style={{ color: 'var(--text-primary)' }}
            >
              {t('footer.additionalInformation')}
            </h3>
            <div
              className="space-y-2 text-xs leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              <p>
                <strong>{t('footer.dataAccuracy')}</strong>{' '}
                {t('footer.dataAccuracyText')}
              </p>
              <p>
                <strong>{t('footer.noProfessionalRelationship')}</strong>{' '}
                {t('footer.noProfessionalRelationshipText')}
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
            <p>{t('footer.copyright')}</p>
            <p className="mt-1 sm:mt-0">{t('footer.educationalPurposes')}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
