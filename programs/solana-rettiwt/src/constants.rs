use anchor_lang::prelude::*;

const DISCRIMINATOR_LENGTH: usize = std::mem::size_of::<u64>; //8
const PUBLIC_KEY_LENGTH: usize = std::mem::size_of::<Pubkey>; //32
const TIMESTAMP_LENGTH: usize = std::mem::size_of::<i64>; //8

// 4 bytes prefix to store the length of the string
const STRING_LENGTH_PREFIX: usize = 4;
// UTF-8 is based on 8-bit code units. Each character is encoded as 1 to 4 bytes.
const MAX_TOPIC_LENGTH: usize = 50 * 4; // 50 chars max
const MAX_CONTENT_LENGTH: usize = 280 * 4; // 280 chars max.
