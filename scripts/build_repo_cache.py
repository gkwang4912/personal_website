import json, subprocess, pathlib
from datetime import datetime, timezone

# 你要展示的 repo 清單：先放 1 個，成功後再加
REPOS = [
    ("gkwang4912", "VibeCodingLab"),
]

ROOT = pathlib.Path(__file__).resolve().parents[1]
OUT_BASE = ROOT / "repo-cache"
REPO_BASE = ROOT / "_repos"

def run(cmd, cwd=None):
    return subprocess.check_output(cmd, cwd=cwd, text=True).strip()

def build_tree_from_paths(paths):
    tree = {"type": "dir", "name": "", "children": {}}
    for p in paths:
        parts = [x for x in p.split("/") if x]
        node = tree
        for i, part in enumerate(parts):
            is_last = (i == len(parts) - 1)
            if is_last:
                node["children"].setdefault(part, {"type": "file", "name": part})
            else:
                node["children"].setdefault(part, {"type": "dir", "name": part, "children": {}})
                node = node["children"][part]
    return tree

def normalize_tree(node):
    if node["type"] == "dir":
        children = list(node["children"].values())
        children.sort(key=lambda x: (0 if x["type"] == "dir" else 1, x["name"].lower()))
        return {"type": "dir", "name": node["name"], "children": [normalize_tree(c) for c in children]}
    return node

def main():
    OUT_BASE.mkdir(parents=True, exist_ok=True)
    REPO_BASE.mkdir(parents=True, exist_ok=True)

    import markdown  # pip install markdown

    for owner, repo in REPOS:
        repo_dir = REPO_BASE / f"{owner}__{repo}"
        if not repo_dir.exists():
            raise SystemExit(f"Repo not found: {repo_dir}")

        out_dir = OUT_BASE / f"{owner}__{repo}"
        out_dir.mkdir(parents=True, exist_ok=True)

        # 1) 目錄樹：用 git ls-tree（不用打 GitHub API）
        paths = run(["git", "ls-tree", "-r", "--name-only", "HEAD"], cwd=repo_dir).splitlines()
        tree = normalize_tree(build_tree_from_paths(paths))
        (out_dir / "tree.json").write_text(json.dumps(tree, ensure_ascii=False, indent=2), encoding="utf-8")

        # 2) README：只抓根目錄 README.md（你也可以之後擴充）
        readme_md = repo_dir / "README.md"
        if readme_md.exists():
            md_text = readme_md.read_text(encoding="utf-8", errors="ignore")
            readme_html = markdown.markdown(md_text, extensions=["fenced_code", "tables"])
        else:
            readme_html = "<p><em>（找不到 README.md）</em></p>"

        (out_dir / "readme.html").write_text(readme_html, encoding="utf-8")

        meta = {
            "owner": owner,
            "repo": repo,
            "generated_at": datetime.now(timezone.utc).isoformat(),
            "head": run(["git", "rev-parse", "HEAD"], cwd=repo_dir),
        }
        (out_dir / "meta.json").write_text(json.dumps(meta, ensure_ascii=False, indent=2), encoding="utf-8")

if __name__ == "__main__":
    main()
