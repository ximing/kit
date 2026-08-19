let meta = #{
    name: "kit-1-0-followups",
    description: "Create GitHub Release v1.0.0, land parser 8.52, commit leftover workflow files",
    when_to_use: "After kit 1.0.0 is on npm and remaining chores should land on main",
    phases: [
        #{ title: "Release", detail: "gh release v1.0.0 at 6ca6c5b" },
        #{ title: "Parser", detail: "close stale PR 8, bump parser on main" },
        #{ title: "Workflows", detail: "commit leftover .grok/workflows rhai files" },
    ],
};

let result_schema = #{
    "type": "object",
    "required": ["ok", "summary"],
    "properties": #{
        "ok": #{ "type": "boolean" },
        "summary": #{ "type": "string" },
        "url": #{ "type": "string" },
        "sha": #{ "type": "string" },
    },
};

fn failed(step, reason) {
    complete(#{ ok: false, failed_at: step, summary: reason });
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

let repo = "/Users/ximing/project/mygithub/kit";

phase("Release");
log("Create GitHub Release v1.0.0");
let p1 = "";
p1 += "You create the missing GitHub Release for @rabjs/kit 1.0.0. Use tools (gh, git, read_file). Do not npm publish.\n";
p1 += "Repo: " + repo + " (github.com/ximing/kit)\n";
p1 += "1. If gh release view v1.0.0 already exists, return ok=true skipped with its URL.\n";
p1 += "2. Target commit MUST be 6ca6c5bcb28dbf91629725743c26b89d998a8a7a (Merge pull request #10). Do not tag a later chore commit as v1.0.0.\n";
p1 += "3. Read CHANGELOG.md [1.0.0] section for notes.\n";
p1 += "4. Create: gh release create v1.0.0 6ca6c5bcb28dbf91629725743c26b89d998a8a7a --title v1.0.0 --notes from that changelog (include npm link https://www.npmjs.com/package/@rabjs/kit ). Latest should become v1.0.0.\n";
p1 += "5. Do not force-delete other tags. Do not publish npm. Do not merge unrelated PRs.\n";
p1 += "Return {ok, summary, url of the release}.\n";
let r1 = agent(p1, #{
    label: "gh-release-1-0-0",
    capability_mode: "all",
    output_schema: result_schema,
});
if agent_failed(r1) { failed("release", fail_reason(r1)); }
log("Release: " + summary_of(r1));

phase("Parser");
log("Replace conflicting Dependabot PR 8 with a fresh bump");
let p2 = "";
p2 += "You land @typescript-eslint/parser 8.52.0 on kit main. Use tools. Do not npm publish. Do not bump package.json version.\n";
p2 += "Repo: " + repo + "\n";
p2 += "Facts: PR 8 is OPEN but CONFLICTING against 1.0 main (package.json was rewritten). Lockfile currently pins parser 8.51.0. package.json has ^8.18.2.\n";
p2 += "Do ALL of this:\n";
p2 += "1. gh pr close 8 --comment 'Superseded: 1.0 rewrote package.json so this Dependabot branch conflicts. Landing parser 8.52.0 on current main instead.'\n";
p2 += "   If already closed, skip close.\n";
p2 += "2. git fetch origin main && git checkout main && git pull --ff-only origin main\n";
p2 += "3. Branch chore/eslint-parser-8.52.0 from main.\n";
p2 += "4. pnpm add -D @typescript-eslint/parser@8.52.0\n";
p2 += "   Also bump @typescript-eslint/eslint-plugin to 8.52.0 so parser/plugin stay paired.\n";
p2 += "5. Run pnpm lint. Fix only if the bump caused lint failures.\n";
p2 += "6. Commit: build(deps-dev): bump typescript-eslint parser and plugin to 8.52.0\n";
p2 += "7. Push the branch and gh pr create against main, then gh pr merge --merge --delete-branch.\n";
p2 += "   If merge is blocked only by missing reviews, still merge if you have permission. If tests fail, ok=false, do not --admin over red CI.\n";
p2 += "8. Do not change library source. Do not add a changeset (this is a devDependency chore, not a 1.0.1 publish).\n";
p2 += "Return {ok, summary, url of the new PR if any, sha of main after merge}.\n";
let r2 = agent(p2, #{
    label: "parser-8-52",
    capability_mode: "all",
    output_schema: result_schema,
});
if agent_failed(r2) { failed("parser", fail_reason(r2)); }
log("Parser: " + summary_of(r2));

phase("Workflows");
log("Commit leftover rhai workflow files");
let p3 = "";
p3 += "You commit leftover kit orchestration workflows. Use tools. Do not npm publish.\n";
p3 += "Repo: " + repo + "\n";
p3 += "1. git checkout main && git pull --ff-only origin main\n";
p3 += "2. Untracked files expected: .grok/workflows/kit-1-0-merge-version.rhai and kit-1-0-version-pr.rhai (and kit-1-0-followups.rhai if present).\n";
p3 += "3. git add only .grok/workflows/*.rhai . Do not add session dirs.\n";
p3 += "4. If nothing new to commit, ok=true skipped.\n";
p3 += "5. Else commit: chore: add remaining kit 1.0 orchestration workflows\n";
p3 += "   Push origin main with a regular fast-forward push. Never --force main.\n";
p3 += "Return {ok, summary, sha}.\n";
let r3 = agent(p3, #{
    label: "commit-workflows",
    capability_mode: "all",
    output_schema: result_schema,
});
if agent_failed(r3) { failed("workflows", fail_reason(r3)); }
log("Workflows: " + summary_of(r3));

let report = "";
report += "# kit 1.0 followups\n\n";
report += "- Release: " + summary_of(r1) + "\n";
report += "- Parser: " + summary_of(r2) + "\n";
report += "- Workflows: " + summary_of(r3) + "\n";
let path = write_scratch_file("report.md", report);
complete(#{
    ok: true,
    summary: "Created v1.0.0 GitHub Release, landed parser 8.52, committed leftover workflows.",
    report_path: path,
});
