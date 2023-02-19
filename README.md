# transparent_voting_system
Project Presented by TEAM PTTP
### Our Team
Member | Role
------------- | -------------
Tanishq Tyagi   | Team Lead (Blockchain Developer)
Priyanka  |  Blockchain Developer


##  Overview of the Project

>An app that will check your body posture while you are doing an exercise and show how accurate the posture is.

##  Our Project

Our project, ClearVote uses the Ethereum blockchain platform and Ether.js library. To create smart contracts we have used the Solidity programming language. These smart contracts define the rules of the voting process, including eligibility criteria, voting procedures, and result calculation.
The project allows users to give votes for candidates and view the voting results in real time. All ballots and transactions are stored on the blockchain, along with timestamps, providing complete transparency and accountability. This feature helps to prevent rigging and fraud as every vote takes place transparently.
Our project offers several benefits over traditional voting systems. It reduces the possibility of tampering with the results and ensures that every vote is counted. Moreover, it enhances the transparency and credibility of the voting process, and it eliminates the need for intermediaries, reducing the associated costs.
We have used Arcana for the authentication process. Arcana supports passwordless email and six social login providers. In our case, we have implemented the process using Gmail (google authentication) which directly connects to the Arcana Wallet.
Here we have implemented targeted notifications, and as soon as the user casts a vote, a targeted notification will be sent to that particular account which can be seen on the website itself, and we have used Push Protocol to acheive the same.

## Challenges we ran into

>During the development of our project, Clear Vote, our team faced several challenges. One of the major challenges we encountered was integrating with Arcana, which we planned to use for authentication. When we started integrating with Arcana, we faced many errors, which caused significant delays in the development process. The errors we encountered were mainly due to the lack of familiarity with the Arcana documentation and its APIs. As a result, we had to go through the documentation several times to understand how to integrate our project with Arcana.
>> Another challenge was to integrate and deploy the smart contract on the Hyperspace Test Network, provided by FileCoin. This is because Arcana and PushProtocol do not support Hyperspace Test Network. So to overcome this issue, we deployed it separately on the remix ide and continued our working project separately with Goerli Test Network.

### FileCoin Hyperspace TestNetwork deployed Contract Address: 
0xd9145CCE52D386f254917e481eB44e9943F39138
### Goerli Test Network deployed Contract Address: 
0xbcBBF00Ce07934940075f8ce73a684cB0093Ba44

## How to Run ?
Add .env file and add Private Key and mnemonic
> Run the command : npm start
>> Import necessary libraries before running the above command
