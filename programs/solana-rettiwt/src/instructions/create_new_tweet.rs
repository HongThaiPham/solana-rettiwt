use crate::constants::*;
use crate::errors::*;
use crate::schemas::Tweet;
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct CreateNewTweet<'info> {
    #[account(
        init,
        payer = author,
        space = Tweet::LEN
    )]
    pub tweet: Account<'info, Tweet>,
    #[account(mut)]
    pub author: Signer<'info>,
    pub system_program: Program<'info>,
}

pub fn handler(ctx: Context<CreateNewTweet>, topic: String, content: String) -> ProgramResult {
    let tweet = &mut ctx.accounts.tweet;

    if (topic.len() as u64) > MAX_TOPIC_LENGTH {
        return Err(ErrorCode::TopicTooLong.into());
    }

    if (content.len() as u64) > MAX_CONTENT_LENGTH {
        return Err(ErrorCode::ContentTooLong.into());
    }
    // The into() method is a Rust feature that converts our ErrorCode type into whatever type is required by the code which here is Err and more precisely ProgramError.

    tweet.topic = topic;
    tweet.content = content;
    tweet.author = *ctx.accounts.author.key;
    tweet.created_at = Clock::get()?.unix_timestamp;
    Ok(())
}
