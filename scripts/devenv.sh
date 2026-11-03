#!/usr/bin/env bash
set -euo pipefail
cd -- "${BASH_SOURCE[0]%/*}/.."
revision="$(nix --extra-experimental-features 'nix-command flakes' eval --impure --raw --expr '(builtins.fromJSON (builtins.readFile ./devenv.lock)).nodes.nixpkgs.locked.rev')"
exec nix --extra-experimental-features 'nix-command flakes' run "github:NixOS/nixpkgs/$revision#devenv" -- "$@"
