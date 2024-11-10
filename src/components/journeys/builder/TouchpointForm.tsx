import React from 'react';
import { Camera, X, Smile, Meh, Frown, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface TouchpointFormProps {
  touchpoint: {
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
  };
  onClose: () => void;
}

export function TouchpointForm({ touchpoint, onClose }: TouchpointFormProps) {
  const [data, setData] = React.useState(touchpoint);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Image Upload */}
      <div 
        onClick={() => fileInputRef.current?.click()}
        className="relative group cursor-pointer"
      >
        <div className={cn(
          "aspect-video rounded-lg overflow-hidden border-2 border-dashed",
          "transition-colors duration-200",
          data.image ? 'border-transparent' : 'border-muted hover:border-muted-foreground'
        )}>
          {data.image ? (
            <>
              <img 
                src={data.image} 
                alt="Touchpoint visualization" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera className="w-8 h-8 text-white" />
              </div>
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Camera className="w-8 h-8 text-muted-foreground mb-2" />
              <p className="text-sm font-medium text-muted-foreground">
                Add an image
              </p>
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      {/* Basic Info */}
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-1.5 block">
            Name
          </label>
          <Input
            value={data.name}
            onChange={(e) => setData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Enter touchpoint name"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-1.5 block">
            Description
          </label>
          <Textarea
            value={data.description}
            onChange={(e) => setData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe what happens at this touchpoint"
            rows={3}
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-1.5 block">
            Customer Action
          </label>
          <Textarea
            value={data.customerAction || ''}
            onChange={(e) => setData(prev => ({ ...prev, customerAction: e.target.value }))}
            placeholder="What action does the customer take?"
            rows={2}
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-1.5 block">
            Customer Job
          </label>
          <Textarea
            value={data.customerJob || ''}
            onChange={(e) => setData(prev => ({ ...prev, customerJob: e.target.value }))}
            placeholder="What is the customer trying to accomplish?"
            rows={2}
          />
        </div>
      </div>

      {/* Customer Emotion */}
      <div>
        <label className="text-sm font-medium mb-3 block">
          Customer Emotion
        </label>
        <div className="grid grid-cols-3 gap-4">
          {[
            { value: 'positive', icon: Smile, label: 'Positive' },
            { value: 'neutral', icon: Meh, label: 'Neutral' },
            { value: 'negative', icon: Frown, label: 'Negative' }
          ].map(({ value, icon: Icon, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setData(prev => ({ ...prev, emotion: value as 'positive' | 'neutral' | 'negative' }))}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-lg border transition-all",
                data.emotion === value
                  ? "border-primary bg-primary/5"
                  : "border-muted hover:border-muted-foreground"
              )}
            >
              <Icon className={cn(
                "w-6 h-6",
                value === 'positive' && "text-green-500",
                value === 'neutral' && "text-yellow-500",
                value === 'negative' && "text-red-500"
              )} />
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2">
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={() => {
          // Handle save
          onClose();
        }}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}