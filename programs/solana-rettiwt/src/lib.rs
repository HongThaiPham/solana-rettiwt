use anchor_lang::prelude::*;
mod constants;
pub mod instructions;
pub mod schemas;

use instructions::*;

declare_id!("AFW4wmHZzPfWXnVf8dBrx2PXCER2SdQFVg7dy1HMto4A");

#[program]
pub mod solana_rettiwt {
    use super::*;

    pub fn create_a_tweet(
        _ctx: Context<CreateNewTweet>,
        topic: String,
        content: String,
    ) -> Result<()> {
        create_new_tweet::handler(_ctx, topic, content)
    }
}
