import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const COMMAND = 'npx @react-native-community/cli@latest init MyApp --template @modhamanish/rn-mm-template';

const FEATURES = [
  {
    icon: '🪄',
    title: 'Interactive CLI Wizard',
    description: 'Prompts during initialization to tailor Onboarding, Authentication, and Navigation structure automatically.',
  },
  {
    icon: '⚡',
    title: 'React Native 0.87+ & React 19',
    description: 'Built on the newest React Native architecture with strict TypeScript 5.8+ and modern compiler standards.',
  },
  {
    icon: '🧭',
    title: 'Multi-Flavor Navigation',
    description: 'Pre-configured React Navigation v7 with fluid Native Stack, Bottom Tabs, and Drawer navigators.',
  },
  {
    icon: '🔄',
    title: 'TanStack Query & Axios',
    description: 'Robust server-state management with background refetching, caching, custom query hooks, and mock service layer.',
  },
  {
    icon: '🎨',
    title: 'Design System & Theming',
    description: 'Automatic system light/dark mode detection, token-based colors, typography, and reusable UI components.',
  },
  {
    icon: '🌐',
    title: 'i18n Multi-Language',
    description: 'Full internationalization powered by i18next with English and Hindi out of the box, and instant runtime switching.',
  },
];

function HeroHeader() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(COMMAND);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <header className={styles.heroSection}>
      <div className="container">
        <div className={styles.versionBadge}>v1.2.0 • React Native 0.87.1 • TypeScript 5.8.3</div>
        <Heading as="h1" className={styles.heroTitle}>
          Build Mobile Apps Faster with <span className={styles.titleGradient}>MMTemplate</span>
        </Heading>
        <p className={styles.heroSubtitle}>
          The production-ready, modular React Native TypeScript boilerplate with an Interactive CLI Wizard, Clean Architecture, and industry best practices.
        </p>

        {/* Command Box */}
        <div>
          <div className={styles.commandBox}>
            <span className={styles.commandText}>{COMMAND}</span>
            <button className={styles.copyBtn} onClick={handleCopy} type="button">
              {copied ? '✓ Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.actionButtons}>
          <Link className={styles.primaryBtn} to="/docs/intro">
            Get Started 🚀
          </Link>
          <Link
            className={styles.secondaryBtn}
            to="/docs/getting-started/interactive-wizard">
            Explore CLI Wizard 🪄
          </Link>
          <Link
            className={styles.secondaryBtn}
            href="https://github.com/modhamanish/mm-template">
            GitHub ⭐️
          </Link>
        </div>
      </div>
    </header>
  );
}

function FeatureGrid() {
  return (
    <section className={styles.featuresGridSection}>
      <div className={styles.grid}>
        {FEATURES.map((item, idx) => (
          <div key={idx} className={styles.card}>
            <div className={styles.cardIcon}>{item.icon}</div>
            <Heading as="h3" className={styles.cardTitle}>
              {item.title}
            </Heading>
            <p className={styles.cardDesc}>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="MMTemplate Docs - React Native Boilerplate"
      description={siteConfig.tagline}>
      <HeroHeader />
      <main>
        <FeatureGrid />
      </main>
    </Layout>
  );
}
