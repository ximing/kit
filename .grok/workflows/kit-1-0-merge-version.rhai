let meta = #{
    name: "kit-1-0-merge-version",
    description: "Merge the Changesets 1.0 version PR into main and confirm package version",
    when_to_use: "When the human has approved merging https://github.com/ximing/kit/pull/10",
    phases: [
        #{ title: "Merge", detail: "gh pr merge 10 into main" },
        #{ title: "Verify", detail: "main is 1.0.0; report Release run" },
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
        "version": #{ "type": "string" },
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

phase("Merge");
log("Merge PR 10");
let p1 = "";
p1 += "You are merging GitHub PR 10 for @rabjs/kit. The human said 合入 — merge it now. Use tools (gh, git).\n";
p1 += "Repo: /Users/ximing/project/mygithub/kit  (github.com/ximing/kit)\n";
p1 += "PR: https://github.com/ximing/kit/pull/10  (changeset-release/main -> main, chore: version packages)\n";
p1 += "Do ALL of this:\n";
p1 += "1. gh pr view 10 --json state,mergeable,statusCheckRollup\n";
p1 += "2. If already MERGED, return ok=true skipped, do not remake commits.\n";
p1 += "3. If OPEN and mergeable, merge with: gh pr merge 10 --merge --delete-branch\n";
p1 += "   Do not squash (keep the version commit). Do not force-push main.\n";
p1 += "4. If merge is blocked only by pending/skipped checks, retry gh pr merge 10 --merge --delete-branch. If still blocked by required checks that are failing tests, ok=false and do not --admin.\n";
p1 += "   If blocked only by missing reviews and you have rights, still try a normal merge first.\n";
p1 += "5. Do not npm publish yourself. Do not tag yourself. GitHub Release workflow may publish after the merge — that is expected.\n";
p1 += "Return {ok, summary, url of the PR, sha if known}.\n";
let r1 = agent(p1, #{
    label: "merge-pr-10",
    capability_mode: "all",
    output_schema: result_schema,
});
if agent_failed(r1) { failed("merge", fail_reason(r1)); }
log("Merge: " + summary_of(r1));

phase("Verify");
log("Confirm main is 1.0.0");
let p2 = "";
p2 += "You verify that @rabjs/kit main is 1.0.0 after PR 10 merged. Use tools. Do not publish npm yourself.\n";
p2 += "Repo: /Users/ximing/project/mygithub/kit\n";
p2 += "1. git fetch origin main && git checkout main && git pull --ff-only origin main\n";
p2 += "2. Read package.json version. It MUST be 1.0.0. Confirm .changeset/v1-major.md is gone.\n";
p2 += "3. gh pr view 10 --json state,mergedAt,mergeCommit\n";
p2 += "4. gh run list --branch main --limit 8 --json name,conclusion,status,url,displayTitle,headSha\n";
p2 += "   Report the Release / CI / Deploy Documentation runs for the merge commit. If Release is in progress, say so. If Release already failed, include the failure URL and a one-line reason from gh run view --log-failed (do not retry-publish).\n";
p2 += "5. Do not create extra commits. Do not tag. Do not npm publish.\n";
p2 += "Return {ok, summary, sha of origin/main, version, url of PR 10}. ok=true only if PR is MERGED and package.json version is 1.0.0. Release workflow failure does not make ok=false if the merge itself landed 1.0.0 — mention it in summary.\n";
let r2 = agent(p2, #{
    label: "verify-1-0-0",
    capability_mode: "all",
    output_schema: result_schema,
});
if agent_failed(r2) { failed("verify", fail_reason(r2)); }
log("Verify: " + summary_of(r2));

let report = "";
report += "# merge version PR\n\n";
report += "- Merge: " + summary_of(r1) + "\n";
report += "- Verify: " + summary_of(r2) + "\n";
let path = write_scratch_file("report.md", report);
complete(#{
    ok: true,
    summary: "Merged PR 10; main is 1.0.0.",
    report_path: path,
});
