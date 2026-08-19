let meta = #{
    name: "kit-1-0-version-pr",
    description: "Open the Changesets version PR from changeset-release/main without publishing npm",
    when_to_use: "When changeset-release/main exists after a failed changesets/action PR create",
    phases: [
        #{ title: "OpenPR", detail: "gh pr create from changeset-release/main" },
    ],
};

let result_schema = #{
    "type": "object",
    "required": ["ok", "summary"],
    "properties": #{
        "ok": #{ "type": "boolean" },
        "summary": #{ "type": "string" },
        "url": #{ "type": "string" },
    },
};

phase("OpenPR");
log("Open Changesets version PR");
let p = "";
p += "You are opening the @rabjs/kit 1.0 Changesets version PR. Use tools (gh, git). Do not publish npm.\n";
p += "Repo: /Users/ximing/project/mygithub/kit (github.com/ximing/kit)\n";
p += "1. git fetch origin changeset-release/main main\n";
p += "2. If a PR from changeset-release/main into main already exists, return ok=true with its URL. Do not open a duplicate.\n";
p += "3. Otherwise create: gh pr create --base main --head changeset-release/main --title 'chore: version packages' --body $'Opens the Changesets 1.0.0 version bump that GitHub Actions could not create (repo disallows Actions creating PRs).\\n\\nMerging this PR versions @rabjs/kit to 1.0.0. The next push to main will publish to npm via changesets/action. Do not merge unless you want that publish.'\n";
p += "4. Do NOT merge the PR. Do NOT npm publish. Do NOT tag. Do NOT force-push main.\n";
p += "Return {ok, summary, url}. ok=false if gh cannot create the PR.\n";
let r = agent(p, #{
    label: "open-version-pr",
    capability_mode: "all",
    output_schema: result_schema,
});
if r == () || r.success != true || (r.output != () && r.output.ok == false) {
    let reason = "unknown failure";
    if r == () { reason = "agent slot empty"; }
    else if r.success != true { reason = "agent success=false"; }
    else if r.output != () && r.output.summary != () { reason = r.output.summary; }
    complete(#{ ok: false, failed_at: "open-pr", summary: reason });
}
let summary = "opened";
let url = "";
if r.output != () {
    if r.output.summary != () { summary = r.output.summary; }
    if r.output.url != () { url = r.output.url; }
}
let report = "# version PR\n\n" + summary + "\n\n" + url + "\n";
let path = write_scratch_file("report.md", report);
complete(#{ ok: true, summary: summary, url: url, report_path: path });
