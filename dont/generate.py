import os

structure = {
    "backend": {
        "app": {
            "api": {
                "routes": [
                    "orientation.py",
                    "empathize.py",
                    "define.py",
                    "upload.py"
                ],
                "__files__": ["deps.py"]
            },
            "core": ["config.py", "security.py"],
            "db": ["models.py", "schemas.py", "supabase_client.py"],
            "services": ["agent_runner.py", "file_processor.py", "document_generator.py"],
            "__files__": ["main.py"]
        },
        "__files__": ["requirements.txt"]
    },
    "frontend": {
        "components": [],
        "pages": [],
        "styles": [],
        "utils": []
    },
    "orchestration": {
        "agents": [],
        "prompts": [],
        "memory": [],
        "workflows": []
    },
    "__files__": ["README.md"]
}

def create_structure(base_path, tree):
    for name, content in tree.items():
        if name == "__files__":
            for filename in content:
                file_path = os.path.join(base_path, filename)
                open(file_path, 'a').close()
        else:
            dir_path = os.path.join(base_path, name)
            os.makedirs(dir_path, exist_ok=True)
            if isinstance(content, dict):
                create_structure(dir_path, content)
            elif isinstance(content, list):
                for filename in content:
                    file_path = os.path.join(dir_path, filename)
                    open(file_path, 'a').close()

if __name__ == "__main__":
    current_dir = os.path.dirname(os.path.abspath(__file__))
    create_structure(current_dir, structure)
