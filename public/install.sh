#!/usr/bin/env sh
# Sirr install script
# Usage:
#   curl -fsSL https://get.sirr.dev | sh              # installs both sirrd + sirr
#   curl -fsSL https://get.sirr.dev | sh -s -- sirrd  # server only
#   curl -fsSL https://get.sirr.dev | sh -s -- sirr   # CLI only
#
# Binaries are installed to /usr/local/bin (or ~/bin if not writable).
# Supported: macOS (arm64/x64), Linux (arm64/x64)

set -eu

REPO="sirrlock/sirr"
INSTALL_DIR="/usr/local/bin"

# ── helpers ───────────────────────────────────────────────────────────────────

say()  { printf "\033[1m%s\033[0m\n" "$*"; }
ok()   { printf "\033[32m✓\033[0m %s\n" "$*"; }
err()  { printf "\033[31merror:\033[0m %s\n" "$*" >&2; exit 1; }
need() { command -v "$1" >/dev/null 2>&1 || err "required command not found: $1"; }

# ── detect OS + arch ──────────────────────────────────────────────────────────

detect_platform() {
  os=$(uname -s)
  arch=$(uname -m)

  case "$os" in
    Darwin) os_name="darwin" ;;
    Linux)  os_name="linux" ;;
    *)      err "unsupported OS: $os (Windows: use Scoop — scoop install sirrlock/sirrd)" ;;
  esac

  case "$arch" in
    x86_64|amd64) arch_name="x64" ;;
    arm64|aarch64) arch_name="arm64" ;;
    *) err "unsupported architecture: $arch" ;;
  esac

  PLATFORM="${os_name}-${arch_name}"
}

# ── pick install dir ──────────────────────────────────────────────────────────

pick_install_dir() {
  if [ -w "$INSTALL_DIR" ] || sudo -n true 2>/dev/null; then
    : # use /usr/local/bin
  else
    INSTALL_DIR="$HOME/bin"
    mkdir -p "$INSTALL_DIR"
    case ":$PATH:" in
      *":$INSTALL_DIR:"*) ;;
      *) say "note: add $INSTALL_DIR to your PATH" ;;
    esac
  fi
}

# ── fetch latest version tag ──────────────────────────────────────────────────

latest_version() {
  url="https://api.github.com/repos/${REPO}/releases/latest"
  if command -v curl >/dev/null 2>&1; then
    curl -fsSL "$url" | grep '"tag_name"' | sed 's/.*"tag_name": *"\([^"]*\)".*/\1/'
  elif command -v wget >/dev/null 2>&1; then
    wget -qO- "$url" | grep '"tag_name"' | sed 's/.*"tag_name": *"\([^"]*\)".*/\1/'
  else
    err "curl or wget is required"
  fi
}

# ── download and install one binary ──────────────────────────────────────────

install_binary() {
  binary="$1"   # sirrd or sirr
  version="$2"  # e.g. v1.0.23

  ext="tar.gz"
  archive="${binary}-${PLATFORM}.${ext}"
  url="https://github.com/${REPO}/releases/download/${version}/${archive}"
  tmp=$(mktemp -d)

  say "downloading ${binary} ${version} (${PLATFORM})..."

  if command -v curl >/dev/null 2>&1; then
    curl -fsSL "$url" -o "${tmp}/${archive}" || err "download failed: $url"
  else
    wget -qO "${tmp}/${archive}" "$url" || err "download failed: $url"
  fi

  tar -xzf "${tmp}/${archive}" -C "$tmp"
  chmod +x "${tmp}/${binary}"

  dest="${INSTALL_DIR}/${binary}"
  if [ -w "$INSTALL_DIR" ]; then
    mv "${tmp}/${binary}" "$dest"
  else
    sudo mv "${tmp}/${binary}" "$dest"
  fi

  rm -rf "$tmp"
  ok "installed ${binary} → ${dest}"
}

# ── main ──────────────────────────────────────────────────────────────────────

main() {
  # parse optional argument: sirrd | sirr | (empty = both)
  target="${1:-both}"
  case "$target" in
    sirrd|sirr|both) ;;
    *) err "unknown target '$target' — use: sirrd, sirr, or omit for both" ;;
  esac

  need "tar"
  detect_platform
  pick_install_dir

  version=$(latest_version)
  [ -n "$version" ] || err "could not determine latest version"

  say "installing sirr ${version}"

  case "$target" in
    sirrd) install_binary sirrd "$version" ;;
    sirr)  install_binary sirr  "$version" ;;
    both)
      install_binary sirrd "$version"
      install_binary sirr  "$version"
      ;;
  esac

  echo ""
  say "done!"
  case "$target" in
    sirrd|both) echo "  start the server:  sirrd serve" ;;
  esac
  case "$target" in
    sirr|both)  echo "  use the CLI:       sirr --help" ;;
  esac
  echo "  docs:              https://sirr.dev"
  echo ""
}

main "$@"
