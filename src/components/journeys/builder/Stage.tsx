import React from 'react';
import { Plus, ChevronRight, Pencil } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Touchpoint } from './Touchpoint';

interface StageProps {
  stage: {
    id: string;
    name: string;
    touchpoints: Array<{
      id: string;
      name: string;
      description: string;
      emotion: 'positive' | 'neutral' | 'negative';
    }>;
  };
  isActive: boolean;
  onClick: () => void;
  onUpdate: (updates: Partial<StageProps['stage']>) => void;
}

export function Stage({ stage, isActive, onClick, onUpdate }: StageProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Card
      className={cn(
        "relative transition-all duration-200",
        isActive && "ring-2 ring-primary ring-offset-2"
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="w-fit">Stage {stage.id}</Badge>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Pencil className="w-4 h-4" />
            </Button>
          </div>
        </div>
        {isEditing ? (
          <Input
            value={stage.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            className="mt-2"
            autoFocus
            onBlur={() => setIsEditing(false)}
            onKeyDown={(e) => e.key === 'Enter' && setIsEditing(false)}
          />
        ) : (
          <CardTitle className="text-lg">{stage.name}</CardTitle>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {stage.touchpoints.map((touchpoint) => (
          <Touchpoint
            key={touchpoint.id}
            touchpoint={touchpoint}
            onUpdate={(updates) => {
              const newTouchpoints = stage.touchpoints.map((t) =>
                t.id === touchpoint.id ? { ...t, ...updates } : t
              );
              onUpdate({ touchpoints: newTouchpoints });
            }}
          />
        ))}

        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-muted-foreground hover:text-foreground"
          onClick={() => {
            const newTouchpoint = {
              id: crypto.randomUUID(),
              name: 'New Touchpoint',
              description: '',
              emotion: 'neutral' as const,
            };
            onUpdate({
              touchpoints: [...stage.touchpoints, newTouchpoint],
            });
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Touchpoint
        </Button>
      </CardContent>
    </Card>
  );
}