import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

/**
 * Function parameter definition
 */
export interface FunctionParam {
  name: string;
  type: string;
  description: string;
  optional?: boolean;
  defaultValue?: string;
}

/**
 * Function documentation props
 */
export interface ApiFunctionProps {
  name: string;
  description: string;
  signature: string;
  params?: FunctionParam[];
  returns?: {
    type: string;
    description: string;
  };
  examples?: {
    title: string;
    code: string;
    language?: string;
  }[];
  since?: string;
  deprecated?: boolean;
  deprecatedMessage?: string;
}

/**
 * Parameter documentation component
 */
function ParamDoc({name, type, description, optional, defaultValue}: FunctionParam) {
  return (
    <div className={styles.param}>
      <div className={styles.paramHeader}>
        <code className={styles.paramName}>{name}</code>
        {optional && <span className={styles.paramOptional}>optional</span>}
        <code className={styles.paramType}>{type}</code>
      </div>
      <div className={styles.paramDescription}>{description}</div>
      {defaultValue && (
        <div className={styles.paramDefault}>
          Default: <code>{defaultValue}</code>
        </div>
      )}
    </div>
  );
}

/**
 * API Function Documentation Component
 */
export default function ApiFunction({
  name,
  description,
  signature,
  params,
  returns,
  examples,
  since,
  deprecated,
  deprecatedMessage,
}: ApiFunctionProps): ReactNode {
  return (
    <div className={clsx(styles.apiFunction, {[styles.deprecated]: deprecated})}>
      {/* Function name and metadata */}
      <div className={styles.functionHeader}>
        <Heading as="h3" id={name}>
          <code className={styles.functionName}>{name}</code>
        </Heading>
        <div className={styles.functionMeta}>
          {deprecated && (
            <span className={styles.deprecatedBadge}>Deprecated</span>
          )}
          {since && <span className={styles.sinceBadge}>Since v{since}</span>}
        </div>
      </div>

      {/* Deprecation warning */}
      {deprecated && deprecatedMessage && (
        <div className={styles.deprecatedWarning}>
          ⚠️ <strong>Deprecated:</strong> {deprecatedMessage}
        </div>
      )}

      {/* Description */}
      <div className={styles.functionDescription}>{description}</div>

      {/* Signature */}
      <div className={styles.functionSignature}>
        <Heading as="h4">Signature</Heading>
        <pre className={styles.signature}>
          <code>{signature}</code>
        </pre>
      </div>

      {/* Parameters */}
      {params && params.length > 0 && (
        <div className={styles.functionParams}>
          <Heading as="h4">Parameters</Heading>
          <div className={styles.paramsList}>
            {params.map((param, idx) => (
              <ParamDoc key={idx} {...param} />
            ))}
          </div>
        </div>
      )}

      {/* Returns */}
      {returns && (
        <div className={styles.functionReturns}>
          <Heading as="h4">Returns</Heading>
          <div className={styles.returnType}>
            <code>{returns.type}</code>
          </div>
          <div className={styles.returnDescription}>{returns.description}</div>
        </div>
      )}

      {/* Examples */}
      {examples && examples.length > 0 && (
        <div className={styles.functionExamples}>
          <Heading as="h4">Examples</Heading>
          {examples.map((example, idx) => (
            <div key={idx} className={styles.example}>
              {example.title && (
                <div className={styles.exampleTitle}>{example.title}</div>
              )}
              <pre className={styles.exampleCode}>
                <code className={`language-${example.language || 'typescript'}`}>
                  {example.code}
                </code>
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * API Category Component
 */
export interface ApiCategoryProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function ApiCategory({title, description, children}: ApiCategoryProps): ReactNode {
  return (
    <div className={styles.apiCategory}>
      <Heading as="h2">{title}</Heading>
      {description && <p className={styles.categoryDescription}>{description}</p>}
      <div className={styles.categoryFunctions}>{children}</div>
    </div>
  );
}