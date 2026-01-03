import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Translate from '@docusaurus/Translate';
import styles from './styles.module.css';

type FeatureItem = {
  title: ReactNode;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: (
      <Translate
        id="homepage.features.comprehensive.title"
        description="Title of comprehensive feature on homepage">
        🚀 100+ Utility Functions
      </Translate>
    ),
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <Translate
        id="homepage.features.comprehensive.description"
        description="Description of comprehensive feature">
        A comprehensive collection of utility functions covering arrays, objects, strings,
        dates, promises, and more. Everything you need for modern TypeScript development.
      </Translate>
    ),
  },
  {
    title: (
      <Translate
        id="homepage.features.typescript.title"
        description="Title of TypeScript feature on homepage">
        📘 Full TypeScript Support
      </Translate>
    ),
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <Translate
        id="homepage.features.typescript.description"
        description="Description of TypeScript feature">
        Built with TypeScript from the ground up with complete type definitions.
        Get full IntelliSense support and type safety in your IDE.
      </Translate>
    ),
  },
  {
    title: (
      <Translate
        id="homepage.features.lightweight.title"
        description="Title of lightweight feature on homepage">
        ⚡ Tree-shakeable & Lightweight
      </Translate>
    ),
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <Translate
        id="homepage.features.lightweight.description"
        description="Description of lightweight feature">
        Modular architecture ensures you only bundle what you use.
        Zero dependencies and optimized for maximum performance.
      </Translate>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}