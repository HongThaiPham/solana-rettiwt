import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { expect } from "chai";
import { SolanaRettiwt } from "../target/types/solana_rettiwt";

describe("solana-rettiwt", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.SolanaRettiwt as Program<SolanaRettiwt>;

  it("Can create a new tweet", async () => {
    const tweet = anchor.web3.Keypair.generate();
    const author = anchor.Wallet.local().publicKey;
    const content = "lorem ipsum dolor sit amet, consectetur adipiscing elit.";
    const topic = "dev";
    const tx = await program.methods
      .createATweet(topic, content)
      .accounts({
        tweet: tweet.publicKey,
        author,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([tweet])
      .rpc();
    // console.log("Your transaction signature", tx);

    const tweetAccount = await program.account.tweet.fetch(tweet.publicKey);

    expect(tweetAccount.author.toBase58()).equal(author.toBase58());
    expect(tweetAccount.content).equal(content);
    expect(tweetAccount.topic).equal(topic);
    expect(tweetAccount.createdAt).not.equal(0);
  });

  it("Should create a new twwet without a topic", async () => {
    const tweet = anchor.web3.Keypair.generate();
    const author = anchor.Wallet.local().publicKey;
    const content = "lorem ipsum dolor sit amet, consectetur adipiscing elit.";
    const tx = await program.methods
      .createATweet("", content)
      .accounts({
        tweet: tweet.publicKey,
        author,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([tweet])
      .rpc();
    // console.log("Your transaction signature", tx);

    const tweetAccount = await program.account.tweet.fetch(tweet.publicKey);

    expect(tweetAccount.author.toBase58()).equal(author.toBase58());
    expect(tweetAccount.content).equal(content);
    expect(tweetAccount.topic).equal("");
    expect(tweetAccount.createdAt).not.equal(0);
  });

  it("Should create a new twwet by another author", async () => {
    const tweet = anchor.web3.Keypair.generate();
    const otherAuthor = anchor.web3.Keypair.generate();
    const signature = await program.provider.connection.requestAirdrop(
      otherAuthor.publicKey,
      1000000000
    );
    await program.provider.connection.confirmTransaction(signature);
    const content = "lorem ipsum dolor sit amet, consectetur adipiscing elit.";
    const topic = "dev";
    const tx = await program.methods
      .createATweet(topic, content)
      .accounts({
        tweet: tweet.publicKey,
        author: otherAuthor.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([otherAuthor, tweet])
      .rpc();
    // console.log("Your transaction signature", tx);

    const tweetAccount = await program.account.tweet.fetch(tweet.publicKey);

    expect(tweetAccount.author.toBase58()).equal(
      otherAuthor.publicKey.toBase58()
    );
    expect(tweetAccount.content).equal(content);
    expect(tweetAccount.topic).equal(topic);
    expect(tweetAccount.createdAt).not.equal(0);
  });

  it("Should not create tweet with topic length > 50", async () => {
    const tweet = anchor.web3.Keypair.generate();
    const author = anchor.Wallet.local().publicKey;
    const content = "lorem ipsum dolor sit amet, consectetur adipiscing elit.";
    const topic = "LEO ".repeat(51);
    try {
      const tx = await program.methods
        .createATweet(topic, content)
        .accounts({
          tweet: tweet.publicKey,
          author,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .signers([tweet])
        .rpc();
      // console.log("Your transaction signature", tx);
    } catch (error) {
      expect(error.error.errorMessage).equal(
        "The provided topic should be 50 characters long maximum."
      );
    }
  });

  it("Should not create tweet with content length > 280", async () => {
    const tweet = anchor.web3.Keypair.generate();
    const author = anchor.Wallet.local().publicKey;
    const content = "L".repeat(281);
    const topic = "dev";
    try {
      const tx = await program.methods
        .createATweet(topic, content)
        .accounts({
          tweet: tweet.publicKey,
          author,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .signers([tweet])
        .rpc();
      // console.log("Your transaction signature", tx);
    } catch (error) {
      expect(error.error.errorMessage).equal(
        "The provided content should be 280 characters long maximum."
      );
    }
  });
  it("can fetch all tweets", async () => {
    const tweetAccounts = await program.account.tweet.all();

    expect(tweetAccounts.length).equal(4);
  });

  it("can fetch all tweets by author", async () => {
    const author = anchor.Wallet.local().publicKey;

    const tweetAccounts = await program.account.tweet.all([
      {
        // dataSize: 2000,
        // The size of the account data.a size in bytes and it will only return accounts that match exactly that size.
        memcmp: {
          // The position (in bytes) in which we should start comparing the data.
          offset: 8, /// Discriminator.
          // The data to compare to the account's data. This array of bytes should be encoded in base 58
          bytes: author.toBase58(),
        },
      },
    ]);

    expect(tweetAccounts.length).equal(3);
    tweetAccounts.forEach((tweetAccount) => {
      expect(tweetAccount.account.author.toBase58()).equal(author.toBase58());
    });
  });

  it("can fetch all tweets by topic", async () => {
    const topic = "dev";

    const tweetAccounts = await program.account.tweet.all([
      {
        memcmp: {
          // The position (in bytes) in which we should start comparing the data.
          offset: 8 + 32 + 4, /// Discriminator + author + prefix.
          bytes: bs58.encode(Buffer.from(topic)),
        },
      },
    ]);

    expect(tweetAccounts.length).equal(3);
    tweetAccounts.forEach((tweetAccount) => {
      expect(tweetAccount.account.topic).equal(topic);
    });
  });
});
