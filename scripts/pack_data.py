
import os
import json
import csv

# Configuration
REPO_CACHE_DIR = "repo-cache"
EXPERIENCE_FILE = "experience.csv"
OUTPUT_FILE = "data.js"

def load_file_content(path):
    if not os.path.exists(path):
        return None
    try:
        with open(path, "r", encoding="utf-8") as f:
            return f.read()
    except Exception as e:
        print(f"Error reading {path}: {e}")
        return None

def main():
    print("Starting data packing...")
    
    site_data = {
        "experience": None,
        "projects": None,
        "repo_files": {}
    }

    # 1. Load Experience CSV
    print(f"Loading {EXPERIENCE_FILE}...")
    site_data["experience"] = load_file_content(EXPERIENCE_FILE)

    # 2. Load Project List
    project_json_path = os.path.join(REPO_CACHE_DIR, "project.json")
    print(f"Loading {project_json_path}...")
    project_json_content = load_file_content(project_json_path)
    
    if project_json_content:
        site_data["projects"] = json.loads(project_json_content)
        
        # 3. Load Project Files
        if "repos" in site_data["projects"]:
            for repo in site_data["projects"]["repos"]:
                slug = repo.get("slug")
                if not slug:
                    continue
                
                print(f"Processing {slug}...")
                
                # Paths to fetch
                files_to_cache = {
                    "readme": os.path.join(REPO_CACHE_DIR, slug, "readme.html"),
                    "meta": os.path.join(REPO_CACHE_DIR, slug, "meta.json"),
                    "tree": os.path.join(REPO_CACHE_DIR, slug, "tree.json")
                }

                site_data["repo_files"][slug] = {}

                for key, path in files_to_cache.items():
                    content = load_file_content(path)
                    if content:
                        if key in ["meta", "tree"]:
                            try:
                                site_data["repo_files"][slug][key] = json.loads(content)
                            except json.JSONDecodeError:
                                print(f"Invalid JSON in {path}")
                        else:
                            site_data["repo_files"][slug][key] = content

    # 4. Write to data.js
    print(f"Writing to {OUTPUT_FILE}...")
    js_content = f"window.SITE_DATA = {json.dumps(site_data, ensure_ascii=False)};"
    
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write(js_content)
    
    print("Done!")

if __name__ == "__main__":
    main()
