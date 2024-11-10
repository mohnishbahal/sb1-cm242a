import React from 'react';
import { Map, Share2, Eye } from 'lucide-react';
import { Journey } from '../../../types/journey';
import { useApp } from '../../../context/AppContext';
import { StatusBadge } from './StatusBadge';
import { Button } from '../../ui/button';

interface JourneyCardProps {
  journey: Journey;
  onEdit: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
}

export function JourneyCard({ journey, onEdit }: JourneyCardProps) {
  const { personas } = useApp();
  const associatedPersonas = personas.filter(p => journey.personaIds.includes(p.id));

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="aspect-video relative bg-gray-100 dark:bg-gray-700">
        {journey.coverImage ? (
          <img
            src={journey.coverImage}
            alt={journey.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Map className="w-12 h-12 text-gray-400 dark:text-gray-500" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-lg font-semibold text-white mb-1">{journey.name}</h3>
          <p className="text-sm text-gray-200 line-clamp-2">{journey.description}</p>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <StatusBadge status={journey.status} />
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(journey.updatedAt).toLocaleDateString()}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {associatedPersonas.map(persona => (
              <img
                key={persona.id}
                src={persona.avatar}
                alt={persona.name}
                className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800"
                title={persona.name}
              />
            ))}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {journey.stages.length} stages
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex gap-2">
          <Button 
            onClick={onEdit}
            className="flex-1"
          >
            <Eye className="w-4 h-4 mr-2" />
            View Journey
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              // You could add a toast notification here
            }}
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
}