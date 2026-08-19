let meta = #{
    name: "kit-1-0-modernization",
    description: "Orchestrate the @rabjs/kit 1.0 modernization plan on chore/v1-modernization",
    when_to_use: "When executing docs/superpowers/plans/2026-08-19-kit-1.0-modernization.md",
    phases: [
        #{ title: "Inspect", detail: "branch, progress, resume point" },
        #{ title: "Task1", detail: "tsdown + vitest toolchain" },
        #{ title: "Task2", detail: "named exports and array splits" },
        #{ title: "Task3", detail: "immutable remove" },
        #{ title: "Task4", detail: "AbortSignal on delay/timeout/retry" },
        #{ title: "Task5", detail: "remove public any" },
        #{ title: "Task6", detail: "catalog generator and llms.txt" },
        #{ title: "Task7", detail: "bilingual docs and skills" },
        #{ title: "Task8", detail: "Vite catalog docs site" },
        #{ title: "Task9", detail: "Changesets, CI, Pages" },
        #{ title: "Task10", detail: "integration gate" },
    ],
};

let result_schema = #{
    "type": "object",
    "required": ["ok", "summary"],
    "properties": #{
        "ok": #{ "type": "boolean" },
        "summary": #{ "type": "string" },
        "task": #{ "type": "string" },
        "skipped": #{ "type": "boolean" },
        "commit": #{ "type": "string" },
        "files": #{
            "type": "array",
            "items": #{ "type": "string" },
        },
    },
};

let inspect_schema = #{
    "type": "object",
    "required": ["ok", "summary", "branch"],
    "properties": #{
        "ok": #{ "type": "boolean" },
        "summary": #{ "type": "string" },
        "branch": #{ "type": "string" },
        "head": #{ "type": "string" },
        "done_tasks": #{
            "type": "array",
            "items": #{ "type": "string" },
        },
    },
};

let repo = "/Users/ximing/project/mygithub/kit";
let plan = repo + "/docs/superpowers/plans/2026-08-19-kit-1.0-modernization.md";
let spec = repo + "/docs/superpowers/specs/2026-08-19-kit-1.0-modernization-design.md";
let branch = "chore/v1-modernization";
if args != () && args.branch != () && args.branch != "" {
    branch = args.branch;
}

fn failed(step, reason) {
    complete(#{
        ok: false,
        failed_at: step,
        summary: reason,
    });
}

fn agent_failed(r) {
    if r == () { return true; }
    if r.success != true { return true; }
    if r.output != () && r.output.ok == false { return true; }
    return false;
}

fn fail_reason(r) {
    if r == () { return "agent slot empty"; }
    if r.success != true { return "agent success=false"; }
    if r.output != () && r.output.summary != () { return r.output.summary; }
    return "unknown failure";
}

fn summary_of(r) {
    if r == () { return "(empty slot)"; }
    if r.success != true { return "success=false"; }
    if r.output == () { return "(no output)"; }
    if r.output.summary == () { return "(no summary)"; }
    return r.output.summary;
}

fn common_rules(repo_path, plan_path, spec_path, git_branch) {
    let s = "";
    s += "You are a coding agent implementing ONE task of the @rabjs/kit 1.0 modernization.\n";
    s += "Repo (absolute): " + repo_path + "\n";
    s += "Plan (READ the matching Task section in full before editing): " + plan_path + "\n";
    s += "Spec (source of truth for behavior): " + spec_path + "\n";
    s += "Git branch: `" + git_branch + "`\n";
    s += "\n";
    s += "HARD RULES:\n";
    s += "- Use tools. Read the plan Task section and current files. Do not answer from memory.\n";
    s += "- Work ONLY on `" + git_branch + "`. Never commit to main/master. Never merge. Never publish to npm.\n";
    s += "- Do not implement later tasks. Do not redo earlier tasks unless they are broken.\n";
    s += "- Follow TDD for behavior changes: failing test first, then implementation.\n";
    s += "- Package manager is pnpm, not npm or yarn.\n";
    s += "- Keep every current public function. Named exports only. No new export default.\n";
    s += "- Function names and primary argument order stay lodash-compatible.\n";
    s += "- remove(array, predicate) must return removed items and MUST NOT mutate array (Task 3+).\n";
    s += "- No any in public signatures after Task 5. sideEffects false. Node >= 20. type module.\n";
    s += "- Do not hand-edit package.json exports after tsdown owns it (Task 2+).\n";
    s += "- Skills live only under repo skills/. Do not copy to ~/.grok/skills or ~/.agents/skills.\n";
    s += "- Docs base path /kit/. Do not keep Rollup, Jest, or Docusaurus after the task that deletes them.\n";
    s += "- If this task is already committed on the branch (matching commit message from the plan), verify the task's checks still pass, then return ok=true skipped=true. Do not recommit no-op.\n";
    s += "- If the working tree is dirty with files from THIS task, finish and commit them. Do not discard other agents' in-progress work.\n";
    s += "- Prefer explicit git add of files you changed. Do not git add coverage/, dist/, node_modules/, website/build/, website/dist/ unless the plan requires built artifacts (it does not).\n";
    s += "- .grok/workflows/ may exist; you may add the workflow file if untracked, but do not revert it.\n";
    s += "- Run the verification commands named in YOUR task. If they fail, fix them before finishing.\n";
    s += "- Return JSON {ok, summary, task, skipped, commit, files}. ok=false if you could not finish or tests failed.\n";
    return s;
}

phase("Inspect");
log("Inspect repo and prepare branch " + branch);
let inspect_prompt = "";
inspect_prompt += "You are the orchestrator's inspector for @rabjs/kit 1.0 modernization.\n";
inspect_prompt += "Repo: " + repo + "\n";
inspect_prompt += "Plan: " + plan + "\n";
inspect_prompt += "Target branch: `" + branch + "`\n";
inspect_prompt += "Use tools. Do not implement product code.\n";
inspect_prompt += "\n";
inspect_prompt += "Do ALL of this:\n";
inspect_prompt += "1. cd to the repo. git status, git branch --show-current, git log --oneline -20.\n";
inspect_prompt += "2. If `" + branch + "` does not exist locally, create it from main (do not reset main).\n";
inspect_prompt += "   git checkout main; git checkout -B " + branch + " is OK if the branch does not exist.\n";
inspect_prompt += "   If it exists, check it out. Never implement on main.\n";
inspect_prompt += "3. Identify which plan tasks 1-10 are already done by commit messages and files:\n";
inspect_prompt += "   Task1 commit: chore: migrate toolchain to tsdown and vitest (tsdown.config.ts, vitest.config.ts exist; jest.config.js gone)\n";
inspect_prompt += "   Task2: refactor: named exports only and split array helpers (src/array/take.ts etc; no export default in src)\n";
inspect_prompt += "   Task3: feat!: make remove immutable\n";
inspect_prompt += "   Task4: feat: accept AbortSignal on delay, timeout, and retry\n";
inspect_prompt += "   Task5: refactor: remove any from public API types\n";
inspect_prompt += "   Task6: feat: generate API catalog and llms.txt from JSDoc\n";
inspect_prompt += "   Task7: docs: bilingual readme, agent guide, and repo skills\n";
inspect_prompt += "   Task8: docs: replace docusaurus with vite catalog site\n";
inspect_prompt += "   Task9: ci: add changesets release and replace legacy workflows\n";
inspect_prompt += "   Task10: fix: close 1.0 verification gaps (optional; Task10 is a gate)\n";
inspect_prompt += "4. Leave the repo ON `" + branch + "` when you finish.\n";
inspect_prompt += "5. Do not commit. Do not edit source except creating the branch.\n";
inspect_prompt += "Return {ok:true, summary, branch, head, done_tasks} where done_tasks is like [\"1\",\"2\"] or [].\n";
inspect_prompt += "ok=false only if you cannot check out the branch.\n";
let inspect_r = agent(inspect_prompt, #{
    label: "inspect",
    capability_mode: "all",
    output_schema: inspect_schema,
});
if agent_failed(inspect_r) { failed("inspect", fail_reason(inspect_r)); }
log("Inspect: " + summary_of(inspect_r));

phase("Task1");
log("Task 1: toolchain");
let t1 = "";
t1 += common_rules(repo, plan, spec, branch);
t1 += "\n## YOUR TASK: Task 1 — Branch and tooling foundation\n";
t1 += "Read the plan section ### Task 1 in full and follow every step.\n";
t1 += "Commit message: chore: migrate toolchain to tsdown and vitest\n";
t1 += "Implement:\n";
t1 += "1. Ensure you are on `" + branch + "` (create from main if needed). Never stay on main to commit.\n";
t1 += "2. Rewrite root package.json scripts/metadata as the plan JSON (keep name @rabjs/kit, keep giant exports for this commit, keep main/module/types pointing at dist).\n";
t1 += "3. Swap devDependencies with pnpm remove/add as the plan lists. Keep typescript, eslint, prettier, husky, lint-staged, tsx, @types/node 22.x.\n";
t1 += "4. Write tsdown.config.ts and vitest.config.ts exactly as the plan (coverage thresholds 90, include test/**/*.spec.ts).\n";
t1 += "5. Tighten tsconfig.json and tsconfig.spec.json as the plan. Do not set strict false on tests.\n";
t1 += "6. Convert eslint.config.js to ESM default-export array, vitest plugin instead of jest. Keep no-explicit-any off until Task 5. Ignore dist, coverage, website/dist.\n";
t1 += "7. Delete jest.config.js, rollup.config.cjs.js, rollup.config.esm.js, tsconfig.prod.cjs.json, tsconfig.prod.esm.json, tsconfig.prod.types.json. Do not delete website/.\n";
t1 += "8. Fix tests that import @jest/globals or jest.useFakeTimers to vitest/vi. Only those files.\n";
t1 += "9. Run pnpm test and get PASS. Then commit.\n";
t1 += "If tsdown build is not fully working yet, that is OK for Task 1 as long as pnpm test passes. pnpm build should at least be the tsdown command.\n";
let r1 = agent(t1, #{
    label: "task1-toolchain",
    capability_mode: "all",
    output_schema: result_schema,
});
if agent_failed(r1) { failed("task1", fail_reason(r1)); }
log("Task1: " + summary_of(r1));

phase("Task2");
log("Task 2: named exports");
let t2 = "";
t2 += common_rules(repo, plan, spec, branch);
t2 += "\n## YOUR TASK: Task 2 — Named exports only + file-per-function splits\n";
t2 += "Read plan ### Task 2. Task 1 is already on this branch.\n";
t2 += "Commit message: refactor: named exports only and split array helpers\n";
t2 += "TDD: add test/exports.defaults.spec.ts first, run it, confirm FAIL, then split files, strip export default, re-run pnpm test.\n";
t2 += "Splits (move bodies verbatim, behavior unchanged):\n";
t2 += "- flattenDeep from flatten.ts -> src/array/flattenDeep.ts\n";
t2 += "- uniqBy from uniq.ts -> src/array/uniqBy.ts\n";
t2 += "- take/drop from zip.ts -> take.ts / drop.ts\n";
t2 += "- remove from findIndex.ts -> remove.ts (still mutating; Task 3 changes that)\n";
t2 += "Update src/array/index.ts as the plan lists.\n";
t2 += "Strip every export default in src. Confirm rg \"export default\" src is empty.\n";
t2 += "Do not change remove behavior yet. Run pnpm test. Commit.\n";
let r2 = agent(t2, #{
    label: "task2-exports",
    capability_mode: "all",
    output_schema: result_schema,
});
if agent_failed(r2) { failed("task2", fail_reason(r2)); }
log("Task2: " + summary_of(r2));

phase("Task3");
log("Task 3: immutable remove");
let t3 = "";
t3 += common_rules(repo, plan, spec, branch);
t3 += "\n## YOUR TASK: Task 3 — Immutable remove\n";
t3 += "Read plan ### Task 3. Tasks 1-2 are on the branch.\n";
t3 += "Commit message: feat!: make remove immutable\n";
t3 += "TDD: rewrite test/array/remove.spec.ts exactly as the plan, run it, confirm FAIL on mutation, then implement.\n";
t3 += "Implementation: filter(predicate) on a copy-safe readonly array; non-array -> []. Input must be unchanged.\n";
t3 += "Return type T[]. Signature uses readonly T[].\n";
t3 += "Run pnpm exec vitest run test/array/remove.spec.ts then commit.\n";
let r3 = agent(t3, #{
    label: "task3-remove",
    capability_mode: "all",
    output_schema: result_schema,
});
if agent_failed(r3) { failed("task3", fail_reason(r3)); }
log("Task3: " + summary_of(r3));

phase("Task4");
log("Task 4: AbortSignal");
let t4 = "";
t4 += common_rules(repo, plan, spec, branch);
t4 += "\n## YOUR TASK: Task 4 — AbortSignal on delay, timeout, retry\n";
t4 += "Read plan ### Task 4 and spec Additive non-breaking options.\n";
t4 += "Commit message: feat: accept AbortSignal on delay, timeout, and retry\n";
t4 += "TDD: append failing AbortSignal tests to delay/timeout/retry specs as the plan (timeout 4th arg; retry options.signal including abort between attempts). Confirm FAIL, then implement.\n";
t4 += "Add src/promise/abort.ts helpers abortError + onAbort. Do NOT export abort from src/index.ts.\n";
t4 += "If signal already aborted, reject immediately with signal.reason (or AbortError). Clear timers on abort.\n";
t4 += "Fix RetryOptions.backoff in src/types/index.ts to number. Delete unused linear|exponential union.\n";
t4 += "Existing callers that omit signal must still pass. Run pnpm exec vitest run test/promise then commit.\n";
let r4 = agent(t4, #{
    label: "task4-abort",
    capability_mode: "all",
    output_schema: result_schema,
});
if agent_failed(r4) { failed("task4", fail_reason(r4)); }
log("Task4: " + summary_of(r4));

phase("Task5");
log("Task 5: public types");
let t5 = "";
t5 += common_rules(repo, plan, spec, branch);
t5 += "\n## YOUR TASK: Task 5 — Tighten public types\n";
t5 += "Read plan ### Task 5.\n";
t5 += "Commit message: refactor: remove any from public API types\n";
t5 += "Add test/types/public-api.spec.ts with expectTypeOf as the plan (loosen to toMatchTypeOf if inference is weaker).\n";
t5 += "Replace public any: unknown + narrow; callbacks generic; no any in exported signatures. Internal hidden casts OK.\n";
t5 += "Delete export type Any = any. Update importers.\n";
t5 += "Turn @typescript-eslint/no-explicit-any to error for src/**. Tests use as unknown as, not as any.\n";
t5 += "Run: pnpm typecheck && pnpm lint && pnpm test. Coverage floor 90% still holds. Commit.\n";
let r5 = agent(t5, #{
    label: "task5-types",
    capability_mode: "all",
    output_schema: result_schema,
});
if agent_failed(r5) { failed("task5", fail_reason(r5)); }
log("Task5: " + summary_of(r5));

phase("Task6");
log("Task 6: catalog");
let t6 = "";
t6 += common_rules(repo, plan, spec, branch);
t6 += "\n## YOUR TASK: Task 6 — Catalog generator and llms.txt\n";
t6 += "Read plan ### Task 6 and the spec llms.txt / catalog sections.\n";
t6 += "Commit message: feat: generate API catalog and llms.txt from JSDoc\n";
t6 += "Write scripts/generate-catalog.ts: ts.Program over src/**/*.ts, visit src/<category>/<name>.ts (not index), skip src/promise/abort.ts.\n";
t6 += "Write website/src/generated/catalog.ts with CatalogItem[] sorted by category then name.\n";
t6 += "Write llms.txt: title, import examples, ### category sections, - name(args): summary. Include sentence: Named exports only. Immutable remove.\n";
t6 += "CLI: tsx scripts/generate-catalog.ts writes; --check exits 1 if outputs would change, no writes.\n";
t6 += "Run pnpm docs:catalog && pnpm docs:catalog:check (exit 0). Commit generator + generated files.\n";
let r6 = agent(t6, #{
    label: "task6-catalog",
    capability_mode: "all",
    output_schema: result_schema,
});
if agent_failed(r6) { failed("task6", fail_reason(r6)); }
log("Task6: " + summary_of(r6));

phase("Task7");
log("Task 7: docs and skills");
let t7 = "";
t7 += common_rules(repo, plan, spec, branch);
t7 += "\n## YOUR TASK: Task 7 — Bilingual README, agent docs, skills\n";
t7 += "Read plan ### Task 7. Also read /Users/ximing/.grok/bundled/skills/skill-design-principles/SKILL.md and follow it when writing skills.\n";
t7 += "Commit message: docs: bilingual readme, agent guide, and repo skills\n";
t7 += "README.md English sections in the plan's required order. README.zh-CN.md same in Chinese; positioning: 给人和 coding agent 用的、lodash 风格的 TypeScript 工具库。\n";
t7 += "AGENTS.md: named exports only; one function per file; JSDoc + test + pnpm docs:catalog; never edit exports; pnpm test and pnpm build; remove immutable; skills stay in skills/.\n";
t7 += "Rewrite CLAUDE.md and CONTRIBUTING.md for Vitest/tsdown/Vite, Node >= 20. Do not mention scripts/release.js.\n";
t7 += "Three skills under skills/: using-rabjs-kit, adding-kit-function, migrating-lodash-to-kit.\n";
t7 += "Frontmatter description starts with Use when... and does not summarize workflow. One home per fact.\n";
t7 += "CHANGELOG.md [1.0.0]: breaking first (no default export; remove immutable; RetryOptions.backoff number; Node >= 20), then Added, then toolchain.\n";
t7 += "Do NOT copy skills to the home directory. Commit the listed files.\n";
let r7 = agent(t7, #{
    label: "task7-docs-skills",
    capability_mode: "all",
    output_schema: result_schema,
});
if agent_failed(r7) { failed("task7", fail_reason(r7)); }
log("Task7: " + summary_of(r7));

phase("Task8");
log("Task 8: Vite docs site");
let t8 = "";
t8 += common_rules(repo, plan, spec, branch);
t8 += "\n## YOUR TASK: Task 8 — Vite + React docs site\n";
t8 += "Read plan ### Task 8 and spec docs IA. REQUIRED: read and apply /Users/ximing/.claude/plugins/marketplaces/claude-plugins-official/plugins/frontend-design/skills/frontend-design/SKILL.md\n";
t8 += "Do not ship a generic purple-gradient Docusaurus lookalike. Catalog home is a dense typographic index: wordmark, search first, category cards second.\n";
t8 += "Commit message: docs: replace docusaurus with vite catalog site\n";
t8 += "Replace the Docusaurus website/ tree with a Vite 7 + React 19 + React Router 7 app.\n";
t8 += "website/package.json as the plan. vite base /kit/. BrowserRouter basename /kit.\n";
t8 += "Routes: /, /guide, /guide/agents, /api, /api/:category, /api/:category/:name, /skills, and the same under /zh.\n";
t8 += "Header: wordmark, search link, Guide, API, Skills, EN/中 toggle (swap / <-> /zh prefix, keep rest of path).\n";
t8 += "Home: pitch, pnpm add @rabjs/kit, client search over catalog, category cards, featured chunk/get/retry/debounce/groupBy.\n";
t8 += "ApiFunction: signature, summary, params, examples from catalog.\n";
t8 += "Playground: textarea prefilled with first @example; on Run, new Function with kit in scope from import * as kit from '@rabjs/kit'; show String(result) or thrown error. No Sandpack.\n";
t8 += "i18n en.ts/zh.ts; content markdown; api.zh.ts Record fallback to English JSDoc.\n";
t8 += "Skills page lists three skills, Use when lines, GitHub links to https://github.com/ximing/kit/blob/main/skills/...\n";
t8 += "Delete Docusaurus leftovers (docs, blog, i18n, docusaurus.config.ts, sidebars.ts, @docusaurus/*, react-live unless reused).\n";
t8 += "Run pnpm build and pnpm docs:build. website/dist/index.html must exist. No Docusaurus warnings.\n";
t8 += "Visual check: if a browser MCP exists, walk /, /api/array/chunk, /zh, and 375px viewport. Otherwise vite preview + curl and say what was not browser-verified in the summary.\n";
t8 += "Commit website/.\n";
let r8 = agent(t8, #{
    label: "task8-vite-docs",
    capability_mode: "all",
    output_schema: result_schema,
});
if agent_failed(r8) { failed("task8", fail_reason(r8)); }
log("Task8: " + summary_of(r8));

phase("Task9");
log("Task 9: CI and Changesets");
let t9 = "";
t9 += common_rules(repo, plan, spec, branch);
t9 += "\n## YOUR TASK: Task 9 — Changesets, CI, Pages, Dependabot\n";
t9 += "Read plan ### Task 9. Do NOT publish to npm. Do NOT merge to main.\n";
t9 += "Commit message: ci: add changesets release and replace legacy workflows\n";
t9 += "pnpm add -D @changesets/cli && changeset init. access public, baseBranch main, ignore website.\n";
t9 += "Write .changeset/v1-major.md as the plan (major bump copy).\n";
t9 += "Write .github/workflows/ci.yml with the plan's job steps (prettier, lint, typecheck, test, codecov fail_ci_if_error false, build, docs:catalog:check, website build).\n";
t9 += "Write release.yml as the plan (changesets/action, NPM_PUBLISH_TOKEN, publish pnpm publish --no-git-checks).\n";
t9 += "Rewrite deploy-docs.yml: push main (paths as plan) + workflow_dispatch; pnpm docs:build; upload website/dist; pnpm/action-setup@v4.\n";
t9 += "Dependabot weekly Asia/Shanghai directory /.\n";
t9 += "Delete: continuous-integration-workflow.yml, npm-publish-on-release.yml, tag-release-workflow.yml, scripts/release.js, auto-merge-dependabot-workflow.yml, lock-closed-issues-workflow.yml.\n";
t9 += "Dry-run: pnpm build && pnpm pack --dry-run. Tarball must contain dist/**, package.json, README.md, LICENSE and must NOT contain src/, website/, test/.\n";
t9 += "Commit.\n";
let r9 = agent(t9, #{
    label: "task9-ci",
    capability_mode: "all",
    output_schema: result_schema,
});
if agent_failed(r9) { failed("task9", fail_reason(r9)); }
log("Task9: " + summary_of(r9));

phase("Task10");
log("Task 10: integration gate");
let t10 = "";
t10 += common_rules(repo, plan, spec, branch);
t10 += "\n## YOUR TASK: Task 10 — Integration gate\n";
t10 += "Read plan ### Task 10. You are the final verifier AND gap-fixer on `" + branch + "`.\n";
t10 += "Do not merge. Do not publish. Do not implement from scratch if Tasks 1-9 are complete; only fix gaps.\n";
t10 += "Independently run (do not trust prior agents):\n";
t10 += "1. git log --oneline main.." + branch + " and git diff --stat main..." + branch + "\n";
t10 += "2. Confirm branch is `" + branch + "`\n";
t10 += "3. Full gate:\n";
t10 += "   pnpm install --frozen-lockfile\n";
t10 += "   pnpm prettier:check\n";
t10 += "   pnpm lint\n";
t10 += "   pnpm typecheck\n";
t10 += "   pnpm test\n";
t10 += "   pnpm build\n";
t10 += "   pnpm docs:catalog:check\n";
t10 += "   pnpm docs:build\n";
t10 += "4. API smoke: remove([1,2,3], n => n===2) is [2] and input still [1,2,3]. No default export on src/array/chunk.ts.\n";
t10 += "5. Coverage >= 90% all four metrics. If split files dropped coverage, add tests.\n";
t10 += "6. If public functions lack @example, add one and regen catalog.\n";
t10 += "7. Confirm: no export default in src; no Docusaurus; no jest.config; tsdown.config.ts exists; website is Vite; skills/ has three skills; .changeset/v1-major.md exists.\n";
t10 += "8. If you changed anything, commit: fix: close 1.0 verification gaps\n";
t10 += "ok=true ONLY if the full gate exits 0 after any fixes. Include failing command output in summary if ok=false.\n";
let r10 = agent(t10, #{
    label: "task10-gate",
    capability_mode: "all",
    output_schema: result_schema,
});
if agent_failed(r10) { failed("task10", fail_reason(r10)); }
log("Task10: " + summary_of(r10));

let report = "";
report += "# kit 1.0 modernization workflow result\n\n";
report += "Branch: `" + branch + "`\n\n";
report += "- Inspect: " + summary_of(inspect_r) + "\n";
report += "- Task1: " + summary_of(r1) + "\n";
report += "- Task2: " + summary_of(r2) + "\n";
report += "- Task3: " + summary_of(r3) + "\n";
report += "- Task4: " + summary_of(r4) + "\n";
report += "- Task5: " + summary_of(r5) + "\n";
report += "- Task6: " + summary_of(r6) + "\n";
report += "- Task7: " + summary_of(r7) + "\n";
report += "- Task8: " + summary_of(r8) + "\n";
report += "- Task9: " + summary_of(r9) + "\n";
report += "- Task10: " + summary_of(r10) + "\n";

let report_path = write_scratch_file("report.md", report);
complete(#{
    ok: true,
    branch: branch,
    report_path: report_path,
    summary: "Completed kit 1.0 modernization plan Tasks 1-10 on chore/v1-modernization.",
});
