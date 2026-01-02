import fs from 'fs/promises';
import path from 'path';
import { Project, SyntaxKind, JSDocTagStructure } from 'ts-morph';

interface FunctionDoc {
  name: string;
  description: string;
  params: Array<{
    name: string;
    type: string;
    description: string;
  }>;
  returns: {
    type: string;
    description: string;
  };
  examples: string[];
  signature: string;
}

const CATEGORIES = ['array', 'object', 'string', 'function', 'number', 'is', 'date', 'promise', 'collection', 'math'];

const CATEGORY_DESCRIPTIONS: Record<string, { en: string; zh: string }> = {
  array: {
    en: 'Array',
    zh: '数组',
  },
  object: {
    en: 'Object',
    zh: '对象',
  },
  string: {
    en: 'String ',
    zh: '字符串',
  },
  function: {
    en: 'Function',
    zh: '函数工具',
  },
  number: {
    en: 'Number',
    zh: '数字工具',
  },
  is: {
    en: 'Type checking',
    zh: '类型判断',
  },
  date: {
    en: 'Date',
    zh: '日期',
  },
  promise: {
    en: 'Promise',
    zh: 'Promise',
  },
  collection: {
    en: 'Collection',
    zh: '集合',
  },
  math: {
    en: 'Math',
    zh: '数学',
  },
};

async function extractFunctionDoc(sourceFile: any): Promise<FunctionDoc | null> {
  const functions = sourceFile.getFunctions();
  if (functions.length === 0) return null;

  const func = functions[0]; // Get first exported function
  const name = func.getName();
  if (!name) return null;

  // Extract JSDoc
  const jsDoc = func.getJsDocs()[0];
  let description = '';
  const params: FunctionDoc['params'] = [];
  let returns = { type: '', description: '' };
  const examples: string[] = [];

  if (jsDoc) {
    // Get description
    const tags = jsDoc.getTags();
    const description_text = jsDoc.getDescription();
    description = description_text?.trim() || '';

    // Extract tags
    for (const tag of tags) {
      const tagName = tag.getTagName();

      if (tagName === 'param') {
        const paramText = tag.getText();
        // Parse @param {type} name description
        const paramMatch = paramText.match(/@param\s*(?:\{([^}]+)\})?\s*(\w+)\s*(.*)/);
        if (paramMatch) {
          params.push({
            name: paramMatch[2] || '',
            type: paramMatch[1] || 'any',
            description: paramMatch[3] || '',
          });
        }
      } else if (tagName === 'returns' || tagName === 'return') {
        const returnText = tag.getText();
        // Parse @returns {type} description
        const returnMatch = returnText.match(/@returns?\s*(?:\{([^}]+)\})?\s*(.*)/);
        if (returnMatch) {
          returns = {
            type: returnMatch[1] || 'any',
            description: returnMatch[2] || '',
          };
        }
      } else if (tagName === 'example') {
        const exampleText = tag
          .getText()
          .replace(/@example\s*/, '')
          .trim();
        if (exampleText) {
          examples.push(exampleText);
        }
      }
    }
  }

  // Get function signature
  const signature = func.getText().split('\n')[0];

  return {
    name,
    description,
    params,
    returns,
    examples,
    signature,
  };
}

/**
 * Load interactive examples from the interactive-examples directory
 * Returns a Map of example key to example code
 */
async function loadInteractiveExamples(examplesDir: string): Promise<Map<string, string>> {
  const examples = new Map<string, string>();

  try {
    for (const category of CATEGORIES) {
      const categoryPath = path.join(examplesDir, category);

      try {
        const files = await fs.readdir(categoryPath);

        for (const file of files) {
          if (!file.endsWith('.tsx')) continue;

          const filePath = path.join(categoryPath, file);
          const content = await fs.readFile(filePath, 'utf-8');

          // Extract the component code (remove imports and metadata comments)
          const componentCode = extractComponentCode(content);
          const functionName = file.replace('.tsx', '');

          examples.set(`${category}/${functionName}`, componentCode);
        }
      } catch (error) {
        // Category directory might not exist yet, skip it
        continue;
      }
    }
  } catch (error) {
    console.error('Error loading interactive examples:', error);
  }

  return examples;
}

/**
 * Extract the component code from a file and remove TypeScript type annotations
 * React Live doesn't support TypeScript, so we need to remove all type annotations
 * Also removes 'export default' since React Live expects just the function declaration
 * The ReactLiveScope (website/src/theme/ReactLiveScope/index.ts) makes React and all @rabjs/kit functions available globally
 */
function extractComponentCode(fileContent: string): string {
  const lines = fileContent.split('\n');

  // Find the line where the export default function starts
  const startIdx = lines.findIndex((line) => line.includes('export default function'));

  if (startIdx === -1) {
    return fileContent;
  }

  // Get the component code
  let componentCode = lines.slice(startIdx).join('\n');

  // Remove 'export default' keyword from the function declaration
  componentCode = componentCode.replace(/export\s+default\s+/, '');

  // Remove TypeScript type annotations
  // Remove function parameter types: (param: type) => ...
  componentCode = componentCode.replace(/:\s*[\w\[\]<>,\s|&]+\s*(?=[,\)\]=>])/g, '');

  // Remove variable/const type annotations: const x: type = ...
  componentCode = componentCode.replace(/:\s*[\w\[\]<>,\s|&]+\s*(?=[=;])/g, '');

  // Remove function return type annotations: ): type => ...
  componentCode = componentCode.replace(/\):\s*[\w\[\]<>,\s|&]+\s*(?=\s*[=>{])/g, ')');

  return componentCode;
}

async function generateFunctionDoc(
  func: FunctionDoc,
  category: string,
  locale: 'en' | 'zh-CN',
  interactiveExamples?: Map<string, string>,
): Promise<string> {
  const isZh = locale === 'zh-CN';

  const descText = isZh ? '描述' : 'Description';
  const paramsText = isZh ? '参数' : 'Parameters';
  const returnsText = isZh ? '返回值' : 'Returns';
  const examplesText = isZh ? '示例' : 'Examples';
  const typeText = isZh ? '类型' : 'Type';
  const interactiveText = isZh ? '交互式示例' : 'Interactive Example';

  const docId = `${category}/${func.name}`;
  // Escape description for YAML - remove newlines and trim
  const escapedDescription = (func.description || '').replace(/\n/g, ' ').trim();
  let content = `---
id: ${func.name}
title: ${func.name}
description: ${escapedDescription ? `"${escapedDescription.replace(/"/g, '\\"')}"` : ''}
---

# \`${func.name}\`

`;

  if (func.description) {
    content += `${func.description}

`;
  }

  if (func.params.length > 0) {
    content += `## ${paramsText}

| ${isZh ? '参数' : 'Parameter'} | ${typeText} | ${descText} |
|---------|------|---------|
`;
    for (const param of func.params) {
      content += `| \`${param.name}\` | \`${param.type}\` | ${param.description || '-'} |
`;
    }
    content += `
`;
  }

  if (func.returns.type || func.returns.description) {
    content += `## ${returnsText}

- **${typeText}**: \`${func.returns.type || 'void'}\`
- **${descText}**: ${func.returns.description || '-'}

`;
  }

  if (func.examples.length > 0) {
    content += `## ${examplesText}

`;
    for (let i = 0; i < func.examples.length; i++) {
      const example = func.examples[i];
      content += `\`\`\`typescript
${example}
\`\`\`

`;
    }
  }

  // Add interactive example section
  const exampleKey = `${category}/${func.name}`;
  const interactiveCode = interactiveExamples?.get(exampleKey);

  if (interactiveCode) {
    content += `## ${interactiveText}

\`\`\`tsx live
${interactiveCode}
\`\`\`

`;
  } else {
    // Fallback: show a placeholder if no interactive example is available
    content += `## ${interactiveText}

\`\`\`tsx live
function ${func.name}Example() {
  return (
    <div style={{padding: '20px', background: '#f5f5f5', borderRadius: '8px'}}>
      <h4>\`${func.name}\` Example</h4>
      <p>${isZh ? '交互式示例即将推出，敬请期待。' : 'Interactive example coming soon!'}</p>
    </div>
  );
}
\`\`\`

`;
  }

  return content;
}

async function getAllFunctionsInCategory(category: string): Promise<FunctionDoc[]> {
  const project = new Project({
    tsConfigFilePath: path.resolve(__dirname, '../tsconfig.json'),
  });

  const categoryPath = path.resolve(__dirname, `../src/${category}`);

  try {
    const files = await fs.readdir(categoryPath);
    const functions: FunctionDoc[] = [];

    for (const file of files) {
      if (file === 'index.ts' || !file.endsWith('.ts')) continue;

      const filePath = path.join(categoryPath, file);
      const sourceFile = project.addSourceFileAtPath(filePath);
      const funcDoc = await extractFunctionDoc(sourceFile);

      if (funcDoc) {
        functions.push(funcDoc);
      }
    }

    return functions.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error(`Error processing category ${category}:`, error);
    return [];
  }
}

async function generateApiDocs() {
  console.log('🚀 Starting API documentation generation...\n');

  // Load pre-generated interactive examples
  console.log('📦 Loading interactive examples...');
  const examplesDir = path.resolve(__dirname, '../interactive-examples');
  const interactiveExamples = await loadInteractiveExamples(examplesDir);
  console.log(`   ✅ Loaded ${interactiveExamples.size} interactive examples\n`);

  // Generate docs for each category
  for (const category of CATEGORIES) {
    console.log(`📝 Generating docs for ${category}...`);

    const functions = await getAllFunctionsInCategory(category);

    if (functions.length === 0) {
      console.log(`   ⚠️  No functions found in ${category}`);
      continue;
    }

    // Create category subdirectories for English
    const enCategoryPath = path.resolve(__dirname, `../website/docs/api/${category}`);
    await fs.mkdir(enCategoryPath, { recursive: true });

    // Create category subdirectories for Chinese
    const zhCategoryPath = path.resolve(
      __dirname,
      `../website/i18n/zh-CN/docusaurus-plugin-content-docs/current/api/${category}`,
    );
    await fs.mkdir(zhCategoryPath, { recursive: true });

    // Generate category index file for English
    const enIndexContent = `---
id: index
title: ${CATEGORY_DESCRIPTIONS[category].en}
description: ${CATEGORY_DESCRIPTIONS[category].en}
---

# ${CATEGORY_DESCRIPTIONS[category].en}

${CATEGORY_DESCRIPTIONS[category].en}
`;
    await fs.writeFile(path.join(enCategoryPath, 'index.md'), enIndexContent);

    // Generate category index file for Chinese
    const zhIndexContent = `---
id: index
title: ${CATEGORY_DESCRIPTIONS[category].zh}
description: ${CATEGORY_DESCRIPTIONS[category].zh}
---

# ${CATEGORY_DESCRIPTIONS[category].zh}

${CATEGORY_DESCRIPTIONS[category].zh}
`;
    await fs.writeFile(path.join(zhCategoryPath, 'index.md'), zhIndexContent);

    // Generate category.json for English
    const enCategoryJson = {
      label: CATEGORY_DESCRIPTIONS[category].en,
      position: CATEGORIES.indexOf(category) + 1,
    };
    await fs.writeFile(path.join(enCategoryPath, '_category_.json'), JSON.stringify(enCategoryJson, null, 2));

    // Generate category.json for Chinese
    const zhCategoryJson = {
      label: CATEGORY_DESCRIPTIONS[category].zh,
      position: CATEGORIES.indexOf(category) + 1,
    };
    await fs.writeFile(path.join(zhCategoryPath, '_category_.json'), JSON.stringify(zhCategoryJson, null, 2));

    // Generate individual function docs
    for (const func of functions) {
      // English
      const enContent = await generateFunctionDoc(func, category, 'en', interactiveExamples);
      const enPath = path.join(enCategoryPath, `${func.name}.md`);
      await fs.writeFile(enPath, enContent);

      // Chinese
      const zhContent = await generateFunctionDoc(func, category, 'zh-CN', interactiveExamples);
      const zhPath = path.join(zhCategoryPath, `${func.name}.md`);
      await fs.writeFile(zhPath, zhContent);

      console.log(`   ✅ Generated ${category}/${func.name}.md`);
    }
  }

  console.log('\n✨ API documentation generation completed!');
}

// Run the script
generateApiDocs().catch((error) => {
  console.error('Error generating API docs:', error);
  process.exit(1);
});