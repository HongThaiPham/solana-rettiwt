export type SolanaRettiwt = {
  "version": "0.1.0",
  "name": "solana_rettiwt",
  "instructions": [
    {
      "name": "createATweet",
      "accounts": [
        {
          "name": "tweet",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "author",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "topic",
          "type": "string"
        },
        {
          "name": "content",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "tweet",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "author",
            "type": "publicKey"
          },
          {
            "name": "topic",
            "type": "string"
          },
          {
            "name": "content",
            "type": "string"
          },
          {
            "name": "createdAt",
            "type": "i64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "TopicTooLong",
      "msg": "The provided topic should be 50 characters long maximum."
    },
    {
      "code": 6001,
      "name": "ContentTooLong",
      "msg": "The provided content should be 280 characters long maximum."
    }
  ]
};

export const IDL: SolanaRettiwt = {
  "version": "0.1.0",
  "name": "solana_rettiwt",
  "instructions": [
    {
      "name": "createATweet",
      "accounts": [
        {
          "name": "tweet",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "author",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "topic",
          "type": "string"
        },
        {
          "name": "content",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "tweet",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "author",
            "type": "publicKey"
          },
          {
            "name": "topic",
            "type": "string"
          },
          {
            "name": "content",
            "type": "string"
          },
          {
            "name": "createdAt",
            "type": "i64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "TopicTooLong",
      "msg": "The provided topic should be 50 characters long maximum."
    },
    {
      "code": 6001,
      "name": "ContentTooLong",
      "msg": "The provided content should be 280 characters long maximum."
    }
  ]
};
