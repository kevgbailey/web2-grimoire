const roles = {
    townsfolk: [
        { id: 1, name: 'Washerwoman', description: "You start knowing that 1 of 2 players is a particular Townsfolk."},
        { id: 2, name: 'Librarian', description: "You start knowing that 1 of 2 players is a particular Outsider."},
        { id: 3, name: 'Investigator', description: "You start knowing that 1 of 2 players is a particular Minion."},
        { id: 4, name: 'Chef', description: "You start knowing how many pairs of evil players there are." },
        { id: 5, name: 'Empath', description: "Each night, you learn how many of your 2 alive neighbors are evil." },
        { id: 6, name: 'Fortune Teller', description: "Each night, choose 2 players: you learn if either is a Demon. There is a good player that registers as a Demon to you." },
        { id: 7, name: 'Undertaker', description: "Each night*, you learn which character died by execution today."},
        { id: 8, name: 'Monk', description: "Each night*, choose a player (not yourself): they are safe from the Demon tonight." },
        { id: 9, name: 'Ravenkeeper', description: "If you die at night, you are woken to choose a player: you learn their character." },
        { id: 10, name: 'Virgin', description: "The 1st time you are nominated, if the nominator is a Townsfolk, they are executed immediately." },
        { id: 11, name: 'Slayer', description: "Once per game, during the day, publicly choose a player: if they are the Demon, they die." },
        { id: 12, name: 'Soldier', description: "You are safe from the Demon." },
        { id: 13, name: 'Mayor', description: "If only 3 players live & no execution occurs, your team wins. If you die at night, another player might die instead." },
    ],
    outsiders: [
        { id: 14, name: 'Recluse', description: "Each night, choose a player (not yourself): tomorrow, you may only vote if they are voting too." },
        { id: 15, name: 'Saint', description: "If you die by execution, your team loses." },
        { id: 16, name: 'Drunk', description: "You do not know you are the Drunk. You think you are a Townsfolk character, but you are not." },
        { id: 17, name: 'Butler', description: "You might register as evil & as a Minion or Demon, even if dead." },
    ],
    minions: [
        { id: 18, name: 'Poisoner', description: "Each night, choose a player: they are poisoned tonight and tomorrow day." },
        { id: 19, name: 'Spy', description: "Each night, you see the Grimoire. You might register as good & as a Townsfolk or Outsider, even if dead." },
        { id: 20, name: 'Scarlet Woman', description: "If there are 5 or more players alive & the Demon dies, you become the Demon. (Travellers don't count)" },
        { id: 21, name: 'Baron', description: "There are extra Outsiders in play. [+2 Outsiders]" },
    ],
    demons: [
        { id: 22, name: 'Imp', description: "Each night*, choose a player: they die. If you kill yourself this way, a Minion becomes the Imp." },
    ]
}

export default roles;