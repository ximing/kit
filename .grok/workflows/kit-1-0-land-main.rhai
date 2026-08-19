let meta = #{
    name: "kit-1-0-land-main",
    description: "Finish remaining 1.0 landing work, merge chore/v1-modernization into main, push, close obsolete Dependabot PRs",
    when_to_use: "When the kit 1.0 modernization branch is green and should be merged to main without pausing for confirmation",
    phases: [
        #{ title: "Cleanup", detail: "commit leftover workflow files on the feature branch" },
        #{ title: "Merge", detail: "fast-forward main to the feature branch" },
        #{ title: "Verify", detail: "full gate on main after merge" },
        #{ title: "Push", detail: "push origin main" },
        #{ title: "Dependabot", detail: "close obsolete Dependabot PRs" },
    ],
};

let result_schema = #{
    "type": "object",
    "required": ["ok", "summary"],
    "properties": #{
        "ok": #{ "type": "boolean" },
        "summary": #{ "type": "string" },
        "sha": #{ "type": "string" },
        "branch": #{ "type": "string" },
        "skipped": #{ "type": "boolean" },
        "files": #{
            "type": "array",
            "items": #{ "type": "string" },
        },
    },
};

let repo = "/Users/ximing/project/mygithub/kit";
let feature = "chore/v1-modernization";
let base = "main";

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

phase("Cleanup");
log("Commit leftover workflow files on " + feature);
let p1 = "";
p1 += "You are landing leftover files for @rabjs/kit 1.0. Use tools. Do not answer from memory.\n";
p1 += "Repo: " + repo + "\n";
p1 += "Feature branch: `" + feature + "`\n";
p1 += "Do ALL of this:\n";
p1 += "1. cd to the repo. git checkout " + feature + "\n";
p1 += "2. git status. The only expected leftover is untracked `.grok/workflows/*.rhai`.\n";
p1 += "3. Add ONLY `.grok/workflows/*.rhai` (kit-1-0-modernization.rhai and kit-1-0-land-main.rhai if present). Do not add session dirs, scratch, or node_modules.\n";
p1 += "4. If those files are already committed, return ok=true skipped=true.\n";
p1 += "5. If there are other dirty tracked files that belong to 1.0, include them. Do not revert product commits.\n";
p1 += "6. Commit: chore: add kit 1.0 orchestration workflows\n";
p1 += "7. Do NOT checkout main. Do NOT merge. Do NOT push. Do NOT publish npm.\n";
p1 += "Return {ok, summary, sha, branch, skipped, files}. ok=false if commit failed.\n";
let r1 = agent(p1, #{
    label: "cleanup-workflows",
    capability_mode: "all",
    output_schema: result_schema,
});
if agent_failed(r1) { failed("cleanup", fail_reason(r1)); }
log("Cleanup: " + summary_of(r1));

phase("Merge");
log("Fast-forward " + base + " to " + feature);
let p2 = "";
p2 += "You are merging the kit 1.0 branch into main. Use tools. The human already approved merging to main with no further confirmation.\n";
p2 += "Repo: " + repo + "\n";
p2 += "Do ALL of this:\n";
p2 += "1. cd to the repo. Working tree should be clean except ignored files.\n";
p2 += "2. git checkout " + feature + " && git log --oneline -3\n";
p2 += "3. git checkout " + base + "\n";
p2 += "4. Merge with fast-forward only:\n";
p2 += "   git merge --ff-only " + feature + "\n";
p2 += "   If ff-only fails because main moved, do NOT rebase onto origin blindly. Fetch origin main, then if local main equals origin/main, merge --no-ff " + feature + " with message 'Merge branch " + feature + "'. If local main diverged from origin/main with unrelated commits, ok=false and stop.\n";
p2 += "5. Confirm HEAD of main contains commit cbfdd4c or a later 1.0 commit (tsdown.config.ts exists, website/vite.config.ts exists).\n";
p2 += "6. Do NOT push yet. Do NOT publish npm. Do NOT delete " + feature + ".\n";
p2 += "Return {ok, summary, sha of main HEAD, branch: main}. ok=false if merge did not land 1.0 files on main.\n";
let r2 = agent(p2, #{
    label: "merge-main",
    capability_mode: "all",
    output_schema: result_schema,
});
if agent_failed(r2) { failed("merge", fail_reason(r2)); }
log("Merge: " + summary_of(r2));

phase("Verify");
log("Full gate on main after merge");
let p3 = "";
p3 += "You are the post-merge verifier for @rabjs/kit on main. Use tools. Do not trust earlier agents.\n";
p3 += "Repo: " + repo + "\n";
p3 += "1. Confirm git branch --show-current is main.\n";
p3 += "2. Run the full gate and require every command exit 0:\n";
p3 += "   pnpm install --frozen-lockfile\n";
p3 += "   pnpm prettier:check\n";
p3 += "   pnpm lint\n";
p3 += "   pnpm typecheck\n";
p3 += "   pnpm test\n";
p3 += "   pnpm build\n";
p3 += "   pnpm docs:catalog:check\n";
p3 += "   pnpm docs:build\n";
p3 += "3. Smoke: from dist/index.mjs, remove([1,2,3], n=>n===2) is [2] and input stays [1,2,3]. src/array/chunk.ts has no default export.\n";
p3 += "4. Coverage must stay >= 90% statements/branches/functions/lines.\n";
p3 += "5. If the gate fails, do NOT push. You may fix and commit on main ONLY if the fix is a merge-induced gap (prettier/catalog). Prefer fixing on " + feature + " and merging again if the failure is real product code. Report the failing command in summary and ok=false if still red.\n";
p3 += "6. Do NOT push. Do NOT publish npm.\n";
p3 += "Return {ok, summary, sha}. ok=true only if the full gate exited 0.\n";
let r3 = agent(p3, #{
    label: "verify-main",
    capability_mode: "all",
    output_schema: result_schema,
});
if agent_failed(r3) { failed("verify", fail_reason(r3)); }
log("Verify: " + summary_of(r3));

phase("Push");
log("Push origin main");
let p4 = "";
p4 += "You are pushing kit 1.0 main to origin. Use tools.\n";
p4 += "Repo: " + repo + "\n";
p4 += "1. Confirm current branch is main and the post-merge gate already passed (tsdown.config.ts present, git log shows 1.0 commits).\n";
p4 += "2. git push origin main\n";
p4 += "   Use a regular push, never --force or --force-with-lease unless origin/main is strictly behind and a lease is required for a rewind you must NOT do. Do not force-push main.\n";
p4 += "3. Optionally also git push -u origin " + feature + " so the feature branch exists remotely. Do not delete the local feature branch.\n";
p4 += "4. Do NOT npm publish. Do NOT merge a Changesets version PR. Do NOT tag a release.\n";
p4 += "5. If push is rejected (auth/network/non-fast-forward), ok=false with the remote error. Do not rewrite history to force it through.\n";
p4 += "Return {ok, summary, sha of origin/main if you can read it}. \n";
let r4 = agent(p4, #{
    label: "push-main",
    capability_mode: "all",
    output_schema: result_schema,
});
if agent_failed(r4) { failed("push", fail_reason(r4)); }
log("Push: " + summary_of(r4));

phase("Dependabot");
log("Close obsolete Dependabot PRs");
let p5 = "";
p5 += "You are closing obsolete Dependabot PRs after kit 1.0 landed on main. Use gh. Use tools.\n";
p5 += "Repo: " + repo + " (github.com/ximing/kit)\n";
p5 += "The 1.0 branch replaced Rollup, Jest, and Docusaurus. Website now uses React 19 via Vite.\n";
p5 += "Close these OPEN PRs (and any equivalent Dependabot PRs you find for the same packages) with a comment that 1.0 removed the old stack:\n";
p5 += "- PR 9 rollup\n";
p5 += "- PR 7 eslint-plugin-jest\n";
p5 += "- PR 6 react (old Docusaurus react 18 bump)\n";
p5 += "- PR 5 react-dom (old Docusaurus react-dom 18 bump)\n";
p5 += "Also close if still open: ts-morph, @types/node 25, rimraf Dependabot PRs (plan: superseded / already merged / not needed).\n";
p5 += "DO NOT close PR 8 @typescript-eslint/parser unless you verify the parser is no longer a dependency (it still is). Leave typescript-5.9.3 alone if it is still a useful bump.\n";
p5 += "Comment on each closed PR, e.g. 'Superseded by chore/v1-modernization on main (tsdown/vitest/vite; this dependency is gone or already updated).'\n";
p5 += "If a PR is already closed, skip. If gh auth fails, ok=false.\n";
p5 += "Do not merge those PRs. Do not publish npm.\n";
p5 += "Return {ok, summary} listing closed PR numbers.\n";
let r5 = agent(p5, #{
    label: "close-dependabot",
    capability_mode: "all",
    output_schema: result_schema,
});
if agent_failed(r5) { failed("dependabot", fail_reason(r5)); }
log("Dependabot: " + summary_of(r5));

let report = "";
report += "# kit 1.0 land-main result\n\n";
report += "- Cleanup: " + summary_of(r1) + "\n";
report += "- Merge: " + summary_of(r2) + "\n";
report += "- Verify: " + summary_of(r3) + "\n";
report += "- Push: " + summary_of(r4) + "\n";
report += "- Dependabot: " + summary_of(r5) + "\n";

let report_path = write_scratch_file("report.md", report);
complete(#{
    ok: true,
    branch: "main",
    report_path: report_path,
    summary: "Merged kit 1.0 onto main, verified, pushed, closed obsolete Dependabot PRs. Did not publish npm.",
});
