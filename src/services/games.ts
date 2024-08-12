export interface CardObject {
    component: any;
    text: string;
    id: string;
  }
  
export interface GameState {
    id: string;
    userSelectedCard: CardObject | null;
    housePicked: CardObject | null;
    score: number;
  }