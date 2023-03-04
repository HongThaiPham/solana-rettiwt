# Installation

## Install Rust

```shell
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
export PATH="$HOME/.cargo/bin:$PATH"
```

```shell
rustup --version
rustc --version
cargo --version
```

## Install Solana

```shell
sh -c "$(curl -sSfL https://release.solana.com/stabe/install)"
export PATH="$HOME/.local/share/solana/install/active_release/bin:$PATH"
```

```shell
# Check the Solana binary is available.
solana --version

solana config set --url localhost

# Check you can run a local validator (Run Ctrl+C to exit).
# We’ll see what this does in this article.
# Note this creates a "test-ledger" folder in your current directory.
solana-test-validator

solana address

solana-keygen new

solana airdrop 1
```

## Install Anchor

```shell
sudo apt-get update && sudo apt-get upgrade && sudo apt-get install -y pkg-config build-essential libudev-dev libssl-dev
```

```shell
cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
```

```shell
avm install latest
avm use latest

anchor --version
```

Get and update program id to `anchor.toml` and `lib.rs`

```shell
 solana address -k target/deploy/solana_rettiwt-keypair.json
```
