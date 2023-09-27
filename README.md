# RUNES Specification
#### By [Derp Herpenstein](https://twitter.com/0xDerpNation) --- [DerpNation](https://www.derpnation.xyz/)

## Introduction
 The current suggested implementation of RUNE by [Casey Rodarmor](https://rodarmor.com/blog/runes/) helps to solve the UTXO bloat issue associated with the BRC-20 standard, while not addressing the underlying reason why such a standard should exist in the first place. This standard should be simple to implement, but extendable enough to allow for the creation of a large variety of functionality. Now is the time for a token standard that allows for the creation of DeFi primitives directly on layer 1 of the Bitcoin blockchain. Not only is this possible, if we collectively take a few minutes before aping into a schema, we can create a system that allows bitcoin L1 DeFi to compete with ethereum.  We can create AMMs, Loan Providers and even Governance, all on Bitcoin L1 by using social consensus with this new token standard.

 ## But How?
 Some slight deviations from the current proposed design should allow enough flexability to create the primitives.  The first thing that is needed is a byte that can be designated as an op code.  In order to turn Bitcoin into the L1 for DeFi will need to do much more than mint and transfer. That said, a single byte will provide more than enough functionality.  
 #### In the following examples, all data is stored as [LEB128](https://en.wikipedia.org/wiki/LEB128) to ensure decoding is straight forward.
 #### Text is store as base26 and then LEB128 for consistency

 To start off, lets look at a simple overall structure that can accomplish this goal with the 80 bytes available in OP RETURN

 ```
     [R]  [OPCODE]   [Contract Data]
0x   52   [1byte]       [78 bytes]
```
With an opcode and 78 bytes of data, just about anything we want to accomplish can be done. With this structure we can still easily perform basic tasks like mint, transfer, or deploy. The following example assumes opcode 3 is transfer and shows a multi asset transfer. 
```
{
  op: 'transfer',
  data: [
    { tokenIndex: '1', output: '1', amount: '1234' },
    { tokenIndex: '1', output: '2', amount: '321' }
  ]
}
```

```
     [R]  [OPCODE]   [tokenIndex] [OutputIndex]  [tokenAmount]  [tokenIndex] [OutputIndex]  [tokenAmount]  
0x    52     03           01            01           d2 09          01            02           c1 02
```

With two bytes of overhead, there are 78 bytes to store the tuples of token transfer data. In the example shown, only 4 byte are needed for each transfer, but in practice that number will be larger.  If we assume 7-8 bytes per transfer, a single UTXO can transfer 10 different tokens.  


### AMMs
 Imagine a scenario where you want to use an automatic market maker to swap 69000 of TokenA for at least 42000 of TokenB.  At the moment on Bitcoin L1 its not possible, but with a few months of work it can be. Since the indexer relies on social consesus, we can decide to create "contracts" for the AMM as part of the the indexer.  As long as the indexers agree on the rules, we can do whatever we want.
 
  
  Take the scenario above.  A user can have a UTXO containing 69000 of token A as the input to their transaction, call the following op, and perform a swap that will send 69000 of token A to the balance of the AMM and 42000 of Token B to output 1 of the transaction. 

```
   [R]  [OPCODE]   [SUB OPCODE] [Token1Index] [Token1Amount] [token2Index] [token2Amount]  [Output]
0x  52     04           01          01            889b04          0A            90c802       01
```
In the event that another user has extracted tokens from the AMM and the price has changed and the rules off the AMM are violated (x*y<=k) , the indexer would simply move the 69000 token A to output 1 instead.

The opcode 4 represents a call to a theoretically AMM "contract" built inside the indexer.  The sub opcode 1 represents a call to the function swap, which would take 5 arguments, token1Index, token1Amount, token2Index, token2Amount and Output

### Other Functionality
Since we can design whatever functionality we want into the indexer, we can build other interesting and needed infrastucture like governance for DAOs and loan providers.  
