use crate::constants::*;
use anchor_lang::prelude::*;
#[account]
#[derive(Default)]
pub struct Tweet {
    // We keep track of the user that published the tweet by storing its public key
    pub author: Pubkey,
    // hashtags
    pub topic: String,
    // keep track of the actual content of the tweet
    pub content: String,

    // keep track of the time the tweet by published by storing the current timestamp
    pub created_at: i64,
}

impl Tweet {
    pub const LEN: usize = DISCRIMINATOR_LENGTH
        + PUBLIC_KEY_LENGTH
        + TIMESTAMP_LENGTH
        + STRING_LENGTH_PREFIX
        + MAX_TOPIC_LENGTH
        + STRING_LENGTH_PREFIX
        + MAX_CONTENT_LENGTH;
}
