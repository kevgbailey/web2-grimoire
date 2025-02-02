export default function roleAmountLogic(num) {
  const distributions = {
    5: { Townsfolk: 3, Outsiders: 0, Minions: 1, Demons: 1 },
    6: { Townsfolk: 3, Outsiders: 1, Minions: 1, Demons: 1 },
    7: { Townsfolk: 5, Outsiders: 0, Minions: 1, Demons: 1 },
    8: { Townsfolk: 5, Outsiders: 1, Minions: 1, Demons: 1 },
    9: { Townsfolk: 5, Outsiders: 2, Minions: 1, Demons: 1 },
    10: { Townsfolk: 7, Outsiders: 0, Minions: 2, Demons: 1 },
    11: { Townsfolk: 7, Outsiders: 1, Minions: 2, Demons: 1 },
    12: { Townsfolk: 7, Outsiders: 2, Minions: 2, Demons: 1 },
    13: { Townsfolk: 9, Outsiders: 0, Minions: 3, Demons: 1 },
    14: { Townsfolk: 9, Outsiders: 1, Minions: 3, Demons: 1 },
    15: { Townsfolk: 9, Outsiders: 2, Minions: 3, Demons: 1 },
  };
  return distributions[num] || null;
}
