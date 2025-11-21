import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
import tempfile
import os
import subprocess
import urllib.request
import json

# ---------------- Config ----------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DISTRO_NAME = "WSL-Lite"
DISTRO_PATH = os.path.join(BASE_DIR, "distros", DISTRO_NAME)
TAR_NAME = "alpine-minirootfs.tar.gz"
TAR_PATH = os.path.join(BASE_DIR, TAR_NAME)
PROFILE_FILE = os.path.join(BASE_DIR, "profiles.json")

ALPINE_URL = (
    "https://dl-cdn.alpinelinux.org/alpine/v3.20/releases/x86_64/"
    "alpine-minirootfs-3.20.3-x86_64.tar.gz"
)

# ---------------- Default Safe Profiles ----------------
SAFE_PROFILES = {
    # --- 🧰 Basic command-line environment ---
    "cli-lite": [
        "bash", "curl", "git", "nano", "vim", "wget",
        "zip", "unzip", "tar", "coreutils", "grep", "sed", "less",
        "python3", "py3-pip", "py3-setuptools", "gawk"
    ],

    # --- 💻 Developer tools (C/C++, Node, Python) ---
    "dev-lite": [
        "bash", "curl", "git", "nano", "vim", "wget",
        "zip", "unzip", "tar", "sudo", "build-base", "make", "cmake",
        "gcc", "g++", "musl-dev",
        "python3", "py3-pip", "py3-setuptools", "py3-virtualenv",
        "nodejs", "npm", "openssh"
    ],

    # --- 📊 Lightweight data environment (Python scientific) ---
    "data-lite": [
        "bash", "curl", "git", "nano", "wget", "tar", "zip", "unzip", "sudo",
        "python3", "py3-pip", "py3-setuptools",
        "py3-numpy", "py3-pandas", "py3-matplotlib", "py3-psutil"
    ],
}

# ---------------- Helper Functions ----------------
def load_profiles():
    """Load profiles from JSON file (or fall back to defaults)."""
    global SAFE_PROFILES
    if os.path.exists(PROFILE_FILE):
        with open(PROFILE_FILE, "r") as f:
            SAFE_PROFILES = json.load(f)
    else:
        save_profiles()

def save_profiles():
    """Save profiles to JSON file."""
    with open(PROFILE_FILE, "w") as f:
        json.dump(SAFE_PROFILES, f, indent=4)

def ensure_wsl_ready():
    """Ensure WSL-Lite is imported before applying profiles."""
    result = subprocess.run(["wsl", "-l"], capture_output=True, text=True)
    if DISTRO_NAME not in result.stdout:
        print(f"⚙️ WSL-Lite not found — importing automatically...")
        download_alpine()
        create_dirs()
        import_wsl()

def run_wsl_command(command):
    """Run a WSL command with live output."""
    print(f"⚙️ Running inside WSL: {command}")
    process = subprocess.Popen(
        ["wsl", "-d", DISTRO_NAME, "--", "sh", "-c", command],
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        bufsize=1
    )
    for line in process.stdout:
        print(line, end="")
    process.wait()
    if process.returncode != 0:
        raise subprocess.CalledProcessError(process.returncode, command)

def download_alpine():
    os.makedirs(BASE_DIR, exist_ok=True)
    if not os.path.exists(TAR_PATH):
        print("📦 Downloading Alpine minirootfs...")
        urllib.request.urlretrieve(ALPINE_URL, TAR_PATH)
        print("✅ Download complete.")
    else:
        print("✔️ Alpine tarball already exists.")

def create_dirs():
    os.makedirs(DISTRO_PATH, exist_ok=True)
    print(f"📁 Created distro folder: {DISTRO_PATH}")

def import_wsl():
    print("🚀 Importing WSL-Lite distro...")
    subprocess.run(["wsl", "--import", DISTRO_NAME, DISTRO_PATH, TAR_PATH], check=True)
    print("✅ WSL-Lite imported successfully!")

def add_and_apply_custom_profile(profile_name, packages=None):
    """Add or apply one of the predefined safe profiles."""
    ensure_wsl_ready()
    load_profiles()

    if not packages and profile_name in SAFE_PROFILES:
        packages = SAFE_PROFILES[profile_name]
        print(f"🧩 Using predefined profile '{profile_name}'")
    elif not packages:
        raise ValueError(f"Profile '{profile_name}' not found and no custom packages provided.")

    SAFE_PROFILES[profile_name] = packages
    save_profiles()

    print(f"✅ Created or updated profile '{profile_name}' with packages: {', '.join(packages)}")

    # Install inside WSL
    print("\n🚀 Installing selected packages into WSL-Lite...")
    run_wsl_command("apk update")
    run_wsl_command("apk add --no-cache " + " ".join(packages))
    print(f"✅ Profile '{profile_name}' applied successfully!")

    setup_auto_neofetch()

def setup_auto_neofetch():
    print("🎨 Setting up custom WSL-Lite logo and system info...")

    safe_script = r'''
apk add --no-cache neofetch >/dev/null 2>&1 || true
mkdir -p /root/.config/neofetch /etc/profile.d

cat <<'EOF' > /root/.wsl_lite_ascii
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣖⣤⣶⣶⣿⠟⠉⠉⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⣠⠀⠀⢀⣴⣿⣿⣿⣿⣿⣿⣷⣶⣶⣦⣤⣀⠀⠀⠀⠀
⠀⠀⠀⢰⣿⣶⣾⣿⣿⣿⣿⣿⣿⡿⠿⣿⣿⣿⣿⣯⣍⠁⠀⠀⠀
⠀⠀⠀⠹⣿⠻⡅⠀⣠⠉⣹⣿⠿⠛⠃⠀⢹⣿⣿⣿⣿⣷⣄⠀⠀
⠀⠀⠀⢰⣄⣠⣴⠟⠁⢀⣿⠁⠀⠀⠀⣠⣿⣿⣿⣿⣿⣏⠉⠓⠀
⠀⠀⠀⠰⢿⡿⠋⠐⠿⣿⡿⣋⣤⣶⣿⣿⣿⣿⠏⣼⣿⣿⣇⠀⠀
⠀⠀⠀⢀⣠⣴⣶⠞⣠⣶⣿⣿⣿⣿⣿⡿⠋⣡⣾⣿⡿⠈⢿⠀⠀
⠀⠀⢈⣽⣿⠏⣰⣿⣿⣿⣿⣿⠟⠉⠀⠰⠚⠋⢁⣿⠃⠀⠀⢸⠀
⠀⢠⣿⣿⢃⣼⣿⣿⣿⣿⠏⠀⡀⠀⠀⠀⠀⠀⠞⠁⠀⠀⢠⣿⠁
⠠⠟⣾⡏⣼⣿⣿⣿⣿⠃⣠⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⡟⠀
⠀⠀⢹⡇⣿⣿⣿⣿⣿⠀⣿⣿⣷⣄⣀⠀⢀⣀⣠⣴⣿⣿⠟⠀⠀
⠀⠀⠀⠃⢻⣿⣿⣿⣿⣆⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣟⣁⣤⡶⠃
⠀⠀⠀⠀⠀⢯⠘⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠿⠛⠁⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠙⠻⢿⣿⣿⣿⣿⣿⣷⡶⠶⠂⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀
EOF

cat <<'EOF' > /etc/profile.d/00-wsl-lite-banner.sh
#!/bin/sh
clear
echo ""
echo "           W S L - L I T E          "
cat /root/.wsl_lite_ascii
echo ""

if command -v neofetch >/dev/null 2>&1; then
    neofetch --off --stdout | grep -E "OS:|Kernel:|Uptime:|Packages:|Shell:|Memory:|CPU:"
else
    echo "OS        : Alpine Linux (WSL-Lite)"
    echo "Kernel    : $(uname -r)"
    echo "Uptime    : $(uptime -p 2>/dev/null)"
    echo "Memory    : $(free -m | awk '/Mem/ {print $3 \"MB / \" $2 \"MB\"}')"
    echo "Shell     : $SHELL"
fi

echo ""
EOF

chmod +x /etc/profile.d/00-wsl-lite-banner.sh
'''
    run_wsl_command(safe_script)
    print("✅ Custom ASCII logo + system stats banner installed!")

def main():
    ensure_wsl_ready()
    setup_auto_neofetch()
    print(f"\n🎉 All done! Launch WSL-Lite using:\n   wsl -d {DISTRO_NAME}\n")
    print("You’ll now see your custom ASCII logo + system info automatically 🚀")

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "--custom-profile":
        profile_name = sys.argv[2]
        packages = sys.argv[3:] if len(sys.argv) > 3 else None
        add_and_apply_custom_profile(profile_name, packages)
    else:
        main()


