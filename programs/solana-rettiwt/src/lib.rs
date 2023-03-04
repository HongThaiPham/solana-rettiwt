use anchor_lang::prelude::*;

declare_id!("5omJMVpW8feU1cD6VBVZz229KJd2uunE8wzagQ2fPwwm");

#[program]
pub mod solana_rettiwt {
    use super::*;

    pub fn initialize(_ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
