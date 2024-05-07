export enum Party {
  Democrat = "Democrat",
  Republican = "Republican",
  Tie = "Tie",
}

export const getPartyColor = (party: Party): string => {
  switch (party) {
    case Party.Democrat:
      return "#595d9a";
    case Party.Republican:
      return "#b83c2b";
    case Party.Tie:
      return "#505050";
  }
};

export const getOppositeParty = (party: Party): Party => {
  switch (party) {
    case Party.Democrat:
      return Party.Republican;
    case Party.Republican:
      return Party.Democrat;
    case Party.Tie:
      return Party.Tie;
  }
};
