import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SolanaRettiwt } from "../target/types/solana_rettiwt";

describe("solana-rettiwt", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.SolanaRettiwt as Program<SolanaRettiwt>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
