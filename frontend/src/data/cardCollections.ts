export interface CardData {
  word: string;
  translation: string;
  bookmarked?: boolean;
}

export interface CollectionData {
  name: string;
  description: string;
  cards: CardData[];
}

export interface Collections {
  [collectionId: string]: CollectionData;
}

export const data: { [collectionId: string]: CollectionData } = {
  "testCollection1": {
    "name": "Test Collection 1",
    "description": "Set of card for Test Collection 1",
    "cards": [
      { "word": "Hello", "translation": "Hola" },
      { "word": "World", "translation": "Mundo" },
      { "word": "World 2", "translation": "Mundo 2" },
      // ... other cards
    ]
  },
  "testCollection2": {
    "name": "Test Collection 2",
    "description": "Set of card for Test Collection 2",
    "cards": [
      { "word": "Hello", "translation": "Cześć" },
      { "word": "World", "translation": "Świat" },
      { "word": "World 2", "translation": "Świat 2" },
      // ... other cards
    ]
  }
};
