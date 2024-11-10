export interface Journey {
  id: string;
  name: string;
  description: string;
  coverImage?: string;
  personaIds: string[];
  state?: 'draft' | 'current' | 'future';
  status: 'draft' | 'active' | 'completed';
  createdAt: string;
  updatedAt: string;
  stages: Stage[];
}

export interface Stage {
  id: string;
  name: string;
  order: number;
  touchpoints: Touchpoint[];
}

export interface Touchpoint {
  id: string;
  name: string;
  description: string;
  emotion: 'positive' | 'neutral' | 'negative';
  customerAction?: string;
  customerJob?: string;
  image?: string;
  insights?: {
    needs: string[];
    painPoints: string[];
    opportunities: string[];
  };
  metrics?: {
    satisfaction: number;
    effort: number;
    completion: number;
  };
}