use anchor_lang::prelude::*;
mod constants;
pub mod instructions;
pub mod schemas;

use instructions::*;

declare_id!("5omJMVpW8feU1cD6VBVZz229KJd2uunE8wzagQ2fPwwm");

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
