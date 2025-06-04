import os

# === Configuration ===
EXCLUDED_DIRS = {"__pycache__", ".git", "venv", "node_modules", "public",".idea", ".vscode"}
EXCLUDED_FILES = {"environment.yml", "requirements.txt", ".env", "project_documentation.md", "generate.py","run.py", "package-lock.json","README.md" }
OUTPUT_FILE = "project_documentation.md"

def get_folder_tree(path, prefix=""):
    lines = []
    items = sorted(os.listdir(path))
    for idx, item in enumerate(items):
        if item in EXCLUDED_DIRS or item in EXCLUDED_FILES:
            continue
        full_path = os.path.join(path, item)
        connector = "├── " if idx < len(items) - 1 else "└── "
        if os.path.isdir(full_path):
            lines.append(f"{prefix}{connector}{item}/")
            extension = "│   " if idx < len(items) - 1 else "    "
            lines.extend(get_folder_tree(full_path, prefix + extension))
        else:
            lines.append(f"{prefix}{connector}{item}")
    return lines

def collect_code_blocks(base_path):
    blocks = []
    for root, dirs, files in os.walk(base_path):
        dirs[:] = [d for d in dirs if d not in EXCLUDED_DIRS]
        for file in sorted(files):
            if file in EXCLUDED_FILES:
                continue
            abs_path = os.path.join(root, file)
            rel_path = os.path.relpath(abs_path, base_path)
            try:
                with open(abs_path, "r", encoding="utf-8") as f:
                    code = f.read().strip()
                if code:
                    blocks.append(f"## 📄 Code in `{rel_path}`\n```code\n{code}\n```\n")
            except Exception as e:
                blocks.append(f"## 📄 Code in `{rel_path}`\n⚠️ Error reading file: {e}\n")
    return blocks

def generate_documentation(base_path):
    lines = ["# 📁 Folder Structure\n"]
    lines.extend(get_folder_tree(base_path))
    lines.append("\n# 🧾 File Contents\n")
    lines.extend(collect_code_blocks(base_path))

    output_path = os.path.join(base_path, OUTPUT_FILE)
    with open(output_path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))
    print(f"✅ Documentation generated: {output_path}")

if __name__ == "__main__":
    current_dir = os.path.dirname(os.path.abspath(__file__))
    generate_documentation(current_dir)
