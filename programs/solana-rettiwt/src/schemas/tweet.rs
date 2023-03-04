use crate::constants::*;
use anchor_lang::prelude::*;

#[account]
pub struct Tweet {
    // hashtags
    pub topic: String,
    // keep track of the actual content of the tweet
    pub content: String,
    // We keep track of the user that published the tweet by storing its public key
    pub author: Pubkey,
    // keep track of the time the tweet by published by storing the current timestamp
    pub created_at: i64,
}

impl Tweet {
    const LEN: usize = DISCRIMINATOR_LENGTH
        + PUBLIC_KEY_LENGTH
        + TIMESTAMP_LENGTH
        + STRING_LENGTH_PREFIX
        + MAX_TOPIC_LENGTH
        + STRING_LENGTH_PREFIX
        + MAX_CONTENT_LENGTH;
}
